"use server";

import { Cip68Contract } from "@/contract";
import { blockfrostFetcher } from "@/lib/cardano";
import { parseError } from "@/utils/error/parse-error";

export const getAppStatistic = async () => {
  try {
    const storedAddress = new Cip68Contract({}).storeAddress;
    console.log(storedAddress)
    const response = await blockfrostFetcher.fetchAddressDetail(storedAddress);
    const storeUtxos = await blockfrostFetcher.fetchUtxoByAddress(storedAddress);
    const totalUpdate = storeUtxos.length;

    const totalTransaction = response.tx_count;
    const totalMint = response.received_sum.length - 1;
    const totalBurn = response.received_sum.length - response.sent_sum.length;
    const data = {
      transaction: totalTransaction,
      mint: totalMint,
      burn: totalBurn,
      update: totalUpdate,
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
