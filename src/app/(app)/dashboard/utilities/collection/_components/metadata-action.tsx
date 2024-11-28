"use client";
import JsonBuilder from "@/components/common/json-builder";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dashboardRoutes } from "@/constants/routers";
import { useMetadataContext } from "@/contexts/metadata";
import { toast } from "@/hooks/use-toast";
import { updateMetadata } from "@/services/database/metadata";
import { KeyValuePair } from "@/types";
import { generateFields, generateJson } from "@/utils/json";
import { Metadata } from "@prisma/client";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MetadataAction({ metadata }: { metadata: Metadata }) {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const { refetch } = useMetadataContext();
  const [fields, setFields] = useState<KeyValuePair[]>(
    generateFields(metadata.content),
  );

  const handleUpdate = async () => {
    try {
      const newMetadata = { ...metadata, content: generateJson(fields) };
      const { result, message } = await updateMetadata({
        collectionId: metadata.collectionId,
        metadata: newMetadata,
      });
      if (!result) {
        throw new Error(message);
      }
      toast({
        title: "Metadata Updated",
        description: message,
      });
    } catch (e) {
      toast({
        title: "Failed to update metadata",
        description: e instanceof Error ? e.message : "unknown error",
        variant: "destructive",
      });
    } finally {
      refetch();
      setOpenDialog(false);
    }
  };
  return (
    <>
      <Dialog onOpenChange={setOpenDialog} open={openDialog}>
        <DialogContent className="max-w-full sm:max-w-[80vw] w-screen h-screen sm:h-[80vh] p-0 flex flex-col">
          <div className="flex-grow flex flex-col overflow-hidden">
            <div className="rounded-xl bg-section shadow-md flex flex-col gap-3 h-full overflow-auto">
              <JsonBuilder
                fields={fields}
                setFields={setFields}
                className="h-full w-full sm:w-[90%]"
              />
            </div>
          </div>
          <DialogFooter className="p-4">
            <Button onClick={handleUpdate}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className=" hover:bg-white/10">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32">
          <DropdownMenuItem
            onClick={() =>
              router.push(
                dashboardRoutes.mint.children.mintOne.redirect +
                  "?template=" +
                  metadata.id,
              )
            }
          >
            <span>Mint This</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDialog(true)}>
            <span>Edit Content</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
