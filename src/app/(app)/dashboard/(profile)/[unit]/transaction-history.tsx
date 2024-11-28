import Pagination from "@/components/common/pagination";
import { Card, CardContent } from "@/components/ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { appNetwork, decialPlace } from "@/constants";
import { useUnitContext } from "@/contexts/unit";
import { AssetHistory } from "@/types";
import { shortenString } from "@/utils";
import Link from "next/link";

export default function TransactionHistory() {
  const { assetHistory, unit, txCurrentPage, txTotalPages, setTxCurrentPage } =
    useUnitContext();
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-4">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="h-8 py-5 px-4 text-[#8e97a8] text-[10px] uppercase leading-[16px] font-medium text-center">
                {"Tx Hash / Datetime"}
              </TableHead>
              <TableHead className="h-8 py-5 px-4 text-[#8e97a8] text-[10px] uppercase leading-[16px] font-medium text-center">
                {"Fees / Action"}
              </TableHead>
              <TableHead className="h-8 py-5 px-4 text-[#8e97a8] text-[10px] uppercase leading-[16px] font-medium text-center">
                {"Status / History"}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assetHistory?.map((transaction: AssetHistory, index) => (
              <TableRow
                key={index}
                className={index % 2 === 0 ? "bg-[#0d0e12]" : ""}
              >
                <TableCell className="h-14 py-5 px-4 text-center">
                  <Link
                    href={`https://${appNetwork}.cexplorer.io/tx/${transaction.txHash}`}
                    target="_blank"
                    className="max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-white text-[14px] font-medium leading-[20px]"
                  >
                    {shortenString(transaction.txHash, 10)}
                  </Link>
                  <p className="text-[#5b6372] max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-[12px] font-medium leading-4">
                    {new Date(transaction?.datetime * 1000).toLocaleString()}
                  </p>
                </TableCell>
                <TableCell className="h-14 py-5 px-4 text-center">
                  <h3 className="max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-white text-[14px] font-medium leading-[20px]">
                    {((Number(transaction.fee) || 0) / decialPlace).toFixed(3)}{" "}
                    ₳
                  </h3>
                  <p className="text-[#5b6372] max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-[12px] font-medium leading-4">
                    {transaction.action}
                  </p>
                </TableCell>
                <TableCell className="h-14 py-5 px-4 text-center">
                  <h3 className="max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-white text-[14px] font-medium leading-[20px]">
                    {transaction.status}
                  </h3>
                  <Link href={`${unit}/${transaction.txHash}`}>
                    <p className="text-[#5b6372] underline max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-[12px] font-medium leading-4">
                      View History
                    </p>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <>
          <Pagination
            currentPage={txCurrentPage}
            setCurrentPage={setTxCurrentPage}
            totalPages={txTotalPages}
          />
        </>
      </CardContent>
    </Card>
  );
}
