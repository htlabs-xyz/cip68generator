import type { Metadata } from "next";
import { Lexend as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/utils";
import { appConfig } from "@/constants";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: appConfig.title,
  description: appConfig.description,
};

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const RootLayout = function ({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="apple-touch-icon" sizes="76x76" href={`/images/common/logo.png`} />
      <link rel="icon" type="image/png" sizes="32x32" href={`/images/common/logo.png`} />
      <link rel="icon" type="image/png" sizes="16x16" href={`/images/common/logo.png`} />
      <link rel="manifest" href={`/favicons/site.webmanifest`} />
      <link rel="mask-icon" href={`/images/common/logo.png`} color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <body className={cn(fontSans.className)}>{children}</body>
    </html>
  );
};

export default RootLayout;
