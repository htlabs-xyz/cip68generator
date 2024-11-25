import JsonBuilder from "@/components/common/json-builder";
import { useMintOneContext } from "@/contexts/mint-one";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { KeyValuePair } from "@/types";
import { generateJson } from "@/utils/json";

export default function MetadataStep() {
  const { stepper, setMetadataToMint } = useMintOneContext();
  const [fields, setFields] = useState<KeyValuePair[]>([]);
  const handleNext = () => {
    setMetadataToMint(generateJson(fields));
    stepper.next();
  };
  return (
    <div className="h-full py-8 px-10 m-auto flex flex-col">
      <div className="rounded-md border border-dashed">
        <div className="flex flex-col space-y-2 text-left p-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            Metadata Build
          </h1>
        </div>
        <JsonBuilder fields={fields} setFields={setFields} />
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <Button
          variant="secondary"
          onClick={stepper.prev}
          disabled={stepper.isFirst}
        >
          Back
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
}
