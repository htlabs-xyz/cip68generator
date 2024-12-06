"use client";

import Loading from "@/app/(loading)/loading";
import DesktopDashboardLayout from "@/components/layouts/desktop-dashboard";
import { useSession } from "next-auth/react";
import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";

export default function DashboardLayout({ children }: Readonly<PropsWithChildren>) {
  const session = useSession();

  if (session.status === "loading") {
    return <Loading />;
  }

  if (session.status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <>
      <div className="hidden md:flex flex-col items-center justify-center h-screen bg-gray-900">
        <div className="text-white text-center py-6 px-8 max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-4">Important Notice!</h2>
          <p className="text-lg">The application is not optimized for mobile devices yet. Please use a desktop for the best experience.</p>
        </div>
      </div>
      <div className="md:hidden flex h-screen bg-gray-900 items-center justify-center">
        <DesktopDashboardLayout>{children}</DesktopDashboardLayout>
      </div>
    </>
  );
}
