"use server";

import { Cip68Contract } from "@/contract";
import { blockfrostFetcher } from "@/lib/cardano";
import { AssetDetails, AssetDetailsWithTransactionHistory, TransactionHistory } from "@/types";
import { datumToJson } from "@/utils";
import { parseError } from "@/utils/error/parse-error";
import { isNil } from "lodash";

export const getAssetInfo = async (unit: string) => {
  try {
    const scriptAddress = new Cip68Contract({}).storeAddress;
    const cip100Unit = unit.replace("000de140", "000643b0");
    const utxo = (await blockfrostFetcher.fetchAddressUTXOsAsset(scriptAddress, cip100Unit))[0];
    const assetDetails: AssetDetails = await blockfrostFetcher.fetchSpecificAsset(unit);
    if (isNil(assetDetails)) {
      throw new Error("Asset not found");
    }
    const assetTransactions: TransactionHistory[] = await blockfrostFetcher.fetchAssetTransactions(unit);

    const data: AssetDetailsWithTransactionHistory = {
      ...assetDetails,
      metadata: (await datumToJson(utxo.inline_datum, {
        contain_pk: true,
      })) as Record<string, string>,
      transaction_history: assetTransactions,
    };

    return {
      data,
      message: "Success",
    };
  } catch (e) {
    return {
      data: null,
      message: parseError(e),
    };
  }
};
