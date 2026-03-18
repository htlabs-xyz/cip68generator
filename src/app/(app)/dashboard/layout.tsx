"use client";

import Loading from "@/app/(loading)/loading";
import DesktopDashboardLayout from "@/components/layouts/desktop-dashboard";
import { useWallet } from "@/hooks/use-wallet";
import { PropsWithChildren, useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function DashboardLayout({ children }: Readonly<PropsWithChildren>) {
  const { isAuthenticated, restoreSession } = useWallet();
  const [restoring, setRestoring] = useState(true);

  // Restore session from localStorage, then decide redirect
  useEffect(() => {
    restoreSession().finally(() => setRestoring(false));
  }, [restoreSession]);

  if (restoring) return <Loading />;
  if (!isAuthenticated) redirect("/login");

  return <DesktopDashboardLayout>{children}</DesktopDashboardLayout>;
}
