"use client";

import { isEmpty, isNil } from "lodash";
import { PropsWithChildren, useEffect, useState } from "react";
import { useWallet, WalletStoreType } from "@/hooks/use-wallet";
import { BrowserWallet, Wallet } from "@meshsdk/core";

export default function BlockchainProvider({ children }: PropsWithChildren) {
  const { signIn, wallet, disconnect, browserWallet, address, user }: WalletStoreType = useWallet();
  const [wallets, setWallets] = useState<Wallet[]>([]);

  useEffect(() => {
    async function get() {
      setWallets(await BrowserWallet.getAvailableWallets());
    }
    get();
  }, []);

  useEffect(() => {
    (async () => {
      if (isEmpty(wallets)) return;
      if (isNil(user)) {
        // Not authenticated, don't auto-reconnect
        return;
      }
      if (isNil(wallet)) {
        // User has stored state but wallet not connected - can't auto-reconnect without knowing which wallet was used
        return;
      }
    })();
  }, [disconnect, user, signIn, wallet, wallets, browserWallet, address]);

  return <>{children}</>;
}
