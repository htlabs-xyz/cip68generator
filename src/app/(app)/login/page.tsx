import { Metadata } from "next";
import Link from "next/link";
// import UserAuthForm from "./user-auth-form";
import { cn } from "@/utils";
import Image from "next/image";
import { appImage } from "@/public/images";
import WalletConnect from "./_components/wallet-connect";
export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function SignInViewPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <WalletConnect />
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By˝ continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Image
            className={cn("h-[35px] w-[35px] object-cover")}
            src={appImage.logo}
            alt="Logo"
          />
          Cip68Generator
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;a web portalthat allows users to create, update and manage
              assets safely and conveniently.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
