"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useWalletList } from "@meshsdk/react";
import WalletItem from "./wallet-item";
import { useSession } from "next-auth/react";
import { useWallet } from "@/hooks/use-wallet";
import { Wallet } from "@meshsdk/core";
import { appNetwork } from "@/constants";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WalletConnect() {
  const router = useRouter();
  const wallets = useWalletList();
  const { data: session, status } = useSession();
  const { signIn, wallet } = useWallet();

  const handleConnectWallet = async function (wallet: Wallet) {
    await signIn(session, wallet);
  };

  useEffect(() => {
    if (status === "authenticated") {
      redirect("/dashboard");
    }
  }, [status, router]);

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Connect Wallet</CardTitle>
        <CardDescription>Connect a wallet on {appNetwork} to continue</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {wallets.map((item) => {
          if (item.name != "eternl") {
            return null;
          }
          return <WalletItem key={item.name} wallet={wallet} item={item} onConnectWallet={handleConnectWallet} status={"ready"} />;
        })}
      </CardContent>
    </Card>
  );
}
