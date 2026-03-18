"use client";

import React from "react";
import dynamic from "next/dynamic";
import QueryClientProvider from "./query";
import ErrorClientProvider from "./error";
import { Toaster } from "@/components/ui/toaster";

// Skip SSR — wallet/mesh SDK requires browser APIs and libsodium WASM
const BlockchainProvider = dynamic(() => import("./blockchain"), { ssr: false });

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
