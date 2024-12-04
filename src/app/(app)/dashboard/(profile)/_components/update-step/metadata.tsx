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
    generateFields(metadataToUpdate || {}),
  );

  useEffect(() => {
    setFields(generateFields(metadataToUpdate || {}));
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
      <div className="fixed right-0 bottom-0 z-10 max-h-16 w-full bg-section">
        <div className="mx-4 flex h-16 items-center sm:mx-8">
          <div className="flex flex-1 items-center justify-end space-x-2">
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
      </div>
    </div>
  );
}
