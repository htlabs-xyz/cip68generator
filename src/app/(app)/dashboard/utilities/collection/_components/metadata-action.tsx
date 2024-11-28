import JsonBuilder from "@/components/common/json-builder";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { KeyValuePair } from "@/types";
import { copyToClipboard } from "@/utils/copy-to-clipboard";
import { generateFields, generateJson } from "@/utils/json";
import { Metadata } from "@prisma/client";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

export default function MetadataAction({ metadata }: { metadata: Metadata }) {
  const [copied, setCopied] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [fields, setFields] = useState<KeyValuePair[]>(
    generateFields(metadata.content),
  );

  const handleUpdate = async () => {
    const newContent = generateJson(fields);
    console.log(newContent);
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
              copyToClipboard(JSON.stringify(metadata.content, null, 2))
                .then(() => setCopied(true))
                .finally(() => setTimeout(() => setCopied(false), 500))
            }
          >
            <span>{copied ? "Copied" : "Copy Content"}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDialog(true)}>
            <span>Edit Content</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
