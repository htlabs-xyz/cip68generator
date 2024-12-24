import {
  CIP68_222,
  stringToHex,
  mConStr0,
  CIP68_100,
  metadataToCip68,
  mConStr1,
  deserializeAddress,
  UTxO,
  serializeAddressObj,
  scriptAddress,
} from "@meshsdk/core";

import { MeshAdapter } from "../adapters/mesh.adapter";
import { MINT_REFERENCE_SCRIPT_HASH, APP_WALLET_ADDRESS, EXCHANGE_FEE_PRICE, STORE_REFERENCE_SCRIPT_HASH } from "../constants";
import { appNetwork } from "@/constants";
import { ICip68Contract } from "../interfaces/icip68.interface";
import { isEmpty, isNil } from "lodash";
import { getPkHash } from "@/utils";

export class Cip68Contract extends MeshAdapter implements ICip68Contract {
  /**
   * @method Mint
   * @description Mint Asset (NFT/Token) with CIP68
   * @param assetName - string
   * @param metadata - Record<string, string>
   * @param quantity - string
   *
   * @returns unsignedTx
   */

  mint = async (
    params: {
      assetName: string;
      metadata: Record<string, string>;
      quantity: string;
      receiver: string;
    }[],
  ) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();

    const unsignedTx = this.meshTxBuilder.mintPlutusScriptV3();
    const txOutReceiverMap = new Map<string, { unit: string; quantity: string }[]>();

    await Promise.all(
      params.map(async ({ assetName, metadata, quantity = "1", receiver = "" }) => {
        const existUtXOwithUnit = await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(assetName)));
        if (existUtXOwithUnit?.output?.plutusData) {
          const pk = await getPkHash(existUtXOwithUnit?.output?.plutusData as string);
          if (pk !== deserializeAddress(walletAddress).pubKeyHash) {
            throw new Error(`${assetName} has been exist`);
          }
          const receiverKey = !isEmpty(receiver) ? receiver : walletAddress;
          if (txOutReceiverMap.has(receiverKey)) {
            txOutReceiverMap.get(receiverKey)!.push({
              unit: this.policyId + CIP68_222(stringToHex(assetName)),
              quantity: quantity,
            });
          } else {
            txOutReceiverMap.set(receiverKey, [
              {
                unit: this.policyId + CIP68_222(stringToHex(assetName)),
                quantity: quantity,
              },
            ]);
          }
          unsignedTx
            .spendingPlutusScriptV3()
            .txIn(existUtXOwithUnit.input.txHash, existUtXOwithUnit.input.outputIndex)
            .txInInlineDatumPresent()
            .txInRedeemerValue(mConStr0([]))
            .txInScript(this.storeScriptCbor)
            .txOut(this.storeAddress, [
              {
                unit: this.policyId + CIP68_100(stringToHex(assetName)),
                quantity: "1",
              },
            ])
            .txOutInlineDatumValue(metadataToCip68(metadata))

            .mintPlutusScriptV3()
            .mint(quantity, this.policyId, CIP68_222(stringToHex(assetName)))
            .mintingScript(this.mintScriptCbor)
            .mintRedeemerValue(mConStr0([]));
        } else {
          const receiverKey = !isEmpty(receiver) ? receiver : walletAddress;
          if (txOutReceiverMap.has(receiverKey)) {
            txOutReceiverMap.get(receiverKey)!.push({
              unit: this.policyId + CIP68_222(stringToHex(assetName)),
              quantity: quantity,
            });
          } else {
            txOutReceiverMap.set(receiverKey, [
              {
                unit: this.policyId + CIP68_222(stringToHex(assetName)),
                quantity: quantity,
              },
            ]);
          }

          unsignedTx
            .mintPlutusScriptV3()
            .mint(quantity, this.policyId, CIP68_222(stringToHex(assetName)))
            .mintingScript(this.mintScriptCbor)
            .mintRedeemerValue(mConStr0([]))

            .mintPlutusScriptV3()
            .mint("1", this.policyId, CIP68_100(stringToHex(assetName)))
            .mintingScript(this.mintScriptCbor)
            .mintRedeemerValue(mConStr0([]))
            .txOut(this.storeAddress, [
              {
                unit: this.policyId + CIP68_100(stringToHex(assetName)),
                quantity: "1",
              },
            ])
            .txOutInlineDatumValue(metadataToCip68(metadata));
        }
      }),
    );

    txOutReceiverMap.forEach((assets, receiver) => {
      unsignedTx.txOut(receiver, assets);
    });

    unsignedTx

      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: EXCHANGE_FEE_PRICE,
        },
      ])
      .changeAddress(walletAddress)
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);
    return await unsignedTx.complete();
  };

  /**
   * @method Burn
   * @description Burn Asset (NFT/Token) with CIP68
   * @param assetName - string
   * @param quantity - string
   *
   * @returns unsignedTx
   */
  burn = async (params: { assetName: string; quantity: string; txHash?: string }[]) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const mintUtxoRef: UTxO = (await this.fetcher.fetchUTxOs(MINT_REFERENCE_SCRIPT_HASH))[0];
    const storeUtxoRef: UTxO = (await this.fetcher.fetchUTxOs(STORE_REFERENCE_SCRIPT_HASH))[0];

    const unsignedTx = this.meshTxBuilder;
    await Promise.all(
      params.map(async ({ assetName, quantity, txHash }) => {
        const userUtxos = await this.getAddressUTXOAssets(walletAddress, this.policyId + CIP68_222(stringToHex(assetName)));
        const amount = userUtxos.reduce((amount, utxos) => {
          return (
            amount +
            utxos.output.amount.reduce((amt, utxo) => {
              if (utxo.unit === this.policyId + CIP68_222(stringToHex(assetName))) {
                return amt + Number(utxo.quantity);
              }
              return amt;
            }, 0)
          );
        }, 0);
        const storeUtxo = !isNil(txHash)
          ? await this.getUtxoForTx(this.storeAddress, txHash)
          : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(assetName)));
        if (!storeUtxo) throw new Error("Store UTXO not found");

        if (-Number(quantity) === amount) {
          unsignedTx
            .mintPlutusScriptV3()
            .mint(quantity, this.policyId, CIP68_222(stringToHex(assetName)))
            .mintRedeemerValue(mConStr1([]))
            .mintingScript(this.mintScriptCbor)

            .mintPlutusScriptV3()
            .mint("-1", this.policyId, CIP68_100(stringToHex(assetName)))
            .mintRedeemerValue(mConStr1([]))
            .mintingScript(this.mintScriptCbor)

            .spendingPlutusScriptV3()
            .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
            .txInInlineDatumPresent()
            .txInRedeemerValue(mConStr1([]))
            .txInScript(this.storeScriptCbor);
        } else {
          unsignedTx
            .mintPlutusScriptV3()
            .mint(quantity, this.policyId, CIP68_222(stringToHex(assetName)))
            .mintRedeemerValue(mConStr1([]))
            .mintingScript(this.mintScriptCbor)

            .txOut(walletAddress, [
              {
                unit: this.policyId + CIP68_222(stringToHex(assetName)),
                quantity: String(amount + Number(quantity)),
              },
            ]);
        }
      }),
    );

    unsignedTx
      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "1000000",
        },
      ])

      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);

    return await unsignedTx.complete();
  };

  /**
   * @method Update
   * @description Update Asset (NFT/Token) with CIP68
   * @param assetName - string
   * @param metadata - Record<string, string>
   * @param txHash - string
   * @returns
   */
  update = async (params: { assetName: string; metadata: Record<string, string>; txHash?: string }[]) => {
    const utxoRef: UTxO = (await this.fetcher.fetchUTxOs(STORE_REFERENCE_SCRIPT_HASH))[0];
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder;
    await Promise.all(
      params.map(async ({ assetName, metadata, txHash }) => {
        const storeUtxo = !isNil(txHash)
          ? await this.getUtxoForTx(this.storeAddress, txHash)
          : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(assetName)));
        if (!storeUtxo) throw new Error("Store UTXO not found");
        unsignedTx
          .spendingPlutusScriptV3()
          .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
          .txInInlineDatumPresent()
          .txInRedeemerValue(mConStr0([]))
          .txInScript(this.storeScriptCbor)
          .txOut(this.storeAddress, [
            {
              unit: this.policyId + CIP68_100(stringToHex(assetName)),
              quantity: "1",
            },
          ])
          .txOutInlineDatumValue(metadataToCip68(metadata));
      }),
    );

    unsignedTx
      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "1000000",
        },
      ])
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);

    return await unsignedTx.complete();
  };

  /**
   * @method CreateReferenceScriptMint
   * @description Create reference script for mint transaction
   *
   * @returns unsigned transaction
   */
  createReferenceScriptMint = async (MINT_REFERENCE_SCRIPT_ADDRESS: string) => {
    const { walletAddress, utxos, collateral } = await this.getWalletForTx();

    const unsignedTx = this.meshTxBuilder
      .txIn(collateral.input.txHash, collateral.input.outputIndex)
      .txOut(MINT_REFERENCE_SCRIPT_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "20000000",
        },
      ])

      .txOutReferenceScript(this.mintScriptCbor, "V3")
      .txOutDatumHashValue("")
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address);

    return await unsignedTx.complete();
  };

  /**
   * @method CreateReferenceScriptStore
   * @description Create reference script for store transaction
   * @returns unsigned transaction
   */
  createReferenceScriptStore = async (STORE_REFERENCE_SCRIPT_ADDRESS: string) => {
    const { walletAddress, utxos, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder
      .txIn(collateral.input.txHash, collateral.input.outputIndex)
      .txOut(STORE_REFERENCE_SCRIPT_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "20000000",
        },
      ])

      .txOutReferenceScript(this.storeScriptCbor, "V3")
      .txOutDatumHashValue("")
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address);

    return await unsignedTx.complete();
  };

  /**
   * @method TC1
   * @description [TC1]: Cast assets with the desired quantity and metadata with all required fields.
   *
   */
  tc1 = async (param: { assetName: string; metadata: Record<string, string>; quantity: string; receiver: string }) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder

      .mintPlutusScriptV3()
      .mint(param.quantity, this.policyId, CIP68_222(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))

      .mintPlutusScriptV3()
      .mint("1", this.policyId, CIP68_100(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))
      .txOut(this.storeAddress, [
        {
          unit: this.policyId + CIP68_100(stringToHex(param.assetName)),
          quantity: "1",
        },
      ])
      .txOutInlineDatumValue(metadataToCip68(param.metadata))

      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: EXCHANGE_FEE_PRICE,
        },
      ])
      .changeAddress(walletAddress)
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);
    return await unsignedTx.complete();
  };

  /**
   * @method TC2
   * @description [TC2]: Casting assets but default fields in metadata (name, image, media_type, author) do not exist.
   *
   */
  tc2 = async (param: { assetName: string; metadata: Record<string, string>; quantity: string; txHash?: string }) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder

      .mintPlutusScriptV3()
      .mint(param.quantity, this.policyId, CIP68_222(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))

      .mintPlutusScriptV3()
      .mint("1", this.policyId, CIP68_100(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))
      .txOut(this.storeAddress, [
        {
          unit: this.policyId + CIP68_100(stringToHex(param.assetName)),
          quantity: "1",
        },
      ])
      .txOutInlineDatumValue(metadataToCip68(param.metadata))

      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: EXCHANGE_FEE_PRICE,
        },
      ])
      .changeAddress(walletAddress)
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);
    return await unsignedTx.complete();
  };

  /**
   * @method TC3
   * @description [SC3]: Casting assets with defined metadata but the keys (name, image, media_type) exist but the values of the fields are partially or completely missing.
   *
   */
  tc3 = async (param: { assetName: string; metadata: Record<string, string>; quantity: string; txHash?: string }) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder

      .mintPlutusScriptV3()
      .mint(param.quantity, this.policyId, CIP68_222(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))

      .mintPlutusScriptV3()
      .mint("1", this.policyId, CIP68_100(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))
      .txOut(this.storeAddress, [
        {
          unit: this.policyId + CIP68_100(stringToHex(param.assetName)),
          quantity: "2",
        },
      ])
      .txOutInlineDatumValue(metadataToCip68(param.metadata))

      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: EXCHANGE_FEE_PRICE,
        },
      ])
      .changeAddress(walletAddress)
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);
    return await unsignedTx.complete();
  };

  /**
   * @method TC4
   * @description [TC4]: Casting property with fully defined metadata for both kay and value but author address is empty or wrong.
   *
   */
  tc4 = async (param: { assetName: string; metadata: Record<string, string>; quantity: string; txHash?: string }) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder

      .mintPlutusScriptV3()
      .mint(param.quantity, this.policyId, CIP68_222(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))

      .mintPlutusScriptV3()
      .mint("1", this.policyId, CIP68_100(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))
      .txOut(this.storeAddress, [
        {
          unit: this.policyId + CIP68_100(stringToHex(param.assetName)),
          quantity: "1",
        },
      ])
      .txOutInlineDatumValue(metadataToCip68(param.metadata))

      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: EXCHANGE_FEE_PRICE,
        },
      ])
      .changeAddress(walletAddress)
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);
    return await unsignedTx.complete();
  };

  /**
   * @method TC5
   * @description [TC5]: Mint assets with transaction fees less than the specified amount included in the validator parameters.
   *
   */
  tc5 = async (param: { assetName: string; metadata: Record<string, string>; quantity: string; txHash?: string }) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder

      .mintPlutusScriptV3()
      .mint(param.quantity, this.policyId, CIP68_222(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))

      .mintPlutusScriptV3()
      .mint("1", this.policyId, CIP68_100(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))
      .txOut(this.storeAddress, [
        {
          unit: this.policyId + CIP68_100(stringToHex(param.assetName)),
          quantity: "1",
        },
      ])
      .txOutInlineDatumValue(metadataToCip68(param.metadata))

      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "900000",
        },
      ])
      .changeAddress(walletAddress)
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);
    return await unsignedTx.complete();
  };

  /**
   * @method TC6
   * @description [TC6]: Mint asset with correct transaction fee as params. however wrong exchange address defined in params.
   *
   */
  tc6 = async (param: { assetName: string; metadata: Record<string, string>; quantity: string; txHash?: string }) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder

      .mintPlutusScriptV3()
      .mint(param.quantity, this.policyId, CIP68_222(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))

      .mintPlutusScriptV3()
      .mint("1", this.policyId, CIP68_100(stringToHex(param.assetName)))
      .mintingScript(this.mintScriptCbor)
      .mintRedeemerValue(mConStr0([]))
      .txOut(this.storeAddress, [
        {
          unit: this.policyId + CIP68_100(stringToHex(param.assetName)),
          quantity: "1",
        },
      ])
      .txOutInlineDatumValue(metadataToCip68(param.metadata))

      .txOut("addr_test1qzwu6jcqk8f96fxq02pvq2h4a927ggn35f2gzdklfte4kwx0sd5zdvsat2chsyyjxkjxcg6uz2y46avd46mzqdgdy3dsckqxs4", [
        {
          unit: "lovelace",
          quantity: "1000000",
        },
      ])
      .changeAddress(walletAddress)
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);
    return await unsignedTx.complete();
  };

  /**
   * @method TC24
   * @description [TC24]: Casting assets but default fields in metadata (name, image, media_type, author) do not exist.
   *
   * @param params { assetName; quantity; txHash? }
   * @param test: { assetName; metadata; quantity; txHash? }
   *
   * @returns unsignedTx
   */
  tc24 = async () => {};

  /**
   * @method TC25
   * @description [TC25]: Casting assets but default fields in metadata (name, image, media_type, author) do not exist.
   *
   * @param params { assetName; quantity; txHash? }
   * @param test: { assetName; metadata; quantity; txHash? }
   *
   * @returns unsignedTx
   */
  tc25 = async (
    param: { assetName: string; quantity: string; txHash?: string },
    test: { assetName: string; metadata: Record<string, string>; quantity: string; txHash?: string },
  ) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const storeUtxo = !isNil(param.txHash)
      ? await this.getUtxoForTx(this.storeAddress, param.txHash)
      : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(param.assetName)));
    const storeUtxo1 = !isNil(test.txHash)
      ? await this.getUtxoForTx(this.storeAddress, test.txHash)
      : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(test.assetName)));

    if (!storeUtxo) throw new Error("Store UTXO not found");
    if (!storeUtxo1) throw new Error("Store1 UTXO not found");

    const unsignedTx = this.meshTxBuilder
      .mintPlutusScriptV3()
      .mint(param.quantity, this.policyId, CIP68_222(stringToHex(param.assetName)))
      .mintRedeemerValue(mConStr1([]))
      .mintingScript(this.mintScriptCbor)

      .mintPlutusScriptV3()
      .mint("-1", this.policyId, CIP68_100(stringToHex(param.assetName)))
      .mintRedeemerValue(mConStr1([]))
      .mintingScript(this.mintScriptCbor)

      .spendingPlutusScriptV3()
      .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
      .txInInlineDatumPresent()
      .txInRedeemerValue(mConStr1([]))
      .txInScript(this.storeScriptCbor)

      .spendingPlutusScriptV3()
      .txIn(storeUtxo1.input.txHash, storeUtxo1.input.outputIndex)
      .txInInlineDatumPresent()
      .txInRedeemerValue(mConStr1([]))
      .txInScript(this.storeScriptCbor);

    unsignedTx
      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "1000000",
        },
      ])

      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);

    return await unsignedTx.complete();
  };

  /**
   * @method TC26
   * @description [TC26]: Casting assets but default fields in metadata (name, image, media_type, author) do not exist.
   *
   * @param params { assetName; quantity; txHash? }
   * @param test: { assetName; metadata; quantity; txHash? }
   *
   * @returns unsignedTx
   */
  tc26 = async (
    param: { assetName: string; quantity: string; txHash?: string },
    test: { assetName: string; metadata: Record<string, string>; quantity: string; txHash?: string },
  ) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const storeUtxo = !isNil(param.txHash)
      ? await this.getUtxoForTx(this.storeAddress, param.txHash)
      : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(param.assetName)));
    const storeUtxo1 = !isNil(test.txHash)
      ? await this.getUtxoForTx(this.storeAddress, test.txHash)
      : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(test.assetName)));

    if (!storeUtxo) throw new Error("Store UTXO not found");
    if (!storeUtxo1) throw new Error("Store1 UTXO not found");

    const unsignedTx = this.meshTxBuilder

      .spendingPlutusScriptV3()
      .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
      .txInInlineDatumPresent()
      .txInRedeemerValue(mConStr1([]))
      .txInScript(this.storeScriptCbor)

      .spendingPlutusScriptV3()
      .txIn(storeUtxo1.input.txHash, storeUtxo1.input.outputIndex)
      .txInInlineDatumPresent()
      .txInRedeemerValue(mConStr1([]))
      .txInScript(this.storeScriptCbor)

      .txOut(walletAddress, [
        {
          quantity: "1",
          unit: this.policyId + CIP68_100(stringToHex(param.assetName)),
        },
      ])

      .txOut(APP_WALLET_ADDRESS, [
        {
          quantity: "1",
          unit: this.policyId + CIP68_100(stringToHex(test.assetName)),
        },
      ])

      .txOut(APP_WALLET_ADDRESS, [
        {
          unit: "lovelace",
          quantity: "1000000",
        },
      ])

      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address)
      .setNetwork(appNetwork);

    return await unsignedTx.complete();
  };

  tc27 = async () => {
    const scriptAddr = scriptAddress(
      "aa048e4cc8a1e67e1d97ffbd4be614388014cbc2b2451527202943b6",
      "9d4dcd7e454d2434164f4efb8edeb358d86a1dad9ec6224cfcbce3e6",
    );
    const address = serializeAddressObj(scriptAddr);
    console.log(address);
  };
}
