import type { Metadata } from "next";
import { Lexend as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/utils";
import { appConfig } from "@/constants";
import { PropsWithChildren } from "react";
import AppProviders from "@/components/providers";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: appConfig.title,
  description: appConfig.description,
};

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const RootLayout = async function ({ children }: Readonly<PropsWithChildren>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="apple-touch-icon" sizes="76x76" href={`/images/common/logo.png`} />
      <link rel="icon" type="image/png" sizes="32x32" href={`/images/common/logo.png`} />
      <link rel="icon" type="image/png" sizes="16x16" href={`/images/common/logo.png`} />
      <link rel="manifest" href={`/favicons/site.webmanifest`} />
      <link rel="mask-icon" href={`/images/common/logo.png`} color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <body className={cn(fontSans.className)}>
        <div className="lg:hidden h-screen flex items-center justify-center">
          <div className="text-white text-center py-6 px-8 max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Important Notice!</h2>
            <p className="text-lg">The application is not optimized for mobile devices yet. Please use a desktop for the best experience.</p>
          </div>
        </div>
        <div className="hidden lg:block">
          <AppProviders session={session}>{children}</AppProviders>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
