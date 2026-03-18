import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth/verify-auth";
import prisma from "@/lib/prisma";
import { AssetInput } from "@/types";

// POST /api/collections/with-data - Create collection with metadata assets
export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ result: false, message: "Unauthorized" }, { status: 401 });
    }

    const { collectionName, listAssetInput }: { collectionName: string; listAssetInput: AssetInput[] } =
      await request.json();

    if (!collectionName || typeof collectionName !== "string") {
      return NextResponse.json({ result: false, message: "Collection name required" }, { status: 400 });
    }

    if (!Array.isArray(listAssetInput)) {
      return NextResponse.json({ result: false, message: "listAssetInput must be an array" }, { status: 400 });
    }

    const result = await prisma.collection.create({
      data: {
        name: collectionName,
        userId: user.id,
        Metadata: {
          create: listAssetInput.map((asset) => ({
            assetName: asset.assetName,
            content: JSON.stringify(asset.metadata),
            nftReference: [],
          })),
        },
      },
      include: { Metadata: true },
    });

    return NextResponse.json({ result: true, message: "success", data: result });
  } catch (e) {
    return NextResponse.json(
      { data: null, result: false, message: e instanceof Error ? e.message : "An error occurred" },
      { status: 500 },
    );
  }
}
