import { Button } from "@/components/ui/button";
import { useUnitContext } from "@/contexts/unit";
import Link from "next/link";

export default function MetadataStep() {
  const { startBurning, unit } = useUnitContext();

  return (
    <div className="h-full py-8 px-10 m-auto flex flex-col">
      <div className="rounded-md border border-dashed">
        <div className="flex flex-col space-y-2 text-left p-8">
          <h1 className="text-2xl font-semibold tracking-tight">Are you absolutely sure?</h1>
          <p>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</p>
        </div>
      </div>
      <div className="fixed right-0 bottom-0 z-10 max-h-16 w-full bg-section">
        <div className="mx-4 flex h-16 items-center sm:mx-8">
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Link href={`/dashboard/${unit}`}>
              <Button variant="secondary">Back</Button>
            </Link>
            <Button onClick={startBurning}>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
