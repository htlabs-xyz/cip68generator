"use client";

import Loading from "@/app/(loading)/loading";
import DesktopDashboardLayout from "@/components/layouts/desktop-dashboard";
import MobileDashboardLayout from "@/components/layouts/mobile-dashboard";
import useWindowSize from "@/hooks/use-window-size";
import { useSession } from "next-auth/react";
import { PropsWithChildren, useMemo } from "react";
import { redirect } from "next/navigation";
export default function DashboardLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const isMobile: boolean = useWindowSize();

  const layout = useMemo(() => {
    return isMobile ? (
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <div className=" text-white text-center py-6 px-8  max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-4">Important Notice!</h2>
          <p className="text-lg">
            The application is not optimized for mobile devices yet. Please use
            a desktop for the best experience.
          </p>
        </div>
      </div>
    ) : (
      <DesktopDashboardLayout>{children}</DesktopDashboardLayout>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const session = useSession();

  if (session.status === "loading") {
    return <Loading />;
  }

  if (session.status === "unauthenticated") {
    redirect("/login");
  }
  return layout;
}
