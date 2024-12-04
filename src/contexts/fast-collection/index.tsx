"use client";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import useUploadCsvStore, { UploadCsvStore } from "./store";
import { isEmpty, isNil } from "lodash";
import { createCollectionWithData } from "@/services/database/collection";
import { useRouter } from "next/navigation";
import { convertObject } from "@/utils";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { dashboardRoutes } from "@/constants/routers";

type UploadCsvContextType = UploadCsvStore & {
  loading: boolean;
  uploadCsv: () => void;
};

export default function UploadCSVProvider({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(false);
  const { csvContent, setCsvContent, csvName } = useUploadCsvStore();
  const router = useRouter();
  const uploadCsv = async () => {
    setLoading(true);

    try {
      if (isNil(csvContent) || isEmpty(csvContent)) {
        throw new Error("CSV content is empty");
      }
      const listAssetInput = convertObject(csvContent);
      const listMetadata = listAssetInput.map((item) => item.metadata);

      const { result, message, data } = await createCollectionWithData({
        collectionName: csvName,
        listMetadata: listMetadata,
      });
      if (!result || isNil(data)) {
        throw new Error(message);
      }
      toast({
        title: "Create Collection Success",
        description: (
          <Button
            onClick={() =>
              router.push(
                dashboardRoutes.utilities.children.collection.redirect +
                  `/${data.id}`,
              )
            }
          >
            Go to Collection
          </Button>
        ),
      });
    } catch (e) {
      toast({
        title: "Error",
        description: e instanceof Error ? e.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <UploadCsvContext.Provider
      value={{
        loading: loading,
        csvContent,
        csvName,
        setCsvContent,
        uploadCsv: uploadCsv,
      }}
    >
      {children}
    </UploadCsvContext.Provider>
  );
}

const UploadCsvContext = createContext<UploadCsvContextType>(null!);
export const useUploadCsvContext = function () {
  const context = useContext(UploadCsvContext);
  if (!context) {
    throw new Error(
      "useUploadCsvContext must be used within a UploadCSVProvider",
    );
  }
  return context;
};
