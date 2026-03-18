import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth/verify-auth";
import prisma from "@/lib/prisma";
import { Media } from "@prisma/client";
import { isNil, isEmpty } from "lodash";

// GET /api/media?query=X&from=X&to=X&page=X&limit=X
export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ result: false, message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "12", 10);

    const whereConditions: {
      userId: string;
      OR?: Array<{ name?: { contains: string; mode?: "insensitive" } } | { url?: { contains: string; mode?: "insensitive" } }>;
      createdAt?: { gte?: Date; lte?: Date };
    } = { userId: user.id };

    if (!isNil(query) && !isEmpty(query)) {
      whereConditions.OR = [
        { name: { contains: query, mode: "insensitive" } },
        { url: { contains: query, mode: "insensitive" } },
      ];
    }

    if (from || to) {
      whereConditions.createdAt = {
        ...(from ? { gte: new Date(from) } : {}),
        ...(to ? { lte: new Date(to) } : {}),
      };
    }

    const [media, totalItems] = await Promise.all([
      prisma.media.findMany({
        where: whereConditions,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { updatedAt: "desc" },
      }),
      prisma.media.count({ where: whereConditions }),
    ]);

    return NextResponse.json({
      data: media,
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

// DELETE /api/media - Delete media entries
export async function DELETE(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ result: false, message: "Unauthorized" }, { status: 401 });
    }

    // Accept both { media: [...] } wrapper and raw array for compatibility
    const body = await request.json();
    const media: Media[] = Array.isArray(body) ? body : body.media;

    await prisma.media.deleteMany({
      where: {
        userId: user.id,
        id: { in: media.map((item) => item.id) },
      },
    });

    return NextResponse.json({ message: "success", result: true });
  } catch (e) {
    return NextResponse.json(
      { message: e instanceof Error ? e.message : "An error occurred", result: false },
      { status: 500 },
    );
  }
}
