"use server";

import { blockfrostFetcher } from "@/lib/cardano";
import { Input, Output } from "@/types";

export const getHistoryMetadata = async function (txHash: string) {
  try {
    const transaction = await blockfrostFetcher.fetchTransactionsUTxO(txHash);
    const input = transaction.inputs.find(function (input: Input) {
      return input.inline_datum != null && input.data_hash != null;
    });

    const output = transaction.outputs.find(function (output: Output) {
      return output.inline_datum != null && output.data_hash != null;
    });

    if (!input && output?.data_hash) {
      const datumOutput = await blockfrostFetcher.fetchDatum(output.data_hash);
      console.log(datumOutput.json_value.fields[0].map);
    }

    if (!output && input?.data_hash) {
      const datumInput = await blockfrostFetcher.fetchDatum(input.data_hash);
      console.log(datumInput.json_value.fields[0].map);
    }

    if (input?.data_hash && output?.data_hash) {
      const datumOutput = await blockfrostFetcher.fetchDatum(output.data_hash);
      console.log(datumOutput.json_value.fields[0].map);
      const datumInput = await blockfrostFetcher.fetchDatum(input.data_hash);
      console.log(datumInput.json_value.fields[0].map);
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
