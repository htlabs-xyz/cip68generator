"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface KeyValuePair {
  key: string;
  value: string;
}
const generateJson = (fields: KeyValuePair[]) => {
  return fields.reduce(
    (acc, { key, value }) => {
      if (key) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, string>,
  );
};
const generateFields = (json: Record<string, string>) => {
  return Object.entries(json).map(([key, value]) => ({ key, value }));
};

export default function JsonBuilder({
  json,
  setJson,
}: {
  json: Record<string, string>;
  setJson: (json: Record<string, string>) => void;
}) {
  const [fields, setFields] = useState<KeyValuePair[]>(generateFields(json));
  const [template, setTemplate] = useState<string>("");
  const addField = () => {
    setFields([...fields, { key: "", value: "" }]);
  };

  const updateField = (
    index: number,
    field: "key" | "value",
    value: string,
  ) => {
    const newFields = [...fields];
    newFields[index][field] = value;
    setFields(newFields);
  };

  const removeField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  useEffect(() => {
    setJson(generateJson(fields));
  }, [fields, setJson]);

  return (
    <div className="flex h-full bg-section p-5">
      <div className="w-1/2 p-4 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg p-2 mb-4">
          <h1>JSON Builder</h1>
          <Select
            value={template}
            onValueChange={(newValue) => {
              switch (newValue) {
                case "Minimal":
                  setTemplate("Minimal");
                  setFields([
                    { key: "name", value: "Asset Name" },
                    { key: "description", value: "Asset Description" },
                  ]);
                  break;
                case "Image":
                  setTemplate("Image");
                  setFields([
                    { key: "name", value: "Image NFT" },
                    { key: "description", value: "Asset Description" },
                    { key: "image", value: "ipfs://..." },
                    { key: "mediaType", value: "image/png" },
                  ]);
                  break;
                default:
                  setTemplate("");
                  setFields([]);
                  break;
              }
            }}
          >
            <SelectTrigger className="w-1/3 bg-section">
              <SelectValue placeholder="Select Asset Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Minimal">Minimal Asset Metadata</SelectItem>
              <SelectItem value="Image">Image Asset Metadata</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          {fields.map((field, index) => (
            <div key={index} className="flex items-center space-x-2 mb-4">
              <div className="flex-1">
                <Label htmlFor={`key-${index}`} className="sr-only">
                  Key
                </Label>
                <Input
                  id={`key-${index}`}
                  placeholder="Key"
                  value={field.key}
                  onChange={(e) => updateField(index, "key", e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor={`value-${index}`} className="sr-only">
                  Value
                </Label>
                <Input
                  id={`value-${index}`}
                  placeholder="Value"
                  value={field.value}
                  onChange={(e) => updateField(index, "value", e.target.value)}
                />
              </div>
              <Button
                variant="destructive"
                className="text-white"
                onClick={() => removeField(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button onClick={addField}>Add Field</Button>
        </div>
      </div>
      <div className="w-1/2 p-4 ">
        <Textarea
          className="w-full h-full resize-none font-mono"
          value={JSON.stringify(generateJson(fields), null, 2)}
          readOnly
        />
      </div>
    </div>
  );
}
