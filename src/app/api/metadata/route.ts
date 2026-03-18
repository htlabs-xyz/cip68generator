import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth/verify-auth";
import prisma from "@/lib/prisma";
import { PMetadata } from "@/types";
import { isNil, isEmpty } from "lodash";

// GET /api/metadata?collectionId=X&query=X&from=X&to=X&page=X&limit=X
export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ result: false, message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const collectionId = searchParams.get("collectionId") ?? "";
    const query = searchParams.get("query");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "12", 10);

    const collection = await prisma.collection.findFirst({
      where: { id: collectionId, userId: user.id },
    });

    if (isNil(collection)) {
      return NextResponse.json({ data: [], message: "Collection not found" }, { status: 404 });
    }

    const whereConditions: {
      collectionId: string;
      OR?: Array<{ assetName?: { contains: string; mode?: "insensitive" } } | { content?: { contains: string; mode?: "insensitive" } }>;
      createdAt?: { gte?: Date; lte?: Date };
    } = { collectionId };

    if (!isNil(query) && !isEmpty(query)) {
      whereConditions.OR = [
        { assetName: { contains: query, mode: "insensitive" } },
        { content: { contains: query, mode: "insensitive" } },
      ];
    }

    if (from || to) {
      whereConditions.createdAt = {
        ...(from ? { gte: new Date(from) } : {}),
        ...(to ? { lte: new Date(to) } : {}),
      };
    }

    const [metadata, totalItems] = await Promise.all([
      prisma.metadata.findMany({
        where: whereConditions,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { updatedAt: "desc" },
      }),
      prisma.metadata.count({ where: whereConditions }),
    ]);

    const parsedMetadata: PMetadata[] = metadata.map((item) => ({
      ...item,
      content: JSON.parse(item.content),
    }));

    return NextResponse.json({
      data: parsedMetadata,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
    });
  } catch (e) {
    return NextResponse.json(
      { data: [], message: e instanceof Error ? e.message : "An error occurred" },
      { status: 500 },
    );
  }
}

// POST /api/metadata - Add metadata entries to a collection
export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ result: false, message: "Unauthorized" }, { status: 401 });
    }

    const { collectionId, listMetadata }: { collectionId: string; listMetadata: Record<string, string>[] } =
      await request.json();

    const collection = await prisma.collection.findFirst({
      where: { id: collectionId, userId: user.id },
    });

    if (isNil(collection)) {
      return NextResponse.json({ result: false, message: "Collection not found" }, { status: 404 });
    }

    await prisma.metadata.createMany({
      data: listMetadata.map((metadata) => ({
        collectionId,
        content: JSON.stringify(metadata),
      })),
    });

    return NextResponse.json({ result: true, message: "success" });
  } catch (e) {
    return NextResponse.json(
      { result: false, message: e instanceof Error ? e.message : "An error occurred" },
      { status: 500 },
    );
  }
}

// DELETE /api/metadata - Delete metadata entries from a collection
export async function DELETE(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ result: false, message: "Unauthorized" }, { status: 401 });
    }

    const { collectionId, listMetadata }: { collectionId: string; listMetadata: PMetadata[] } = await request.json();

    const collection = await prisma.collection.findFirst({
      where: { id: collectionId, userId: user.id },
    });

    if (isNil(collection)) {
      return NextResponse.json({ result: false, message: "Collection not found" }, { status: 404 });
    }

    const metadataIds = listMetadata.map((m) => m.id);

    await prisma.metadata.deleteMany({
      where: { id: { in: metadataIds }, collectionId },
    });

    return NextResponse.json({ result: true, message: "success" });
  } catch (e) {
    return NextResponse.json(
      { result: false, message: e instanceof Error ? e.message : "An error occurred" },
      { status: 500 },
    );
  }
}
