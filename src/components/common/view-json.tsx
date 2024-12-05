import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { JsonValue } from "@prisma/client/runtime/library";

export function ViewMetadataContent({ json }: { json: JsonValue }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Content</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <pre>{JSON.stringify(json, null, 2)}</pre>
        {/* <DialogFooter>
          <Button>Close</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
