import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth/verify-auth";
import prisma from "@/lib/prisma";

// PUT /api/collections/[id] - Update a collection
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ result: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id: collectionId } = await params;
    const { name, description } = await request.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json({ result: false, message: "Name required" }, { status: 400 });
    }

    const updated = await prisma.collection.updateMany({
      where: { id: collectionId, userId: user.id },
      data: { name, description },
    });

    if (updated.count === 0) {
      return NextResponse.json({ result: false, message: "Collection not found" }, { status: 404 });
    }

    return NextResponse.json({ result: true, message: "Your collection folder has been updated successfully!" });
  } catch (e) {
    return NextResponse.json(
      { result: false, message: e instanceof Error ? e.message : "An error occurred" },
      { status: 500 },
    );
  }
}

// DELETE /api/collections/[id] - Delete a collection
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ result: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id: collectionId } = await params;

    const deleted = await prisma.collection.deleteMany({ where: { id: collectionId, userId: user.id } });

    if (deleted.count === 0) {
      return NextResponse.json({ result: false, message: "Collection not found" }, { status: 404 });
    }

    return NextResponse.json({ result: true, message: "Your collection folder has been deleted successfully!" });
  } catch (e) {
    return NextResponse.json(
      { result: false, message: e instanceof Error ? e.message : "An error occurred" },
      { status: 500 },
    );
  }
}
