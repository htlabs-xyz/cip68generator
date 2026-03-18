import { useWallet } from "@/hooks/use-wallet";

// Authenticated fetch that adds JWT Bearer token from wallet store
export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = useWallet.getState().token;
  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
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
