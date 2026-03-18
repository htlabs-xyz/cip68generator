"use client";

import DesktopDashboardLayout from "@/components/layouts/desktop-dashboard";
import { useWallet } from "@/hooks/use-wallet";
import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";

export default function DashboardLayout({ children }: Readonly<PropsWithChildren>) {
  const { address } = useWallet();

  if (!address) {
    redirect("/login");
  }

  return <DesktopDashboardLayout>{children}</DesktopDashboardLayout>;
}
