import { KeyValuePair } from "@/types";

export const generateJson = (fields: KeyValuePair[]) => {
  return fields.reduce(
    (acc, { key, value }) => {
      if (key) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, string>,
  );
};
export const generateFields = (json: Record<string, string>): KeyValuePair[] => {
  try {
    return Object.entries(json).map(([key, value]) => ({
      key,
      value: value as string,
    }));
  } catch {
    return [];
  }
};
