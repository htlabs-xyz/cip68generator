import FileDisplay from "@/components/common/file-display";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IPFS_GATEWAY } from "@/constants";
import { AssetDetails } from "@/types";
import { hexToString } from "@meshsdk/core";
import Link from "next/link";

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
      <div className="h-full rounded-lg">
        <Card className=" border-0 bg-zinc-900">
          <CardHeader className="p-0">
            <AspectRatio ratio={4 / 4}>
              <FileDisplay
                src={imgSrc}
                alt={"image"}
                objectFit="contain"
                type={mediaType}
                className="h-auto w-full rounded-lg border object-contain"
              />
            </AspectRatio>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            <p className="text-sm text-zinc-400 font-mono break-all">
              <span className="text-xs">{fingerprintSort}</span>
            </p>
            <h3 className="text-xl text-white font-semibold">
              {" "}
              {assetNameSort}
            </h3>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}
