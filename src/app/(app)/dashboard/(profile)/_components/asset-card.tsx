import FileDisplay from "@/components/common/file-display";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { IPFS_GATEWAY } from "@/constants";
import { AssetDetails } from "@/types";
import { hexToString } from "@meshsdk/core";
import Link from "next/link";

export default function AssetCard({
  data,
  index,
}: {
  data: AssetDetails;
  index: number;
}) {
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
      <div className="rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md hover:shadow-slate-800">
        <Card className="h-full">
          <AspectRatio ratio={5 / 3} className="bg-muted">
            <FileDisplay
              src={imgSrc}
              alt={"image"}
              type={mediaType}
              className="h-full w-full rounded-t-lg object-cover"
            />
          </AspectRatio>
          <div className="flex flex-col items-center justify-start gap-2 self-stretch px-4 py-2">
            <div className="font-semibol self-stretch text-center text-base">
              {"(222) " + assetNameSort}
            </div>
            <div className="font- self-stretch text-center text-sm text-secondary">
              {fingerprintSort}
            </div>
          </div>
        </Card>
      </div>
    </Link>
  );
}
