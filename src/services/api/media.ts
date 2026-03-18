import { authFetchJson } from "@/lib/auth/auth-fetch";
import { Media } from "@prisma/client";
import { DateRange } from "react-day-picker";

export async function getMedia({
  query,
  range,
  page,
  limit,
}: {
  query?: string | null;
  range?: DateRange | null;
  page?: number;
  limit?: number;
}) {
  const params = new URLSearchParams();
  if (query) params.set("query", query);
  if (range?.from) params.set("from", range.from.toISOString());
  if (range?.to) params.set("to", range.to.toISOString());
  if (page) params.set("page", String(page));
  if (limit) params.set("limit", String(limit));
  return authFetchJson<{ data: Media[]; totalItems?: number; totalPages?: number; currentPage?: number }>(
    `/api/media?${params}`,
  );
}

export async function deleteMedia(media: Media[]) {
  return authFetchJson<{ result: boolean; message: string }>("/api/media", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ media }),
  });
}
