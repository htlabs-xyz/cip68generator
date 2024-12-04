"use server";
import { appNetworkId } from "@/constants";
import { Cip68Contract } from "@/contract";
import { blockfrostProvider } from "@/lib/cardano";
import { deserializeAddress, MeshTxBuilder, MeshWallet } from "@meshsdk/core";
import { isNil } from "lodash";

export const createUpdateTransaction = async ({
  address,
  input,
}: {
  address: string;
  input: {
    assetName: string;
    metadata: Record<string, string>;
  };
}) => {
  try {
    if (isNil(address)) {
      throw new Error("User not found");
    }
    const wallet = new MeshWallet({
      networkId: appNetworkId,
      fetcher: blockfrostProvider,
      submitter: blockfrostProvider,
      key: {
        type: "address",
        address: address,
      },
    });
    const txBuilder = new MeshTxBuilder({
      fetcher: blockfrostProvider,
      evaluator: blockfrostProvider,
    });
    const cip68Contract: Cip68Contract = new Cip68Contract({
      fetcher: blockfrostProvider,
      wallet: wallet,
      meshTxBuilder: txBuilder,
    });
    const updateInput = {
      assetName: input.assetName,
      metadata: {
        ...input.metadata,
        _pk: deserializeAddress(await wallet.getChangeAddress()).pubKeyHash,
      },
    };
    const tx = await cip68Contract.update(updateInput);
    return {
      result: true,
      data: tx,
      message: "Transaction created successfully",
    };
  } catch (e) {
    return {
      result: false,
      data: null,
      message: e instanceof Error ? e.message : "unknown error",
    };
  }
};
