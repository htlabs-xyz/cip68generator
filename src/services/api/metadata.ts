import { authFetchJson } from "@/lib/auth/auth-fetch";
import { PMetadata } from "@/types";
import { DateRange } from "react-day-picker";

export async function getMetadata({
  collectionId,
  query,
  range,
  page,
  limit,
}: {
  collectionId: string;
  query?: string | null;
  range?: DateRange | null;
  page?: number;
  limit?: number;
}) {
  const params = new URLSearchParams();
  params.set("collectionId", collectionId);
  if (query) params.set("query", query);
  if (range?.from) params.set("from", range.from.toISOString());
  if (range?.to) params.set("to", range.to.toISOString());
  if (page) params.set("page", String(page));
  if (limit) params.set("limit", String(limit));
  return authFetchJson<{ data: PMetadata[]; totalItems?: number; totalPages?: number; currentPage?: number }>(
    `/api/metadata?${params}`,
  );
}

export async function addMetadata({ collectionId, listMetadata }: { collectionId: string; listMetadata: Record<string, string>[] }) {
  return authFetchJson<{ result: boolean; message: string }>("/api/metadata", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ collectionId, listMetadata }),
  });
}

export async function getMetadataById({ metadataId }: { metadataId: string }) {
  return authFetchJson<{ data: PMetadata | null; message: string }>(`/api/metadata/${metadataId}`);
}

export async function deleteMetadata({ collectionId, listMetadata }: { collectionId: string; listMetadata: PMetadata[] }) {
  return authFetchJson<{ result: boolean; message: string }>("/api/metadata", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ collectionId, listMetadata }),
  });
}

export async function updateMetadata({ collectionId, metadata }: { collectionId: string; metadata: PMetadata }) {
  return authFetchJson<{ result: boolean; message: string }>(`/api/metadata/${metadata.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ collectionId, metadata }),
  });
}
