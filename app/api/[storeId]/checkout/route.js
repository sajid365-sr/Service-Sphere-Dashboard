import { NextResponse } from "next/server";
import prismaDb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

const corsHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeader });
}

export async function POST(req, { params }) {
  try {
    const { productIds } = await req.json();

    console.log(productIds);

    if (!productIds || productIds.length === 0) {
      return new NextResponse({ status: 400 }, "Product ids are required");
    }

    const products = await prismaDb.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    const line_items = [];

    products.forEach((product) =>
      line_items.push({
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
      })
    );

    const order = await prismaDb.order.create({
      data: {
        storeId: params.storeId,
        isPaid: false,
        orderItem: {
          create: productIds.map((productId) => ({
            product: {
              connect: {
                id: productId,
              },
            },
          })),
        },
      },
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
      cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
      metadata: {
        orderId: order.id,
      },
    });

    return NextResponse.json(
      { url: session.url },
      {
        headers: corsHeader,
      }
    );
  } catch (error) {
    console.log("[CHECKOUT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
