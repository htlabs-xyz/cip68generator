import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth/verify-auth";
import prisma from "@/lib/prisma";
import { PMetadata } from "@/types";
import { isNil } from "lodash";

// GET /api/metadata/[id] - Get metadata by ID
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ result: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id: metadataId } = await params;

    const metadata = await prisma.metadata.findFirst({ where: { id: metadataId } });

    const collection = await prisma.collection.findFirst({
      where: { id: metadata?.collectionId, userId: user.id },
    });

    if (isNil(collection)) {
      return NextResponse.json({ data: null, message: "Metadata not found" }, { status: 404 });
    }

    const parsedMetadata: PMetadata = metadata ? { ...metadata, content: JSON.parse(metadata.content) } : null!;

    return NextResponse.json({ data: parsedMetadata, message: "success" });
  } catch (e) {
    return NextResponse.json(
      { data: null, message: e instanceof Error ? e.message : "An error occurred" },
      { status: 500 },
    );
  }
}

// PUT /api/metadata/[id] - Update metadata
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ result: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id: metadataId } = await params;
    const { collectionId, metadata }: { collectionId: string; metadata: PMetadata } = await request.json();

    const collection = await prisma.collection.findFirst({
      where: { id: collectionId, userId: user.id },
    });

    if (isNil(collection)) {
      return NextResponse.json({ result: false, message: "Collection not found" }, { status: 404 });
    }

    await prisma.metadata.update({
      where: { id: metadataId },
      data: { content: JSON.stringify(metadata.content) },
    });

    return NextResponse.json({ result: true, message: "success" });
  } catch (e) {
    return NextResponse.json(
      { result: false, message: e instanceof Error ? e.message : "An error occurred" },
      { status: 500 },
    );
  }
}
