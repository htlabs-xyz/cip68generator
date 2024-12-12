"use client";

import { Button } from "@/components/ui/button";
import { Wallet } from "@meshsdk/core";
import Image from "next/image";

type Props = {
  wallet: Wallet | null;
  item: Wallet;
  onConnectWallet: (wallet: Wallet) => Promise<void>;
};

const WalletItem = function ({ item, wallet, onConnectWallet }: Props) {
  const isConnected = item.name === wallet?.name;
  return (
    <Button variant="outline" className="w-full bg-slate-600 justify-start gap-4 h-14" onClick={() => onConnectWallet(item)}>
      <Image src={item.icon} alt={`${item.name} icon`} width={32} height={32} />
      <span className="flex-grow text-left capitalize">{item.name}</span>
      {isConnected && <span className="text-primary">Connected</span>}
    </Button>
  );
};

export default WalletItem;
