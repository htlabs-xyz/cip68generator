"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useWalletList } from "@meshsdk/react";
import WalletItem from "./wallet-item";
import { useSession } from "next-auth/react";
import { useBlockchainContext } from "@/components/providers/blockchain";
import { Wallet } from "@meshsdk/core";
import { appNetwork } from "@/constants";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/(loading)/loading";

export default function WalletConnect() {
  const router = useRouter();
  const wallets = useWalletList();
  const { data: session, status } = useSession();
  const { signIn } = useBlockchainContext();

  const handleConnectWallet = async function (wallet: Wallet) {
    await signIn(session, wallet);
  };

  useEffect(() => {
    if (status == "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status != "unauthenticated") {
    return <Loading />;
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Connect Wallet</CardTitle>
        <CardDescription>Connect a wallet on {appNetwork} to continue</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {wallets.map((wallet) => (
          <WalletItem key={wallet.name} wallet={wallet} onConnectWallet={handleConnectWallet} />
        ))}
      </CardContent>
    </Card>
  );
}
