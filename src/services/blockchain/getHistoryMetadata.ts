"use server";

import { blockfrostFetcher } from "@/lib/cardano";
import { SpecialTransaction } from "@/types";

export const getHistoryMetadata = async function (
  txHash: string,
  unit: string,
) {
  try {
    const specialTransaction: SpecialTransaction =
      await blockfrostFetcher.fetchSpecialTransaction(txHash);
    const transaction = await blockfrostFetcher.fetchTransactionsUTxO(txHash);

    const assetInput = transaction.inputs.find(function (input) {
      const asset = input.amount.find(function (amt) {
        return amt.unit === unit;
      });
      return asset !== undefined;
    });

    const assetOutput = transaction.outputs.find(function (output) {
      const asset = output.amount.find(function (amt) {
        return amt.unit === unit;
      });
      return asset !== undefined;
    });

    if (!assetInput && assetOutput) {
      return {
        txHash: txHash,
        datetime: specialTransaction.block_time,
        fee: specialTransaction.fees,
        status: "Completed",
        action: "Mint",
      };
    }

    if (!assetOutput && assetInput) {
      return {
        txHash: txHash,
        datetime: specialTransaction.block_time,
        fee: specialTransaction.fees,
        status: "Completed",
        action: "Burn",
      };
    }

    if (assetInput && assetOutput) {
      return {
        txHash: txHash,
        datetime: specialTransaction.block_time,
        fee: specialTransaction.fees,
        status: "Completed",
        action: "Update",
      };
    }

    return {
      data: null!,
      message: "Success",
    };
  } catch (e) {
    return {
      data: null,
      message: e instanceof Error ? e.message : "Unknown error",
    };
  }
};
