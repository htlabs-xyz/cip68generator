"use client";

import { isEmpty, isNil } from "lodash";
import { signOut, useSession } from "next-auth/react";
import { PropsWithChildren, useEffect } from "react";
import { useWalletList } from "@meshsdk/react";
import { useWallet, WalletStoreType } from "@/hooks/use-wallet";

export default function BlockchainProvider({ children }: PropsWithChildren) {
  const { signIn, wallet, disconnect, browserWallet, address }: WalletStoreType = useWallet();
  const { data: session, status } = useSession();

  const wallets = useWalletList();

  useEffect(() => {
    (async () => {
      if (isEmpty(wallets)) {
        return;
      }
      if (isNil(session) || status === "unauthenticated") {
        disconnect();
        return;
      }
      if (isNil(wallet)) {
        const walletConnect = session?.user ? wallets.find((w) => w.name.toLocaleLowerCase() === session.user?.wallet?.toLocaleLowerCase()) : null;
        if (!walletConnect) {
          await signOut();
          return;
        }
        signIn(session, walletConnect);
      }
    })();
  }, [disconnect, session, signIn, status, wallet, wallets, browserWallet, address]);

  return <>{children}</>;
}
