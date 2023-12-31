import prismaDb from "@/lib/prismadb";
import React from "react";
import BillboardFrom from "./components/billboard-form";

const BillBoardPage = async ({ params }) => {
  const billboard = await prismaDb.billBoard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardFrom initialData={billboard} />
      </div>
    </div>
  );
};

export default BillBoardPage;
