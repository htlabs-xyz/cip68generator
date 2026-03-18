import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export type AuthUser = {
  id: string;
  address: string;
};

// Verify auth by checking wallet address header and looking up user in DB
export async function verifyAuth(request: NextRequest): Promise<AuthUser | null> {
  const address = request.headers.get("x-wallet-address");
  if (!address) return null;

  try {
    const user = await prisma.user.findUnique({ where: { address } });
    if (!user) return null;
    return { id: user.id, address: user.address };
  } catch {
    return null;
  }
}
