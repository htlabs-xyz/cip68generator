import { CIP68_222, stringToHex, mConStr0, CIP68_100, metadataToCip68, mConStr1, deserializeAddress, UTxO } from "@meshsdk/core";

import { MeshAdapter } from "../adapters/mesh.adapter";
import {
  MINT_REFERENCE_SCRIPT_ADDRESS,
  MINT_REFERENCE_SCRIPT_HASH,
  STORE_REFERENCE_SCRIPT_ADDRESS,
  EXCHANGE_FEE_ADDRESS,
  EXCHANGE_FEE_PRICE,
  STORE_REFERENCE_SCRIPT_HASH,
} from "../constants";
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

    const utxoRef: UTxO = await this.getUtxoForTx(MINT_REFERENCE_SCRIPT_ADDRESS, MINT_REFERENCE_SCRIPT_HASH);
    console.log(utxoRef);
    const unsignedTx = this.meshTxBuilder.mintPlutusScriptV3();
    await Promise.all(
      params.map(async ({ assetName, metadata, quantity = "1", receiver = "" }) => {
        const existUtXOwithUnit = await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(assetName)));
        if (existUtXOwithUnit?.output?.plutusData) {
          const pk = await getPkHash(existUtXOwithUnit?.output?.plutusData as string);
          if (pk !== deserializeAddress(walletAddress).pubKeyHash) {
            throw new Error(`${assetName} has been exist`);
          }
          unsignedTx
            .spendingPlutusScriptV3()
            .txIn(existUtXOwithUnit.input.txHash, existUtXOwithUnit.input.outputIndex)
            .txInInlineDatumPresent()
            .txInRedeemerValue(mConStr0([]))
            .spendingTxInReference(utxoRef.input.txHash, utxoRef.input.outputIndex)
            .txOut(this.storeAddress, [
              {
                unit: this.policyId + CIP68_100(stringToHex(assetName)),
                quantity: "1",
              },
            ])
            .txOutInlineDatumValue(metadataToCip68(metadata))

            .mintPlutusScriptV3()
            .mint(quantity, this.policyId, CIP68_222(stringToHex(assetName)))
            .mintTxInReference(utxoRef.input.txHash, utxoRef.input.outputIndex)
            .mintRedeemerValue(mConStr0([]))

            .txOut(!isEmpty(receiver) ? receiver : walletAddress, [
              {
                unit: this.policyId + CIP68_222(stringToHex(assetName)),
                quantity: quantity,
              },
            ]);
        } else {
          unsignedTx
            .mintPlutusScriptV3()
            .mint(quantity, this.policyId, CIP68_222(stringToHex(assetName)))
            .mintTxInReference(utxoRef.input.txHash, utxoRef.input.outputIndex)
            .mintRedeemerValue(mConStr0([]))

            .mintPlutusScriptV3()
            .mint("1", this.policyId, CIP68_100(stringToHex(assetName)))
            .mintTxInReference(utxoRef.input.txHash, utxoRef.input.outputIndex)
            .mintRedeemerValue(mConStr0([]))
            .txOut(!isEmpty(receiver) ? receiver : walletAddress, [
              {
                unit: this.policyId + CIP68_222(stringToHex(assetName)),
                quantity: quantity,
              },
            ])

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

    unsignedTx
      .txOut(EXCHANGE_FEE_ADDRESS, [
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

  burn = async (params: { assetName: string; quantity: string; txHash?: string }[]) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();

    const mintUtxoRef: UTxO = await this.getUtxoForTx(MINT_REFERENCE_SCRIPT_ADDRESS, MINT_REFERENCE_SCRIPT_HASH);
    const storeUtxoRef: UTxO = await this.getUtxoForTx(STORE_REFERENCE_SCRIPT_ADDRESS, STORE_REFERENCE_SCRIPT_HASH);

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
            .mintTxInReference(mintUtxoRef.input.txHash, mintUtxoRef.input.outputIndex)

            .mintPlutusScriptV3()
            .mint("-1", this.policyId, CIP68_100(stringToHex(assetName)))
            .mintRedeemerValue(mConStr1([]))
            .mintTxInReference(mintUtxoRef.input.txHash, mintUtxoRef.input.outputIndex)

            .spendingPlutusScriptV3()
            .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
            .txInInlineDatumPresent()
            .txInRedeemerValue(mConStr1([]))
            .txInScript(this.storeScriptCbor)
            .spendingTxInReference(storeUtxoRef.input.txHash, storeUtxoRef.input.outputIndex);
        } else {
          unsignedTx
            .mintPlutusScriptV3()
            .mint(quantity, this.policyId, CIP68_222(stringToHex(assetName)))
            .mintRedeemerValue(mConStr1([]))
            .mintTxInReference(mintUtxoRef.input.txHash, mintUtxoRef.input.outputIndex)

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
      .txOut(EXCHANGE_FEE_ADDRESS, [
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
    const utxoRef: UTxO = await this.getUtxoForTx(STORE_REFERENCE_SCRIPT_ADDRESS, STORE_REFERENCE_SCRIPT_HASH);
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder;
    await Promise.all(
      params.map(async ({ assetName, metadata, txHash }) => {
        const storeUtxo = !isNil(txHash)
          ? await this.getUtxoForTx(this.storeAddress, txHash)
          : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(assetName)));
        console.log(storeUtxo);
        if (!storeUtxo) throw new Error("Store UTXO not found");
        unsignedTx
          .spendingPlutusScriptV3()
          .txIn(storeUtxo.input.txHash, storeUtxo.input.outputIndex)
          .txInInlineDatumPresent()
          .txInRedeemerValue(mConStr0([]))
          .spendingTxInReference(utxoRef.input.txHash, utxoRef.input.outputIndex)
          // .txInScript(this.storeScriptCbor)
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
      .txOut(EXCHANGE_FEE_ADDRESS, [
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
  createReferenceScriptMint = async () => {
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
      .txOutInlineDatumValue("")
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
  createReferenceScriptStore = async () => {
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
      .txOutInlineDatumValue("")
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .txInCollateral(collateral.input.txHash, collateral.input.outputIndex, collateral.output.amount, collateral.output.address);

    return await unsignedTx.complete();
  };
}
