import prismaDb from "@/lib/prismadb";
import React from "react";
import ColorForm from "./components/color-form";

const BillBoardPage = async ({ params }) => {
  const { colorId } = params;

  let color;
  if (params.colorId !== "new") {
    color = await prismaDb.color.findUnique({
      where: {
        id: colorId,
      },
    });
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default BillBoardPage;
