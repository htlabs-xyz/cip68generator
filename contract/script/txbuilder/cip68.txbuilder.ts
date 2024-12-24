import { CIP68_222, stringToHex, mConStr0, CIP68_100, metadataToCip68, mConStr1, deserializeAddress, UTxO } from "@meshsdk/core";

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
  tc1 = async (
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
   * @method TC2
   * @description [TC2]: Casting assets but default fields in metadata (name, image, media_type, author) do not exist.
   */
  tc2 = async (
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
   * @method TC25
   * @description [TC25]: Casting assets but default fields in metadata (name, image, media_type, author) do not exist.
   */
  tx25 = async (params: { assetName: string; quantity: string; txHash?: string }, test: { assetName: string; quantity: string; txHash?: string }) => {
    const { utxos, walletAddress, collateral } = await this.getWalletForTx();
    const unsignedTx = this.meshTxBuilder;
    const storeUtxo = !isNil(params.txHash)
      ? await this.getUtxoForTx(this.storeAddress, params.txHash)
      : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(params.assetName)));
    const storeUtxo1 = !isNil(test.txHash)
      ? await this.getUtxoForTx(this.storeAddress, test.txHash)
      : await this.getAddressUTXOAsset(this.storeAddress, this.policyId + CIP68_100(stringToHex(test.assetName)));

    if (!storeUtxo) throw new Error("Store UTXO not found");
    if (!storeUtxo1) throw new Error("Store UTXO not found");

    unsignedTx
      .mintPlutusScriptV3()
      .mint(params.quantity, this.policyId, CIP68_222(stringToHex(params.assetName)))
      .mintRedeemerValue(mConStr1([]))
      .mintingScript(this.mintScriptCbor)

      .mintPlutusScriptV3()
      .mint("-1", this.policyId, CIP68_100(stringToHex(params.assetName)))
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
      .txInScript(this.storeScriptCbor)

      .txOut(walletAddress, [
        {
          unit: this.policyId + CIP68_100(stringToHex(test.assetName)),
          quantity: "1",
        },
      ]);

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
}
