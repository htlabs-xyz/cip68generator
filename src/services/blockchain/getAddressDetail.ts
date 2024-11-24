"use server";

import { blockfrostFetcher } from "@/lib/cardano";
import {
  AssetDetails,
  AssetDetailsWithTransactionHistory,
  TransactionHistory,
} from "@/types";
import { isNil } from "lodash";

export const getAddressDetail = async (address: string) => {
  try {
    const data = await blockfrostFetcher.fetchAddressDetail(address);

    return {
      data,
      message: "Success",
    };
  } catch (e) {
    return {
      data: null,
      message: e instanceof Error ? e.message : "Unknown error",
    };
  }
};
