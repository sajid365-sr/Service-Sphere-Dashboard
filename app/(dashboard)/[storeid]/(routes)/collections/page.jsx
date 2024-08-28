import { format } from "date-fns";
import CollectionClient from "./components/collection-client";
import prismaDb from "@/lib/prismadb";

const CollectionsPage = async ({ params }) => {
  const collections = await prismaDb.collection.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCollections = collections.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.imageUrl,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CollectionClient data={formattedCollections} />
      </div>
    </div>
  );
};

export default CollectionsPage;
