import { Metadata } from "next";
import Link from "next/link";
import WalletConnect from "./_components/wallet-connect";
import Image from "next/image";
import { appImage } from "@/public/images";
import routers from "@/constants/routers";
export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication",
};

export default function SignInViewPage() {
  return (
    <div className="h-screen">
      <div className="mx-auto my-0 flex h-full w-full max-w-[1200px] flex-col">
        <header className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex h-[60px] w-[150px] items-center justify-center">
            <Link className="relative flex items-center justify-center gap-2" href={routers.landing}>
              <Image className="h-[35px] w-[35px] object-cover" src={appImage.logo} alt="Logo" />
              <span className="text-2xl">Generator</span>
            </Link>
          </div>
        </header>

        <main className="mx-auto w-[550px] flex flex-1 flex-col items-center justify-center spacey-y-4">
          <WalletConnect />
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
