import prismaDb from "@/lib/prismadb";
import React from "react";
import BillboardFrom from "./components/billboard-form";

const BillBoardPage = async ({ params }) => {
  const { billboardId } = params;

  let billBoard;
  if (params.billboardId !== "new") {
    billBoard = await prismaDb.billboard.findUnique({
      where: {
        id: billboardId,
      },
    });
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardFrom initialData={billBoard} />
      </div>
    </div>
  );
};

export default BillBoardPage;
