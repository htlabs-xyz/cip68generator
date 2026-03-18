"use client";

import React from "react";
import QueryClientProvider from "./query";
import ErrorClientProvider from "./error";
import { Toaster } from "@/components/ui/toaster";
import BlockchainProvider from "./blockchain";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <ErrorClientProvider>
        <QueryClientProvider>
          <BlockchainProvider>{children}</BlockchainProvider>
        </QueryClientProvider>
      </ErrorClientProvider>
    </>
  );
}
