import { format } from "date-fns";
import ProductClient from "./components/product-client";
import prismaDb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

const ProductPage = async ({ params }) => {
  const products = await prismaDb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
      collection: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(products);

  const formattedProducts = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value + `(${item.color.name})`,
    collection: item.collection.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductPage;
