"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { billboardColumns } from "./columns";
import ApiList from "@/components/ui/api-list";

const BillBoardClient = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Total billboards ${data?.length}`}
          description="Manage billboards for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={billboardColumns} data={data} searchKey="label" />
      <Heading title="API" description="API call for billboard" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
};

export default BillBoardClient;
