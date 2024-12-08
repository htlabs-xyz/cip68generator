import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUnitContext } from "@/contexts/unit";
import Link from "next/link";
import { useState } from "react";

export default function BasicStep() {
  const [open, setOpen] = useState(false);
  const { startBurning, unit, quantityToBurn, setQuantityToBurn, assetDetails } = useUnitContext();

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. This will permanently burn your assets on the blockchain.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={startBurning}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="h-full py-8 px-10 m-auto flex flex-col">
        <div className="rounded-md border border-dashed">
          <div className="flex flex-col space-y-2 text-left p-8">
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity to Burn</Label>
              <div className="flex space-x-2 w-1/2 p-2 ">
                <Input
                  type="number"
                  value={quantityToBurn ?? 1}
                  onChange={(e) => setQuantityToBurn({ quantity: Number(e.target.value) })}
                  required
                  className="border rounded"
                />
                <Button onClick={() => setQuantityToBurn({ quantity: Number(assetDetails.quantity) })}>Burn All</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed right-0 bottom-0 z-10 max-h-16 w-full bg-section">
          <div className="mx-4 flex h-16 items-center sm:mx-8">
            <div className="flex flex-1 items-center justify-end space-x-2">
              <Link href={`/dashboard/${unit}`}>
                <Button variant="secondary">Back</Button>
              </Link>
              <Button onClick={() => setOpen(true)}>Next</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
