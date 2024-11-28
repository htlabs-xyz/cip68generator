"use client";

import { Button } from "@/components/ui/button";
import { Wallet } from "@meshsdk/core";
import Image from "next/image";

type Props = {
  wallet: Wallet;
  onConnectWallet: (wallet: Wallet) => Promise<void>;
};

const WalletItem = function ({ wallet, onConnectWallet }: Props) {
  return (
    <Button
      variant="outline"
      className="w-full bg-slate-600 justify-start gap-4 h-14"
      onClick={() => onConnectWallet(wallet)}
    >
      <Image
        src={wallet.icon}
        alt={`${wallet.name} icon`}
        width={32}
        height={32}
      />
      <span className="flex-grow text-left capitalize">{wallet.name}</span>
      <span className="text-sm text-green-500">•</span>
    </Button>
  );
};

export default WalletItem;
