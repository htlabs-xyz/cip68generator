import {
  applyParamsToScript,
  CIP68_100,
  deserializeAddress,
  IFetcher,
  MeshTxBuilder,
  MeshWallet,
  PlutusScript,
  resolveScriptHash,
  serializePlutusScript,
  stringToHex,
  UTxO,
} from "@meshsdk/core";
import { Plutus } from "../types";
import { EXCHANGE_FEE_ADDRESS, title } from "../constants";
import plutus from "../../plutus.json";
import { appNetworkId } from "@/constants";
import { getPkHash } from "@/utils";
import { blockfrostProvider } from "@/lib/cardano";
import { console } from "inspector";

export class MeshAdapter {
  protected meshTxBuilder: MeshTxBuilder;
  protected wallet: MeshWallet;
  protected fetcher: IFetcher;

  protected pubKeyExchange: string;
  protected mintCompileCode: string;
  protected storeCompileCode: string;

  protected storeScriptCbor: string;

  protected storeScript: PlutusScript;

  public storeAddress: string;

  protected storeScriptHash: string;
  protected mintScriptCbor: string;
  protected mintScript: PlutusScript;
  public policyId;

  constructor({ wallet = null! }: { wallet?: MeshWallet }) {
    this.wallet = wallet;
    this.fetcher = blockfrostProvider;
    this.meshTxBuilder = new MeshTxBuilder({
      fetcher: this.fetcher,
      evaluator: blockfrostProvider,
    });

    this.pubKeyExchange = deserializeAddress(EXCHANGE_FEE_ADDRESS).pubKeyHash;
    this.mintCompileCode = this.readValidator(plutus as Plutus, title.mint);
    this.storeCompileCode = this.readValidator(plutus as Plutus, title.store);

    this.storeScriptCbor = applyParamsToScript(this.storeCompileCode, [this.pubKeyExchange, BigInt(1)]);

    this.storeScript = {
      code: this.storeScriptCbor,
      version: "V3",
    };

    this.storeAddress = serializePlutusScript(this.storeScript, undefined, appNetworkId, false).address;

    this.storeScriptHash = deserializeAddress(this.storeAddress).scriptHash;
    this.mintScriptCbor = applyParamsToScript(this.mintCompileCode, [this.pubKeyExchange, BigInt(1), this.storeScriptHash]);
    this.mintScript = {
      code: this.mintScriptCbor,
      version: "V3",
    };
    this.policyId = resolveScriptHash(this.mintScriptCbor, "V3");
  }

  protected getWalletForTx = async (): Promise<{
    utxos: UTxO[];
    collateral: UTxO;
    walletAddress: string;
  }> => {
    const utxos = await this.wallet.getUtxos();
    const collaterals = await this.wallet.getCollateral();
    const walletAddress = await this.wallet.getChangeAddress();
    if (!utxos || utxos.length === 0) throw new Error("No UTXOs found in getWalletForTx method.");

    if (!collaterals || collaterals.length === 0) throw new Error("No collateral found in getWalletForTx method.");

    if (!walletAddress) throw new Error("No wallet address found in getWalletForTx method.");

    return { utxos, collateral: collaterals[0], walletAddress };
  };

  protected getUtxoForTx = async (address: string, txHash: string) => {
    const utxos: UTxO[] = await this.fetcher.fetchAddressUTxOs(address);
    const utxo = utxos.find(function (utxo: UTxO) {
      return utxo.input.txHash === txHash;
    });

    if (!utxo) throw new Error("No UTXOs found in getUtxoForTx method.");
    return utxo;
  };

  protected readValidator = function (plutus: Plutus, title: string): string {
    const validator = plutus.validators.find(function (validator) {
      return validator.title === title;
    });

    if (!validator) {
      throw new Error(`${title} validator not found.`);
    }

    return validator.compiledCode;
  };

  protected getAddressUTXOAsset = async (address: string, unit: string) => {
    const utxos = await this.fetcher.fetchAddressUTxOs(address, unit);
    return utxos[utxos.length - 1];
  };

  protected getAddressUTXOAssets = async (address: string, unit: string) => {
    return await this.fetcher.fetchAddressUTxOs(address, unit);
  };

  public checkAssetNameAvailable = async ({ assetName, walletAddress }: { assetName: string; walletAddress: string }) => {
    const existUtXOwithUnit = await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(assetName)));
    if (existUtXOwithUnit?.output?.plutusData) {
      const pk = await getPkHash(existUtXOwithUnit?.output?.plutusData as string);
      const walletPk = deserializeAddress(walletAddress).pubKeyHash;
      if (pk !== walletPk) {
        return false;
      }
    }
    return true;
  };
}
