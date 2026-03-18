import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth/verify-auth";
import prisma from "@/lib/prisma";

// GET /api/collections - List all collections for authenticated user
export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ result: false, message: "Unauthorized" }, { status: 401 });
    }

    const collections = await prisma.collection.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ result: true, message: "Get all collection successfull", data: collections });
  } catch (e) {
    return NextResponse.json(
      { result: false, data: [], message: e instanceof Error ? e.message : "An error occurred" },
      { status: 500 },
    );
  }
}

// POST /api/collections - Create a new collection
export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ result: false, message: "Unauthorized" }, { status: 401 });
    }

    const { name, description } = await request.json();
    if (!name || typeof name !== "string") {
      return NextResponse.json({ result: false, message: "Name required" }, { status: 400 });
    }

    await prisma.collection.create({ data: { name, description, userId: user.id } });

    return NextResponse.json({ result: true, message: "Your collection folder has been created successfully!" });
  } catch (e) {
    return NextResponse.json(
      { result: false, message: e instanceof Error ? e.message : "An error occurred" },
      { status: 500 },
    );
  }
}
