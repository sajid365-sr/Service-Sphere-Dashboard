import { format } from "date-fns";
import CategoryClient from "./components/categoryClient";
import prismaDb from "@/lib/prismadb";

const CategoriesPage = async ({ params }) => {
  const categories = await prismaDb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billBoard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billBoardLabel: item.billBoard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
