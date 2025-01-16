"use client";

import Loading from "@/app/(loading)/loading";
import { Button } from "@/components/ui/button";
import { WalletType } from "@/types";
import { Wallet } from "@meshsdk/core";
import Image from "next/image";
import { useRouter } from "next/navigation";
type Props = {
  wallet: Wallet | null;
  item: WalletType;
  onConnectWallet: (wallet: Wallet) => Promise<void>;
  status: "ready" | "connecting" | "connected" | "not installed";
};

const WalletItem = function ({ item, wallet, onConnectWallet, status }: Props) {
  const isConnected = item.name === wallet?.name;
  const router = useRouter();
  return (
    <Button
      variant="outline"
      className="w-full bg-slate-600 justify-start gap-4 h-14"
      onClick={() => {
        if (status === "ready") {
          onConnectWallet(item);
        }
        if (status === "not installed") {
          router.push(item.downloadApi || "");
        }
      }}
    >
      <Image src={item.icon} alt={`${item.name} icon`} width={32} height={32} />
      <span className="flex-grow text-left capitalize">{item.name}</span>
      {status === "ready" ? (
        <span className="text-green-500">●</span>
      ) : status === "connecting" ? (
        <span>
          <Loading />
        </span>
      ) : status === "not installed" ? (
        <span>Not Installed</span>
      ) : isConnected ? (
        <span className="text-green">Connected</span>
      ) : (
        <span></span>
      )}
    </Button>
  );
};

export default WalletItem;
