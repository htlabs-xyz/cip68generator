"use server";
import { appNetworkId } from "@/constants";
import { Cip68Contract } from "@/contract";
import { blockfrostProvider } from "@/lib/cardano";
import { AssetInput } from "@/types";
import { parseError } from "@/utils/error/parse-error";
import { deserializeAddress, MeshWallet } from "@meshsdk/core";
import { isEmpty, isNil } from "lodash";

export const createMintTransaction = async ({ address, mintInput }: { address: string; mintInput: AssetInput[] }) => {
  try {
    if (isEmpty(mintInput)) {
      throw new Error("No assets to mint");
    }

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

    const cip68Contract: Cip68Contract = new Cip68Contract({
      wallet: wallet,
    });
    const input = await Promise.all(
      mintInput.map(async (mint) => ({
        assetName: mint.assetName,
        quantity: mint.quantity ?? "1",
        receiver: mint.receiver ?? address,
        metadata: {
          ...mint.metadata,
          _pk: deserializeAddress(await wallet.getChangeAddress()).pubKeyHash,
        },
      })),
    );
    const tx = await cip68Contract.mint(input);
    return {
      result: true,
      data: tx,
      message: "Transaction created successfully",
    };
  } catch (e) {
    return {
      result: false,
      data: null,
      message: parseError(e),
    };
  }
};
