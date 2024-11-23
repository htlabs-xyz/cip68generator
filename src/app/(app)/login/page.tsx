import { Metadata } from "next";
import Link from "next/link";
import WalletConnect from "./_components/wallet-connect";
export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication",
};

export default function SignInViewPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center lg:px-0">
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[600px]">
          <div className="flex flex-col space-y-2 text-center">
            <WalletConnect />
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By continue, you agree to our{" "}
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
    </div>
  );
}
