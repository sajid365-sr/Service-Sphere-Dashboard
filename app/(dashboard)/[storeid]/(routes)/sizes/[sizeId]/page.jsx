import prismaDb from "@/lib/prismadb";
import React from "react";
import SizeForm from "./components/size-form";

const BillBoardPage = async ({ params }) => {
  const { sizeId } = params;

  let size;
  if (params.sizeId !== "new") {
    size = await prismaDb.size.findUnique({
      where: {
        id: sizeId,
      },
    });
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default BillBoardPage;
