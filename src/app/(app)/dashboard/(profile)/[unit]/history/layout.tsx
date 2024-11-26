import HistoryProvider from "@/contexts/history";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return <HistoryProvider>{children}</HistoryProvider>;
}
