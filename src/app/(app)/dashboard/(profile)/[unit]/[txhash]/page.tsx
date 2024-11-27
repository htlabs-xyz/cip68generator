import { getHistoryMetadata } from "@/services/blockchain/getHistoryMetadata";
import { JsonDiffViewer } from "../../_components/json-diff-viewer";

export default async function DetailHistoryPage({
  params,
}: {
  params: Promise<{
    txhash: string;
    unit: string;
  }>;
}) {
  const unit = (await params).unit;
  const txhash = (await params).txhash;
  const cip100Unit = unit.replace("000de140", "000643b0");
  const data = await getHistoryMetadata({
    txHash: txhash,
    unit: cip100Unit,
  });

  return (
    <>
      <div className="py-8 px-10 m-auto flex flex-col">
        <div className="rounded-xl p-6 bg-section shadow-md flex flex-col gap-3">
          <JsonDiffViewer
            oldJson={data?.metadata?.from as Record<string, string>}
            newJson={data?.metadata?.to as Record<string, string>}
          />
        </div>
      </div>
    </>
  );
}
