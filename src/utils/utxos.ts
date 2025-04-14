import { UTxO } from "@meshsdk/core";

export function getUtxosOnlyLovelace(utxos: UTxO[], targetLovelace: number): UTxO[][] {
  const groupedUtxos: UTxO[][] = [];
  let currentGroup: UTxO[] = [];
  let currentTotal = 0;

  for (const utxo of utxos) {
    const hasOnlyLovelace = utxo.output.amount.every((amount) => amount.unit === "lovelace");
    if (!hasOnlyLovelace) {
      continue;
    }

    const lovelaceAmount = utxo.output.amount.find((amount) => amount.unit === "lovelace")?.quantity || 0;

    if (currentTotal + Number(lovelaceAmount) > targetLovelace) {
      groupedUtxos.push(currentGroup);
      currentGroup = [];
      currentTotal = 0;
    }

    currentGroup.push(utxo);
    currentTotal += Number(lovelaceAmount);

    if (currentTotal === targetLovelace) {
      groupedUtxos.push(currentGroup);
      currentGroup = [];
      currentTotal = 0;
    }
  }

  if (currentGroup.length > 0) {
    groupedUtxos.push(currentGroup);
  }

  return groupedUtxos;
}
