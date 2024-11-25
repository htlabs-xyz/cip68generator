import { KeyValuePair } from "@/types";
import { AssetMetadata } from "@meshsdk/core";

export const generateJson = (fields: KeyValuePair[]) => {
  return fields.reduce((acc, { key, value }) => {
    if (key) {
      acc[key] = value;
    }
    return acc;
  }, {} as AssetMetadata);
};
export const generateFields = (json: AssetMetadata): KeyValuePair[] => {
  try {
    return Object.entries(json).map(([key, value]) => ({
      key,
      value: value as string,
    }));
  } catch {
    return [];
  }
};
