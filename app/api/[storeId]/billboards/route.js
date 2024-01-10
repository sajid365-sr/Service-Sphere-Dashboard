import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

/* ====================== POST A BILLBOARD ====================== */
export async function POST(req, { params }) {
  try {
    const { userId } = auth();
    const { label, imageUrl } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
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
    const billboard = await prismaDb.billBoard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

/* ====================== GET ALL BILLBOARDS ====================== */
export async function GET(req, { params }) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const billboards = await prismaDb.store.findMany({
      where: {
        id: params.storeId,
      },
      include: {
        billboards: true,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
