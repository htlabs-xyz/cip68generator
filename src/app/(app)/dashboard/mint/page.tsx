import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Images } from "@/components/common/images";
import Link from "next/link";
import { Box } from "lucide-react";
import { routes } from "@/constants/routes";
export default function UtilitiesPage() {
  return (
    <div className="py-8 px-10 m-auto flex flex-col max-md:px-0">
      <div className="rounded-xl p-6 bg-section shadow-md flex-wrap gap-3 space-y-5">
        <div className="mt-2 grid  gap-4 grid-cols-3 max-md:grid-cols-1">
          <Link
            href={routes.mint.children.mintOne.redirect}
            className="rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md hover:shadow-slate-800"
          >
            <Card className="h-full">
              <AspectRatio ratio={5 / 3} className="bg-muted">
                <Images.mintOne className="h-full w-full rounded-t-lg object-cover" />
              </AspectRatio>
              <div className="flex flex-col items-center justify-start gap-3 self-stretch px-4 py-2">
                <div className="font-semibol self-stretch text-center text-base">Mint One</div>
                <div className="font- self-stretch text-center text-sm text-secondary">Easily mint dynamic asset on Cardano!</div>
              </div>
            </Card>
          </Link>
          <Link
            href={routes.mint.children.mintMany.redirect}
            className="rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md hover:shadow-slate-800"
          >
            <Card className="h-full">
              <AspectRatio ratio={5 / 3} className="bg-muted">
                <Images.mintMany className="h-full w-full rounded-t-lg object-cover" />
              </AspectRatio>
              <div className="flex flex-col items-center justify-start gap-3 self-stretch px-4 py-2">
                <div className="font-semibol self-stretch text-center text-base">Mint Many</div>
                <div className="font- self-stretch text-center text-sm text-secondary">Quickly asset minting using csv file</div>
              </div>
            </Card>
          </Link>
          <Card className="h-full opacity-50">
            <AspectRatio ratio={5 / 3} className="bg-muted flex items-center justify-center opacity-70 border-dashed">
              <Box className="h-20 w-20" />
            </AspectRatio>
            <div className="flex flex-col items-center justify-start gap-3 self-stretch px-4 py-2">
              <div className="font-semibol self-stretch text-center text-base">API Program</div>
              <div className="font- self-stretch text-center text-sm text-secondary">Comming Soon</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
