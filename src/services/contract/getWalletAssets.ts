"use server";
import { appNetworkId } from "@/constants";
import { Cip68Contract } from "@/contract";
import { blockfrostFetcher, blockfrostProvider, koiosFetcher } from "@/lib/cardano";
import { AssetDetails, AssetType } from "@/types";
import { parseError } from "@/utils/error/parse-error";
import { hexToString, MeshWallet } from "@meshsdk/core";
import { isNil } from "lodash";

export async function getWalletAssets({
  walletAddress,
  query = "",
  page = 1,
  limit = 12,
}: {
  walletAddress: string;
  query?: string;
  page?: number;
  limit?: number;
}) {
  try {
    if (isNil(walletAddress)) {
      throw new Error("walletAddress is Null");
    }
    const wallet = new MeshWallet({
      networkId: appNetworkId,
      fetcher: blockfrostProvider,
      submitter: blockfrostProvider,
      key: { type: "address", address: walletAddress },
    });
    const cip68Contract: Cip68Contract = new Cip68Contract({ wallet: wallet });
    const assetsAddress: AssetType[] = await koiosFetcher.fetchAssetsFromAddress(walletAddress);
    const filteredAssetsAddress = assetsAddress.filter((asset) => asset.policy_id === cip68Contract.policyId);
    const filteredAssetsAddressQuery = filteredAssetsAddress.filter((asset) => {
      const assetNameString = hexToString(asset.asset_name);
      return assetNameString.toLowerCase().includes(query.toLowerCase());
    });
    const total = filteredAssetsAddressQuery.length;
    const assetsSlice: AssetType[] = filteredAssetsAddressQuery.slice((page - 1) * limit, page * limit);

    const assets: AssetDetails[] = await Promise.all(
      assetsSlice.map(async (assetsSlice) => {
        const assetSpec = await blockfrostFetcher.fetchSpecificAsset(assetsSlice.policy_id + assetsSlice.asset_name);
        return assetSpec as AssetDetails;
      }),
    );
    return { totalUserAssets: filteredAssetsAddress.length, data: assets, totalItem: total, totalPages: Math.ceil(total / limit), currentPage: page };
  } catch (e) {
    return { data: [], message: parseError(e) };
  }
}
