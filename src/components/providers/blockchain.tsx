"use client";

import { PropsWithChildren, useEffect } from "react";
import { useWallet } from "@/hooks/use-wallet";

// Attempts to restore JWT session and reconnect wallet on app mount
export default function BlockchainProvider({ children }: PropsWithChildren) {
  const { restoreSession, isAuthenticated } = useWallet();

  useEffect(() => {
    if (!isAuthenticated) {
      restoreSession();
    }
  }, [isAuthenticated, restoreSession]);

  return <>{children}</>;
}
