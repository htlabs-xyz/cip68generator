import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
export default function AssetCardSkeleton({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="rounded-lg shadow-none transition-shadow duration-300 gap-2"
    >
      <div>
        <AspectRatio ratio={5 / 3} className="bg-muted rounded-lg">
          <Skeleton className="h-[125px] w-[250px] rounded-xl " />
        </AspectRatio>
        <div className="flex flex-col items-center justify-start gap-2 self-stretch px-4 py-2">
          <div className="font-semibol self-stretch text-center text-base">
            <Skeleton className="h-5 w-[250px]" />
          </div>
          <div className="font- self-stretch text-center text-sm text-secondary">
            <Skeleton className="h-5 w-[200px]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
