import { authFetchJson } from "@/lib/auth/auth-fetch";
import { AssetInput } from "@/types";

export async function getAllCollection() {
  return authFetchJson<{ result: boolean; message: string; data: any[] }>("/api/collections");
}

export async function createCollection({ name, description }: { name: string; description?: string }) {
  return authFetchJson<{ result: boolean; message: string }>("/api/collections", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description }),
  });
}

export async function deleteCollection(collectionId: string) {
  return authFetchJson<{ result: boolean; message: string }>(`/api/collections/${collectionId}`, {
    method: "DELETE",
  });
}

export async function updateCollection({ collectionId, name, description }: { collectionId: string; name: string; description?: string }) {
  return authFetchJson<{ result: boolean; message: string }>(`/api/collections/${collectionId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description }),
  });
}

export async function createCollectionWithData({ collectionName, listAssetInput }: { collectionName: string; listAssetInput: AssetInput[] }) {
  return authFetchJson<{ result: boolean; message: string; data: any }>("/api/collections/with-data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ collectionName, listAssetInput }),
  });
}
