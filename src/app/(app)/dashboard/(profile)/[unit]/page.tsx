// "use client";
// import { Copy } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import FileDisplay from "@/components/common/file-display";
// import { IPFS_GATEWAY } from "@/constants";
// import { AspectRatio } from "@radix-ui/react-aspect-ratio";
// import { isEmpty, isNil } from "lodash";
// import { useUnitContext } from "@/contexts/unit";
// import Loading from "@/app/(loading)/loading";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import Property from "../_components/property";
// import Pagination from "../_components/pagination-table";
// import { hexToString } from "@meshsdk/core";
// import { shortenString } from "@/utils";
// import Link from "next/link";
// import { AssetHistory } from "@/types";

// export default function DetailsPage() {
//   const {
//     assetDetails,
//     handleBurn,
//     handleUpdate,
//     isAuthor,
//     metadataToUpdate,
//     // assetHistory,
//   } = useUnitContext();
//   if (isNil(assetDetails)) return <Loading />;
//   const { asset_name, policy_id, onchain_metadata, fingerprint } = assetDetails;

//   const assetNameString = hexToString(asset_name.replace(/^000de140/, ""));

//   const assetNameSort =
//     assetNameString.length > 20
//       ? assetNameString.slice(0, 10) + "..." + assetNameString.slice(-10)
//       : assetNameString;

//   const policyIdSort = policy_id.slice(0, 10) + "..." + policy_id.slice(-15);

//   const fingerprintSort =
//     fingerprint.slice(0, 10) + "..." + fingerprint.slice(-15);

//   const imgSrc =
//     IPFS_GATEWAY + onchain_metadata?.image.replace("ipfs://", "ipfs/") || "";

//   const mediaType = onchain_metadata?.type || "image/png";

//   const description = onchain_metadata?.description || "";

//   return (
//     <div className="py-8 px-10 m-auto flex flex-col">
//       <div className="rounded-xl p-6  flex flex-col gap-3">
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* NFT Image */}
//           <div className="w-full h-full md:w-1/2">
//             <AspectRatio ratio={4 / 4}>
//               <FileDisplay
//                 src={imgSrc}
//                 alt={"image"}
//                 objectFit="contain"
//                 type={mediaType}
//                 className="h-auto w-full rounded-lg border object-contain"
//               />
//             </AspectRatio>
//           </div>

//           {/* NFT Details */}
//           <Card className="w-full h-full md:w-1/2 bg-card ">
//             <CardContent className="p-6 space-y-6">
//               {/* Title and Verification */}
//               <div className="space-y-2">
//                 <div className="flex items-center gap-2">
//                   <h1 className="text-2xl font-bold">{assetNameSort}</h1>
//                   <span className="text-blue-400">✓</span>
//                 </div>
//                 {/* <div className="flex items-center gap-2 text-sm text-gray-400">
//                   <span>Owned by</span>
//                   <span className="text-blue-400">legend</span>
//                 </div> */}
//               </div>

//               {/* Policy and Asset IDs */}
//               <div className="space-y-2 ">
//                 <div className="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
//                   <span className="text-sm text-gray-400">
//                     Policy ID: {policyIdSort}
//                   </span>
//                   <Button variant="ghost" size="icon" className="h-8 w-8">
//                     <Copy className="h-4 w-4" />
//                   </Button>
//                 </div>
//                 <div className="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
//                   <span className="text-sm text-gray-400">
//                     Asset ID: {fingerprintSort}
//                   </span>
//                   <Button variant="ghost" size="icon" className="h-8 w-8">
//                     <Copy className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>

//               {/* Description */}
//               <p className="text-gray-400">{description}</p>
//               <div className="space-y-4">
//                 {isAuthor && (
//                   <div className="flex gap-4">
//                     <Button
//                       onClick={handleUpdate}
//                       className="flex-1 bg-gray-800 hover:bg-gray-700"
//                     >
//                       Update
//                     </Button>
//                     <Button
//                       onClick={handleBurn}
//                       className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black"
//                     >
//                       Burn
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Tabs Section */}
//         <Tabs defaultValue="properties" className="w-full mt-5">
//           <TabsList className="bg-gray-900">
//             <TabsTrigger value="properties">Properties</TabsTrigger>
//             <TabsTrigger value="transaction">Transaction History</TabsTrigger>
//             <TabsTrigger value="meadata">Metadata History</TabsTrigger>
//           </TabsList>
//           <TabsContent value="properties" className="mt-4">
//             <Card className="p-5 border-none rounded-lg flex flex-col gap-8">
//               <div className="flex flex-col gap-8">
//                 <div className="grid grid-cols-4 gap-y-5 gap-x-2">
//                   {metadataToUpdate &&
//                     Object.entries(metadataToUpdate).map(
//                       ([name, value], index) => (
//                         <TooltipProvider key={index}>
//                           <Tooltip>
//                             <TooltipTrigger asChild>
//                               <Property
//                                 image=""
//                                 name={name}
//                                 value={
//                                   isNil(value) || isEmpty(value)
//                                     ? "null"
//                                     : `${value}`
//                                 }
//                               />
//                             </TooltipTrigger>
//                             <TooltipContent>
//                               {isNil(value) || isEmpty(value)
//                                 ? "null"
//                                 : `${value}`}
//                             </TooltipContent>
//                           </Tooltip>
//                         </TooltipProvider>
//                       ),
//                     )}
//                 </div>
//               </div>
//             </Card>
//           </TabsContent>
//           <TabsContent value="transaction" className="mt-4">
//             <Card className="bg-gray-900 border-gray-800">
//               <CardContent className="p-4">
//                 <Table className="w-full">
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead className="h-8 py-5 px-4 text-[#8e97a8] text-[10px] uppercase leading-[16px] font-medium text-center">
//                         {"Tx Hash / Datetime"}
//                       </TableHead>
//                       <TableHead className="h-8 py-5 px-4 text-[#8e97a8] text-[10px] uppercase leading-[16px] font-medium text-center">
//                         {"Fees / Action"}
//                       </TableHead>
//                       <TableHead className="h-8 py-5 px-4 text-[#8e97a8] text-[10px] uppercase leading-[16px] font-medium text-center">
//                         {"Status / History"}
//                       </TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {assetHistory?.map((transaction: AssetHistory, index) => (
//                       <TableRow
//                         key={index}
//                         className={index % 2 === 0 ? "bg-[#0d0e12]" : ""}
//                       >
//                         <TableCell className="h-14 py-5 px-4 text-center">
//                           <Link
//                             href={"/"}
//                             className="max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-white text-[14px] font-medium leading-[20px]"
//                           >
//                             {shortenString(transaction.tx, 10)}
//                           </Link>
//                           <p className="text-[#5b6372] max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-[12px] font-medium leading-4">
//                             {new Date(
//                               transaction?.datetime * 1000,
//                             ).toLocaleString()}
//                           </p>
//                         </TableCell>
//                         <TableCell className="h-14 py-5 px-4 text-center">
//                           <h3 className="max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-white text-[14px] font-medium leading-[20px]">
//                             {shortenString(transaction.tx_hash, 10)}
//                           </h3>
//                           {/* <p className="text-[#5b6372] max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-[12px] font-medium leading-4">
//                                 {transaction.fees}
//                               </p> */}
//                         </TableCell>
//                         <TableCell className="h-14 py-5 px-4 text-center">
//                           <h3 className="max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-white text-[14px] font-medium leading-[20px]">
//                             {new Date(
//                               transaction.block_time * 1000,
//                             ).toLocaleString()}
//                           </h3>
//                           {/* <p className="text-[#5b6372] max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-[12px] font-medium leading-4">
//                                 {transaction.status}
//                               </p> */}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//                 <>
//                   <Pagination
//                     page={1}
//                     setPage={null!}
//                     totalItems={1}
//                     totalPages={3}
//                   />
//                 </>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }
