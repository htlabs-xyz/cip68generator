import { create } from "zustand";
import { BrowserWallet, UTxO, Wallet } from "@meshsdk/core";
import { isNil } from "lodash";
import { appNetwork, appNetworkId } from "@/constants";
import { toast } from "./use-toast";
import { parseError } from "@/utils/error/parse-error";

export interface WalletStoreType {
  wallet: Wallet | null;
  address: string | null;
  stakeAddress: string | null;
  browserWallet: BrowserWallet | null;
  user: { id: string; address: string } | null;
  isAuthenticated: boolean;
  getBalance: () => Promise<number>;
  getUtxos: () => Promise<Array<UTxO>>;
  signTx: (message: string) => Promise<string>;
  submitTx: (signedTx: string) => Promise<string>;
  disconnect: () => void;
  signIn: (wallet: Wallet) => Promise<void>;
}

export const useWallet = create<WalletStoreType>((set, get) => ({
  wallet: null,
  browserWallet: null,
  address: null,
  stakeAddress: null,
  user: null,
  isAuthenticated: false,

  getUtxos: async () => {
    const { browserWallet } = get();
    if (!browserWallet) return [];
    return await browserWallet.getUtxos();
  },

  getBalance: async () => {
    const { browserWallet } = get();
    if (!browserWallet) return 0;
    const balance = await browserWallet.getLovelace();
    return Number(balance);
  },

  signTx: async (unsignedTx: string) => {
    const { browserWallet, wallet } = get();
    if (!browserWallet || !wallet) throw new Error("Wallet not connected");
    const signedTx = await browserWallet.signTx(unsignedTx);
    if (!signedTx) throw new Error("Failed to sign data");
    return signedTx;
  },

  submitTx: async (signedTx: string) => {
    const { browserWallet } = get();
    if (!browserWallet) throw new Error("Wallet not connected");
    const txHash = await browserWallet.submitTx(signedTx);
    if (!txHash) throw new Error("Failed to submit transaction");
    return txHash;
  },

  signIn: async (wallet: Wallet) => {
    try {
      const { name } = wallet;
      const browserWallet: BrowserWallet = await BrowserWallet.enable(name.toLowerCase());
      if (!browserWallet) throw new Error("Failed to connect wallet");

      const network = await browserWallet.getNetworkId();
      if (network !== appNetworkId) {
        throw new Error(`Invalid network, please switch to ${appNetwork}`);
      }

      const address = await browserWallet.getChangeAddress();
      if (address.length === 0) throw new Error("Cant get address");

      const stakeList = await browserWallet.getRewardAddresses();
      if (stakeList.length === 0) throw new Error("Cant get stake address");
      const stakeAddress = stakeList[0];

      const response = await fetch("/api/auth/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || "Auth connect failed");
      }
      const { data: user } = await response.json();

      set({
        browserWallet,
        wallet,
        address,
        stakeAddress,
        user: user ?? null,
        isAuthenticated: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: parseError(error),
        variant: "destructive",
      });
      get().disconnect();
    }
  },

  disconnect: () => {
    set({
      browserWallet: null,
      wallet: null,
      address: null,
      stakeAddress: null,
      user: null,
      isAuthenticated: false,
    });
  },
}));
