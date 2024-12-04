import { AssetInput } from "@/types";

export function convertObject(data: string[][]): AssetInput[] {
  return data.slice(1).map((row) =>
    row.reduce((acc, curr, index) => {
      const key = data[0][index];

      // check if key is metadata
      if (key.startsWith("metadata[") && key.endsWith("]")) {
        const metadataKey = key.slice(9, -1); // get [key] from metadata[key]
        if (!acc.metadata) {
          acc.metadata = {};
        }
        acc.metadata[metadataKey] = curr;
      } else if (key === "assetName") {
        acc.assetName = curr;
      } else if (key === "quantity") {
        acc.quantity = curr;
      } else {
        throw new Error(`Invalid key: ${key}`);
      }

      return acc;
    }, {} as AssetInput),
  );
}
