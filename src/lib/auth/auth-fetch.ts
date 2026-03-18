import { useWallet } from "@/hooks/use-wallet";

// Authenticated fetch that adds JWT Bearer token from wallet store
export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = useWallet.getState().token;
  if (!token) {
    throw new Error("Not authenticated");
  }
  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${token}`);
  return fetch(url, { ...options, headers });
}

export async function authFetchJson<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await authFetch(url, options);
  const data = await response.json();
  if (response.status === 401) {
    // Token expired or invalid — disconnect and redirect
    useWallet.getState().disconnect();
    window.location.href = "/login";
    throw new Error("Session expired");
  }
  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}
