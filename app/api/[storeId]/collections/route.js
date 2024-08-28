import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

/* ====================== CREATE COLLECTION ====================== */
export async function POST(req, { params }) {
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
    const collection = await prismaDb.collection.create({
      data: {
        name,
        imageUrl,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(collection);
  } catch (error) {
    console.log("[COLLECTION_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

/* ====================== GET ALL COLLECTIONS ====================== */
export async function GET(req, { params }) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const collections = await prismaDb.collection.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(collections);
  } catch (error) {
    console.log("[COLLECTION_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
