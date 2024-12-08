"use server";
import { appNetworkId } from "@/constants";
import { Cip68Contract } from "@/contract";
import { blockfrostProvider } from "@/lib/cardano";
import { AssetInput } from "@/types";
import { MeshTxBuilder, MeshWallet } from "@meshsdk/core";
import { isNil } from "lodash";

export const createBurnTransaction = async ({ address, input }: { address: string; input: AssetInput[] }) => {
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
    // const burnInput = {
    //   assetName: input.assetName,
    //   quantity: input.quantity,
    // };
    const tx = await cip68Contract.burn(
      input.map((asset) => ({
        ...asset,
        quantity: asset.quantity ?? "1",
      })),
    );
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
