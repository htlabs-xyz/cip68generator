"use client";
import Link from "next/link";
import Image from "next/image";
import { appImage } from "@/public/images";
import { routes } from "@/constants/routes";
import { useSession } from "next-auth/react";
import { useWallet } from "@/hooks/use-wallet";
import { appNetwork, wallets } from "@/constants";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import WalletItem from "./_components/wallet-item";
import { useWalletList } from "@meshsdk/react";

export default function SignInViewPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const walletInstalledList = useWalletList();

  const { signIn, wallet } = useWallet();

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
              {Object.entries(wallets).map(([key, value]) => {
                if (value.id != "eternl") return;
                return (
                  <WalletItem
                    key={key}
                    wallet={wallet}
                    item={value}
                    onConnectWallet={(wallet) => {
                      return signIn(session, wallet);
                    }}
                    status={walletInstalledList.find((wallet) => wallet.id === value.id) ? "ready" : "not installed"}
                  />
                );
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
