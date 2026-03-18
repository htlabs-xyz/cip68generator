import { useWallet } from "@/hooks/use-wallet";

// Authenticated fetch that adds x-wallet-address header from wallet store
export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const address = useWallet.getState().address;
  const headers = new Headers(options.headers);
  if (address) {
    headers.set("x-wallet-address", address);
  }
  return fetch(url, { ...options, headers });
}

export async function authFetchJson<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await authFetch(url, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}
