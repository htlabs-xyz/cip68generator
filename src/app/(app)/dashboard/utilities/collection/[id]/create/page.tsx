"use client";
import JsonBuilder from "@/components/common/json-builder";
import { Button } from "@/components/ui/button";
import { isEmpty, isNil } from "lodash";
import { useMetadataContext } from "@/contexts/metadata";
import { generateJson } from "@/utils/json";
import { useJsonBuilderStore } from "@/components/common/json-builder/store";
import { useEffect } from "react";

export default function MetadataStep() {
  const { createMetadata } = useMetadataContext();
  const { fields, init } = useJsonBuilderStore();

  useEffect(() => {
    init(null!);
  }, [init]);

  const handleNext = () => {
    if (!isNil(fields) || !isEmpty(fields)) {
      createMetadata(generateJson(fields));
    }
  };
  return (
    <div className="h-full py-8 px-10 m-auto flex flex-col">
      <div className="rounded-md border border-dashed">
        <JsonBuilder />
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <Button onClick={handleNext}>Create Metadata</Button>
      </div>
    </div>
  );
}
