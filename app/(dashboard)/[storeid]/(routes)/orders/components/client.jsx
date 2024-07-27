"use client";

import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { orderColumns } from "./columns";

const OrderClient = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Total orders ${data?.length}`}
          description="Manage orders for your store"
        />
      </div>
      <Separator />
      <DataTable columns={orderColumns} data={data} searchKey="products" />
    </>
  );
};

export default OrderClient;
