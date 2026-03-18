"use client";

import Loading from "@/app/(loading)/loading";
import DesktopDashboardLayout from "@/components/layouts/desktop-dashboard";
import { useWallet } from "@/hooks/use-wallet";
import { PropsWithChildren, useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function DashboardLayout({ children }: Readonly<PropsWithChildren>) {
  const { isAuthenticated, token } = useWallet();
  const [checking, setChecking] = useState(true);

  // Wait for session restore before deciding redirect
  useEffect(() => {
    const timer = setTimeout(() => setChecking(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isAuthenticated) setChecking(false);
  }, [isAuthenticated]);

  if (checking) return <Loading />;
  if (!isAuthenticated && !token) redirect("/login");

  return <DesktopDashboardLayout>{children}</DesktopDashboardLayout>;
}
