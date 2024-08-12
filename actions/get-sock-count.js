import prismaDb from "@/lib/prismadb";

export const getStockCount = async (storeId) => {
  const stockCount = await prismaDb.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  return stockCount;
};
