"use client";
import Link from "next/link";
import Image from "next/image";
import { appImage } from "@/public/images";
import { routes } from "@/constants/routes";
import { useWalletList } from "@meshsdk/react";
import { useSession } from "next-auth/react";
import { useWallet } from "@/hooks/use-wallet";
import { Wallet } from "@meshsdk/core";
import { appNetwork } from "@/constants";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import WalletItem from "./_components/wallet-item";

export default function SignInViewPage() {
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
    <div className="h-screen">
      <div className="mx-auto my-0 flex h-full w-full max-w-[1200px] flex-col">
        <header className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex h-[60px] w-[150px] items-center justify-center">
            <Link className="relative flex items-center justify-center gap-2" href={routes.landing.redirect}>
              <Image className="h-[35px] w-[35px] object-cover" src={appImage.logo} alt="Logo" />
              <span className="text-2xl">Generator</span>
            </Link>
          </div>
        </header>

        <main className="mx-auto w-[550px] flex flex-1 flex-col items-center justify-center spacey-y-4">
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
                return <WalletItem key={item.name} wallet={wallet} item={item} onConnectWallet={handleConnectWallet} />;
              })}
            </CardContent>
          </Card>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Created by cardano2vn , you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </main>
      </div>
    </div>
  );
}
