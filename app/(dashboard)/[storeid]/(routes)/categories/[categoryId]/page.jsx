import prismaDb from "@/lib/prismadb";
import React from "react";
import CategoryForm from "./components/category-form";

const CategoryPage = async ({ params }) => {
  const { categoryId, storeId } = params;

  let category;
  if (params.categoryId !== "new") {
    category = await prismaDb.category.findUnique({
      where: {
        id: categoryId,
      },
    });
  }

  const billboards = await prismaDb.billboard.findMany({
    where: {
      storeId: storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </div>
  );
};

export default CategoryPage;
