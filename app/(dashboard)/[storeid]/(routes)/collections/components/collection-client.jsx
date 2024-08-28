"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { collectionColumns } from "./collection-columns";
import ApiList from "@/components/ui/api-list";

const CollectionClient = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Total Collections ${data?.length}`}
          description="Manage collections for your products"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/collections/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={collectionColumns} data={data} searchKey="name" />
      <Heading title="API" description="API call for collections" />
      <Separator />
      <ApiList entityName="collections" entityIdName="collectionId" />
    </>
  );
};

export default CollectionClient;
