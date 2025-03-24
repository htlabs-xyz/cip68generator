"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import WalletItem from "./wallet-item";
import { useSession } from "next-auth/react";
import { useWallet } from "@/hooks/use-wallet";
import { BrowserWallet, Wallet } from "@meshsdk/core";
import { appNetwork } from "@/constants";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function WalletConnect() {
  const router = useRouter();

  const [wallets, setWallets] = useState<Wallet[]>([]);
  useEffect(() => {
    async function get() {
      setWallets(await BrowserWallet.getAvailableWallets());
    }
    get();
  }, []);
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
