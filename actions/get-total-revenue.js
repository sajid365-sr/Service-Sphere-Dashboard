import prismaDb from "@/lib/prismadb";

export const getTotalRevenue = async (storeId) => {
  const paidOrders = await prismaDb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItem: {
        include: {
          product: true,
        },
      },
    },
  });

  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItem.reduce((orderSum, item) => {
      return Number(orderSum + item.product.price);
    }, 0);

    return total + orderTotal;
  }, 0);

  return totalRevenue;
};
