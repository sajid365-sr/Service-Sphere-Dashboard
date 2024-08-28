import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

/* ====================== GET INDIVIDUAL COLLECTION ====================== */
export async function GET(req, { params }) {
  try {
    if (!params.collectionId) {
      return new NextResponse("Sizes id is required", { status: 400 });
    }

    const collection = await prismaDb.collection.findUnique({
      where: {
        id: params.collectionId,
      },
    });

    return NextResponse.json(collection);
  } catch (error) {
    console.log("[COLLECTION_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

/* ====================== UPDATE INDIVIDUAL COLLECTION ====================== */
export async function PATCH(req, { params }) {
  try {
    const { userId } = auth();
    const { name, imageUrl } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismaDb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const collection = await prismaDb.collection.update({
      where: {
        id: params.collectionId,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(collection);
  } catch (error) {
    console.log("[COLLECTION_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

/* ====================== DELETE INDIVIDUAL COLLECTION ====================== */
export async function DELETE(req, { params }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!params.collectionId) {
      return new NextResponse("Collection id is required", { status: 400 });
    }

    const storeByUserId = await prismaDb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const collection = await prismaDb.collection.delete({
      where: {
        id: params.collectionId,
      },
    });

    return NextResponse.json(collection);
  } catch (error) {
    console.log("[COLLECTION_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
