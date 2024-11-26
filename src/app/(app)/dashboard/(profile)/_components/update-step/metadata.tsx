import JsonBuilder from "@/components/common/json-builder";
import { Button } from "@/components/ui/button";
import { useUnitContext } from "@/contexts/unit";
import { KeyValuePair } from "@/types";
import { generateFields, generateJson } from "@/utils/json";
import { useEffect, useState } from "react";

export default function MetadataStep() {
  const { metadataToUpdate, updateStepper, setMetadataToUpdate } =
    useUnitContext();

  const [fields, setFields] = useState<KeyValuePair[]>(
    generateFields(metadataToUpdate),
  );

  useEffect(() => {
    setFields(generateFields(metadataToUpdate));
  }, [metadataToUpdate]);

  const handleNext = () => {
    setMetadataToUpdate(generateJson(fields));
    updateStepper.next();
  };
  return (
    <div className="h-full py-8 px-10 m-auto flex flex-col">
      <div className="rounded-md border border-dashed">
        {/* <div className="flex flex-col space-y-2 text-left p-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            Metadata Build
          </h1>
        </div> */}
        <JsonBuilder fields={fields} setFields={setFields} />
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <Button
          variant="secondary"
          onClick={updateStepper.prev}
          disabled={updateStepper.isFirst}
        >
          Back
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
}
