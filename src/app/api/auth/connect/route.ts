import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST /api/auth/connect - Register/lookup user by wallet address
export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json();
    if (!address || typeof address !== "string") {
      return NextResponse.json({ result: false, message: "Address required" }, { status: 400 });
    }

    const user = await prisma.user.upsert({
      where: { address },
      create: { address },
      update: {},
    });

    return NextResponse.json({
      result: true,
      data: { id: user.id, address: user.address },
    });
  } catch (e) {
    return NextResponse.json(
      { result: false, message: e instanceof Error ? e.message : "An error occurred" },
      { status: 500 },
    );
  }
}
