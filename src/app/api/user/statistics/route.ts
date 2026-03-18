import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth/verify-auth";
import prisma from "@/lib/prisma";
import { isNil } from "lodash";

// GET /api/user/statistics - Get statistics for authenticated user
export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ result: false, message: "Unauthorized" }, { status: 401 });
    }

    const userStats = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        _count: {
          select: {
            Collection: true,
            Media: true,
          },
        },
        Collection: {
          include: {
            _count: {
              select: {
                Metadata: true,
              },
            },
          },
        },
      },
    });

    if (isNil(userStats)) {
      return NextResponse.json({ result: false, data: null, message: "User not found" }, { status: 404 });
    }

    const totalMetadata = userStats.Collection.reduce((sum, collection) => sum + (collection._count?.Metadata || 0), 0);

    return NextResponse.json({
      result: true,
      message: "Get user statistics successful",
      data: {
        collection: userStats._count.Collection || 0,
        media: userStats._count.Media || 0,
        metadata: totalMetadata,
      },
    });
  } catch (e) {
    return NextResponse.json(
      { result: false, data: null, message: e instanceof Error ? e.message : "An error occurred" },
      { status: 500 },
    );
  }
}
