import { useMintOneContext } from "@/contexts/mint-one";
import Link from "next/link";
import { appNetwork } from "@/constants";

export default function ResultStep() {
  const { txhash } = useMintOneContext();

  return (
    <div className="h-full py-8 px-10 m-auto flex flex-col">
      <div className="flex flex-col items-center justify-center text-white">
        <p className="mb-2 text-center text-lg font-semibold">
          Mint successful! 🎉
        </p>
        <p className="mb-4 max-w-md text-center text-sm text-gray-300">
          Check your Nft in your Wallet. If it’s not visible, please wait a
          moment for the transaction to complete.
        </p>
        <div className="flex flex-row items-center justify-center space-x-4">
          <Link
            href={`/dashboard`}
            className="mt-4 rounded-lg bg-white px-6 py-2 text-sm font-semibold text-orange-500 shadow-md hover:bg-gray-100"
          >
            Go Home
          </Link>
          <Link
            href={`https://${appNetwork}.cexplorer.io/tx/${txhash}`}
            target="_blank"
            className="mt-4 rounded-lg bg-white px-6 py-2 text-sm font-semibold text-blue-500 shadow-md hover:bg-gray-100"
          >
            View on Cexplorer
          </Link>
        </div>
      </div>
    </div>
  );
}
