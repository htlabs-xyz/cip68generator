export function convertObject(data: string[][]): Record<string, string>[] {
  return data.slice(1).map((row) =>
    row.reduce(
      (acc, curr, index) => {
        const key = data[0][index];
        acc[key] = curr;
        return acc;
      },
      {} as Record<string, string>,
    ),
  );
}
