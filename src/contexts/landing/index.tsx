"use client";

import { createContext, useContext, PropsWithChildren, useState } from "react";
import { LandingStore } from "./store";
import { useQuery } from "@tanstack/react-query";
import { getAddressDetail } from "@/services/blockchain/getAddressDetail";
import { storeAddress } from "@/constants";

type LandingContextType = LandingStore & {
  loading: boolean;
};

export default function LandingProvider({ children }: PropsWithChildren) {
  const { data, isLoading } = useQuery({
    queryKey: [""],
    queryFn: function () {
      return getAddressDetail(storeAddress);
    },
  });
  return (
    <LadingContext.Provider value={{ loading: isLoading, statistic: null! }}>
      {children}
    </LadingContext.Provider>
  );
}

const LadingContext = createContext<LandingContextType>(null!);

export const useLandingContext = function () {
  const context = useContext(LadingContext);
  if (!context) {
    throw new Error("useLandingContext must be used within a ProfileProvider");
  }
  return context;
};
