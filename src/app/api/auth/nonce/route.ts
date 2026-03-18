import { NextRequest, NextResponse } from "next/server";
import { generateNonce } from "@meshsdk/core";
import prisma from "@/lib/prisma";

// POST /api/auth/nonce - Generate nonce for wallet address
export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json();
    if (!address || typeof address !== "string") {
      return NextResponse.json({ result: false, message: "Address required" }, { status: 400 });
    }

    const nonce = generateNonce("signin to cip68 nft");
    await prisma.walletNonce.upsert({
      where: { address },
      create: { address, nonce },
      update: { nonce },
    });

    return NextResponse.json({ result: true, data: nonce });
  } catch (e) {
    return NextResponse.json(
      { result: false, message: e instanceof Error ? e.message : "An error occurred" },
      { status: 500 },
    );
  }
}
