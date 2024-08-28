import prismaDb from "@/lib/prismadb";
import React from "react";
import CollectionForm from "./components/collection-form";

const CollectionPage = async ({ params }) => {
  const { collectionId } = params;

  let collection;
  if (params.collectionId !== "new") {
    collection = await prismaDb.collection.findUnique({
      where: {
        id: collectionId,
      },
    });
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CollectionForm initialData={collection} />
      </div>
    </div>
  );
};

export default CollectionPage;
