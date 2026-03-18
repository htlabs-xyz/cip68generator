import { NextRequest } from "next/server";
import { verifyToken, TokenPayload } from "./jwt";

export type AuthUser = {
  id: string;
  address: string;
  wallet: string;
};

// Verify JWT from Authorization: Bearer header, return user payload or null
export function verifyAuth(request: NextRequest): AuthUser | null {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7);
  const payload = verifyToken(token);
  if (!payload) return null;
  return { id: payload.id, address: payload.address, wallet: payload.wallet };
}
