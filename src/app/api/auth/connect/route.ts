import { NextRequest, NextResponse } from "next/server";
import { checkSignature, generateNonce } from "@meshsdk/core";
import prisma from "@/lib/prisma";
import { signToken } from "@/lib/auth/jwt";
import { isNil } from "lodash";

// POST /api/auth/connect - Verify wallet signature and issue JWT
export async function POST(request: NextRequest) {
  try {
    const { wallet, address, signature } = await request.json();
    if (!wallet || !address || !signature) {
      return NextResponse.json({ result: false, message: "wallet, address, and signature required" }, { status: 400 });
    }

    // Lookup stored nonce for this address
    const walletNonce = await prisma.walletNonce.findFirst({ where: { address } });
    if (isNil(walletNonce) || isNil(walletNonce.nonce)) {
      return NextResponse.json({ result: false, message: "Nonce not found. Request /api/auth/nonce first." }, { status: 400 });
    }

    // Verify wallet signature against stored nonce, binding to the requesting address
    const isValid = checkSignature(walletNonce.nonce, signature, address);
    if (!isValid) {
      return NextResponse.json({ result: false, message: "Invalid signature" }, { status: 401 });
    }

    // Upsert user and rotate nonce to prevent replay
    const user = await prisma.user.upsert({
      where: { address },
      create: { address },
      update: {},
    });

    await prisma.walletNonce.update({
      where: { address },
      data: { nonce: generateNonce("signin to cip68 nft") },
    });

    // Issue JWT token
    const token = signToken({ id: user.id, address: user.address, wallet });

    return NextResponse.json({
      result: true,
      data: { token, user: { id: user.id, address: user.address, wallet } },
    });
  } catch (e) {
    return NextResponse.json(
      { result: false, message: e instanceof Error ? e.message : "An error occurred" },
      { status: 500 },
    );
  }
}
