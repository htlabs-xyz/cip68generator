"use client";
import JsonBuilder from "@/components/common/json-builder";
import { Button } from "@/components/ui/button";
import { isEmpty, isNil } from "lodash";
import { useMetadataContext } from "@/contexts/metadata";
import { useState } from "react";

export default function MetadataStep() {
  const { createMetadata } = useMetadataContext();
  const [jsonContent, setJsonContent] = useState<Record<string, string>>({});
  const handleNext = () => {
    if (!isNil(jsonContent) || !isEmpty(jsonContent)) {
      createMetadata(jsonContent);
    }
  };
  return (
    <div className="h-full py-8 px-10 m-auto flex flex-col">
      <div className="rounded-md border border-dashed">
        <JsonBuilder json={jsonContent} setJson={setJsonContent} />
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <Button onClick={handleNext}>Create Metadata</Button>
      </div>
    </div>
  );
}
