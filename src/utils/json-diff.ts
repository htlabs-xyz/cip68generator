type JsonRecord = Record<string, string> | null | undefined;

export interface DiffResult {
  key: string;
  oldValue: string | null;
  newValue: string | null;
  status: "added" | "removed" | "changed" | "unchanged";
}

export function compareJson(oldJson: JsonRecord, newJson: JsonRecord): DiffResult[] {
  const oldKeys = oldJson ? Object.keys(oldJson) : [];
  const newKeys = newJson ? Object.keys(newJson) : [];
  const allKeys = new Set([...oldKeys, ...newKeys]);
  const result: DiffResult[] = [];

  for (const key of allKeys) {
    const oldValue = oldJson?.[key];
    const newValue = newJson?.[key];

    if (oldValue === undefined) {
      result.push({
        key,
        oldValue: null,
        newValue: newValue ?? null,
        status: "added",
      });
    } else if (newValue === undefined) {
      result.push({ key, oldValue, newValue: null, status: "removed" });
    } else if (oldValue !== newValue) {
      result.push({ key, oldValue, newValue, status: "changed" });
    } else {
      result.push({ key, oldValue, newValue, status: "unchanged" });
    }
  }

  return result;
}
