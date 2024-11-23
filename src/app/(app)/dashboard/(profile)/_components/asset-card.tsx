import FileDisplay from "@/components/common/file-display";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { IPFS_GATEWAY } from "@/constants";
import { AssetDetails } from "@/types";
import { hexToString } from "@meshsdk/core";
import Link from "next/link";
import { MdPolicy } from "react-icons/md";

export default function AssetCard({ data }: { data: AssetDetails }) {
  const { asset_name, policy_id, onchain_metadata, fingerprint } = data;

  const imgSrc =
    IPFS_GATEWAY + onchain_metadata?.image.replace("ipfs://", "ipfs/") || "";

  const mediaType = onchain_metadata?.type || "image/png";

  const assetNameString = hexToString(asset_name.replace(/^000de140/, ""));

  const assetNameSort =
    assetNameString.length > 20
      ? assetNameString.slice(0, 10) + "..." + assetNameString.slice(-10)
      : assetNameString;

  const fingerprintSort =
    fingerprint.slice(0, 10) + "..." + fingerprint.slice(-15);

  return (
    <Link href={`/dashboard/${policy_id + asset_name}`}>
      <Card className="h-full">
        <AspectRatio ratio={4 / 3} className="bg-muted">
          <FileDisplay
            src={imgSrc}
            alt={asset_name}
            type={mediaType}
            className="h-full w-full rounded-lg border object-cover"
          />
        </AspectRatio>
        <div className="items-center justify-start gap-3 self-stretch px-4 py-2">
          <div className="grid grid-cols-1 gap-2 relative">
            {/* <VscVerified className="text-[25px] absolute top-1 right-4" /> */}
            <div className="flex items-center gap relative rounded-md py-[2px] px-2 bg-[#282c34] w-fit">
              <MdPolicy className="text-xs" />
              <span className="text-xs">{fingerprintSort}</span>
            </div>
            <h3 className="text-lg font-semibold"> {assetNameSort}</h3>
            {/* <div className="flex items-end justify-start gap-1 min-h-6 overflow-hidden">
              <div className="flex items-end gap-2">
                <span className="text-gray-300 text-[16px] leading-6">₳</span>
                <span className="text-gray-300 text-[16px] font-medium leading-6">
                  0.22
                </span>
                <span className="text-gray-400 text-[12px] leading-5 justify-end">
                  Fee with script reference
                </span>
              </div>
            </div> */}
          </div>
        </div>
      </Card>
    </Link>
  );
}
