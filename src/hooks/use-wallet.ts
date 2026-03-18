import { create } from "zustand";
import { BrowserWallet, UTxO, Wallet } from "@meshsdk/core";
import { isNil } from "lodash";
import { appNetwork, appNetworkId } from "@/constants";
import { toast } from "./use-toast";
import { parseError } from "@/utils/error/parse-error";

const TOKEN_KEY = "auth-token";
const WALLET_KEY = "auth-wallet";

export interface WalletStoreType {
  wallet: Wallet | null;
  address: string | null;
  stakeAddress: string | null;
  browserWallet: BrowserWallet | null;
  user: { id: string; address: string; wallet: string } | null;
  token: string | null;
  isAuthenticated: boolean;
  getBalance: () => Promise<number>;
  getUtxos: () => Promise<Array<UTxO>>;
  signTx: (message: string) => Promise<string>;
  submitTx: (signedTx: string) => Promise<string>;
  disconnect: () => void;
  signIn: (wallet: Wallet) => Promise<void>;
  restoreSession: () => Promise<void>;
}

export const useWallet = create<WalletStoreType>((set, get) => ({
  wallet: null,
  browserWallet: null,
  address: null,
  stakeAddress: null,
  user: null,
  token: null,
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

  // First connect: get nonce → wallet signs → server verifies → JWT issued
  signIn: async (wallet: Wallet) => {
    try {
      const { name } = wallet;
      const browserWallet = await BrowserWallet.enable(name.toLowerCase());
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

      // Step 1: Get nonce from server
      const nonceRes = await fetch("/api/auth/nonce", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });
      if (!nonceRes.ok) throw new Error("Failed to get nonce");
      const { data: nonce } = await nonceRes.json();

      // Step 2: Sign nonce with wallet
      const signature = await browserWallet.signData(nonce);
      if (isNil(signature)) throw new Error("Failed to sign message");

      // Step 3: Send signature to server, get JWT
      const connectRes = await fetch("/api/auth/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet: name, address, signature }),
      });
      if (!connectRes.ok) {
        const err = await connectRes.json().catch(() => ({}));
        throw new Error(err.message || "Auth failed");
      }
      const { data } = await connectRes.json();

      // Step 4: Store token in localStorage for session persistence
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(WALLET_KEY, name);

      set({
        browserWallet,
        wallet,
        address,
        stakeAddress,
        token: data.token,
        user: data.user,
        isAuthenticated: true,
      });
    } catch (error) {
      const msg = parseError(error);
      toast({
        title: "Error",
        // Eternl throws empty {} on user deny — show friendly message
        description: msg === "{}" ? "Wallet connection was rejected" : msg,
        variant: "destructive",
      });
      get().disconnect();
    }
  },

  // Restore session from stored JWT — reconnect to wallet specified in token
  restoreSession: async () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const walletName = localStorage.getItem(WALLET_KEY);
      if (!token || !walletName) return;

      // Parse token payload (base64 before the dot) to check expiry client-side
      const [base64] = token.split(".");
      const json = atob(base64);
      const payload = JSON.parse(json);
      if (payload.exp < Date.now()) {
        // Token expired, clear and require re-sign
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(WALLET_KEY);
        return;
      }

      // Reconnect browser wallet
      const browserWallet = await BrowserWallet.enable(walletName.toLowerCase());
      if (!browserWallet) return;

      const address = await browserWallet.getChangeAddress();
      // Verify address matches token
      if (address !== payload.address) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(WALLET_KEY);
        return;
      }

      const stakeList = await browserWallet.getRewardAddresses();
      const availableWallets = await BrowserWallet.getAvailableWallets();
      const walletInfo = availableWallets.find((w) => w.name.toLowerCase() === walletName.toLowerCase());

      set({
        browserWallet,
        wallet: walletInfo || null,
        address,
        stakeAddress: stakeList[0] || null,
        token,
        user: { id: payload.id, address: payload.address, wallet: payload.wallet },
        isAuthenticated: true,
      });
    } catch {
      // Silent fail — user can re-sign
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(WALLET_KEY);
    }
  },

  disconnect: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(WALLET_KEY);
    set({
      browserWallet: null,
      wallet: null,
      address: null,
      stakeAddress: null,
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));
