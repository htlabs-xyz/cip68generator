import { Media } from "@prisma/client";
import { isEmpty } from "lodash";
import { create } from "zustand";

interface IJsonBuilderStore {
  fields: {
    key: string;
    value: string;
  }[];
  template: string;
  error: string | null;
  init: (json: Record<string, string>) => void;
  getJsonResult: () => Record<string, string>;
  addField: () => void;
  addMediaField?: (file: Media) => void;
  updateField?: (index: number, field: "key" | "value", value: string) => void;
  removeField?: (index: number) => void;
  setError: (error: string | null) => void;
  setTemplate: (template: string) => void;
}

export const useJsonBuilderStore = create<IJsonBuilderStore>((set, get) => ({
  fields: [],
  template: "",
  error: null,
  init: (json) => {
    if (isEmpty(json)) {
      return set({ fields: [] });
    }
    const fields = Object.entries(json).map(([key, value]) => ({
      key,
      value: value as string,
    }));
    set({ fields });
  },
  getJsonResult: () => {
    const fields = get().fields;
    return fields.reduce(
      (acc, { key, value }) => {
        if (key) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, string>,
    );
  },
  addField: () => {
    set((state) => ({ fields: [...state.fields, { key: "", value: "" }] }));
  },
  addMediaField: (file: Media) => {
    set((state) => {
      const updatedFields = state.fields.map((field) => {
        if (field.key === "image") {
          return { ...field, value: file.url };
        }
        if (field.key === "mediaType") {
          return { ...field, value: file.type };
        }
        return field;
      });

      if (!state.fields.some((field) => field.key === "image")) {
        updatedFields.push({ key: "image", value: file.url });
      }
      if (!state.fields.some((field) => field.key === "mediaType")) {
        updatedFields.push({ key: "mediaType", value: file.type });
      }

      return { fields: updatedFields };
    });
  },
  updateField: (index, field, value) => {
    set((state) => {
      const newFields = [...state.fields];

      if (field === "key") {
        const isValidKey = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(value);
        const isDuplicateKey = newFields.some((f, i) => i !== index && f.key === value);
        if (!isValidKey || isDuplicateKey) {
          return { error: "Invalid key: " + value };
        }
      }

      if (field === "value" && (typeof value !== "string" || value === "")) {
        return { error: "Invalid value: " + value };
      }

      newFields[index][field] = value;
      return { fields: newFields };
    });
  },
  removeField: (index) => {
    set((state) => ({ fields: state.fields.filter((_, i) => i !== index) }));
  },
  setError: (error) => {
    set({ error });
  },
  setTemplate: (template) => {
    set(() => {
      switch (template) {
        case "Minimal":
          return {
            template: "Minimal",
            fields: [
              { key: "name", value: "Asset Name" },
              { key: "description", value: "Asset Description" },
            ],
          };
        case "Image":
          return {
            template: "Image",
            fields: [
              { key: "name", value: "Image NFT" },
              { key: "description", value: "Asset Description" },
              { key: "image", value: "ipfs://..." },
              { key: "mediaType", value: "image/png" },
            ],
          };
        default:
          return {
            template: "",
            fields: [],
          };
      }
    });
  },
}));
