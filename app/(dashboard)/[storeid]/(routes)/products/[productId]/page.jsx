import prismaDb from "@/lib/prismadb";
import React from "react";
import ProductForm from "./components/product-form";

const ProductPage = async ({ params }) => {
  const { productId } = params;

  let product;
  if (params.productId !== "new") {
    product = await prismaDb.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
      },
    });
  }

  const categories = await prismaDb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismaDb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const color = await prismaDb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={product}
          categories={categories}
          sizes={sizes}
          colors={color}
        />
      </div>
    </div>
  );
};

export default ProductPage;
