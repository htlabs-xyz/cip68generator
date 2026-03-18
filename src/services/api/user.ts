import { authFetchJson } from "@/lib/auth/auth-fetch";

export default async function getUserStatistics() {
  return authFetchJson<{
    result: boolean;
    message: string;
    data: { collection: number; media: number; metadata: number } | null;
  }>("/api/user/statistics");
}
