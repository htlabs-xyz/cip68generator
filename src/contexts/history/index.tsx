"use client";

import { createContext, useContext, PropsWithChildren } from "react";
import { HistoryStore } from "./store";
import { useQuery } from "@tanstack/react-query";
import { getHistoryMetadata } from "@/services/blockchain/getHistoryMetadata";

type HistoryContextType = HistoryStore & {
  loading: boolean;
};

export default function HistoryProvider({ children }: PropsWithChildren) {
  const { data, isLoading } = useQuery({
    queryKey: ["getHistoryMetadata"],
    queryFn: function () {
      return getHistoryMetadata(
        "07f70d7e65dca4c47e1fbce93d8bfdf08eff0d3adee20c63c926a317900eef9f",
        "",
      );
    },
  });

  console.log(data);

  return (
    <HistoryContext.Provider
      value={{
        loading: isLoading,
        metadata: "",
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

const HistoryContext = createContext<HistoryContextType>(null!);

export const useHistoryContext = function () {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useLandingContext must be used within a ProfileProvider");
  }
  return context;
};
