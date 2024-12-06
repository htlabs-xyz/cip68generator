"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { AssetInput } from "@/types";
import { UnauthorizedException } from "@/utils/http/http-exceptions";

export async function createCollection({ name, description }: { name: string; description?: string }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.collection.create({
      data: {
        name,
        description,
        userId,
      },
    });

    return {
      result: true,
      message: "create collection successfull",
    };
  } catch (e: unknown) {
    return {
      result: false,
      message: e instanceof Error ? e.message : "Cant create collection,unknown error",
    };
  }
}

export async function getAllCollection() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const collections = await prisma.collection.findMany({
      where: {
        userId: userId,
      },
    });

    return {
      result: true,
      message: "get all collection successfull",
      data: collections,
    };
  } catch (error: unknown) {
    return {
      result: false,
      data: [],
      message: error instanceof Error ? error.message : "Cant get collection ,Unknown error",
    };
  }
}

export async function deleteCollection(collectionId: string) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.collection.delete({
      where: {
        id: collectionId,
      },
    });

    return {
      result: true,
      message: "delete collection successfull",
    };
  } catch (e) {
    console.log(e);
    return {
      result: false,
      message: e instanceof Error ? e.message : "Cant delete collection, unknown error",
    };
  }
}

export async function updateCollection({ collectionId, name, description }: { collectionId: string; name: string; description?: string }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    await prisma.collection.update({
      where: {
        id: collectionId,
      },
      data: {
        name,
        description,
      },
    });

    return {
      result: true,
      message: "update collection successfull",
    };
  } catch (e: unknown) {
    return {
      result: false,
      message: e instanceof Error ? e.message : "Cant update collection, unknown error",
    };
  }
}

export async function createCollectionWithData({ collectionName, listAssetInput }: { collectionName: string; listAssetInput: AssetInput[] }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const result = await prisma.collection.create({
      data: {
        name: collectionName,
        userId: userId,
        Metadata: {
          create: listAssetInput.map((asset) => ({
            assetName: asset.assetName,
            content: JSON.stringify(asset.metadata),
            nftReference: [],
          })),
        },
      },
      include: {
        Metadata: true,
      },
    });

    return {
      result: true,
      message: "success",
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      result: false,
      message: error instanceof Error ? error.message : "Cant create collection with data, unknown error",
    };
  }
}
