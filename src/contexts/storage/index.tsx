/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { dashboardRoutes } from "@/constants/routers";
import { toast } from "@/hooks/use-toast";
import { deleteMedia, getMedia } from "@/services/database/media";
import { uploadIPFS } from "@/services/upload";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import useUploadStore, { UploadStore } from "./store";

type UploadContextType = UploadStore & {
  uploadFiles: () => void;
  deleteMediaSelected: () => any;
  loading: boolean;
  refetch: () => void;
  setloading: (loading: boolean) => void;
};

export default function UploadProvider({ children }: PropsWithChildren) {
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const {
    currentPage,
    setCurrentPage,
    setListSelected,
    setUploadOneDialogOpen,
    setListFileToUpload,
    setFilter,
    listFileToUpload,
    listSelected,
    uploadOneDialogOpen,
    filter,
  } = useUploadStore();

  const {
    data: listMedia,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getMedia", currentPage, filter],
    queryFn: () =>
      getMedia({
        page: currentPage,
        query: filter.query,
        range: filter.range,
      }),
  });

  useEffect(() => {
    setloading(isLoading);
  }, [isLoading]);

  const uploadFiles = async () => {
    setloading(true);
    if (listFileToUpload) {
      const formData = new FormData();
      Array.from(listFileToUpload).forEach((file) => {
        const cleanedFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "");
        const renamedFile = new File([file], cleanedFileName, { type: file.type });
        formData.append("file", renamedFile);
      });
      const { result, message } = await uploadIPFS(formData);
      if (result) {
        toast({
          title: "success",
          variant: "default",
          description: <Button onClick={() => router.push(dashboardRoutes.utilities.children.storage.redirect)}>Go to Storage</Button>,
        });
        setListFileToUpload([]);
      } else {
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
      }
    }
    setloading(false);
  };

  const deleteMediaSelected = async () => {
    const result = await deleteMedia(listSelected);
    if (result.result) {
      toast({
        title: "success",
        description: "Delete media success",
        variant: "default",
      });
      setListSelected([]);
    }
    refetch();
  };

  return (
    <UploadContext.Provider
      value={{
        loading: loading,
        listMedia: listMedia?.data || [],
        listSelected: listSelected,
        uploadOneDialogOpen: uploadOneDialogOpen,
        listFileToUpload: listFileToUpload!,
        currentPage: currentPage,
        totalPages: listMedia?.totalPages || 1,
        filter: filter,
        setloading: setloading,
        refetch: refetch,
        setListSelected: setListSelected,
        setUploadOneDialogOpen: setUploadOneDialogOpen,
        setListFileToUpload: setListFileToUpload,
        uploadFiles: uploadFiles,
        setCurrentPage: setCurrentPage,
        setFilter: setFilter,
        deleteMediaSelected: deleteMediaSelected,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
}

const UploadContext = createContext<UploadContextType>(null!);
export const useUploadContext = function () {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUploadContext must be used within a UploadProvider");
  }
  return context;
};
