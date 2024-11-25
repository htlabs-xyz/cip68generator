"use server";

import { blockfrostFetcher } from "@/lib/cardano";

export const getAddressDetail = async (address: string) => {
  try {
    const response = await blockfrostFetcher.fetchAddressDetail(address);
    const totalTransaction = response.tx_count;
    const totalMint = response.received_sum.length - 1;
    const totalBurn = response.received_sum.length - response.sent_sum.length;
    const totalUpdate = totalTransaction - totalMint - totalBurn;
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
      message: e instanceof Error ? e.message : "Unknown error",
    };
  }
};
