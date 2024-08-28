"use client";

import toast from "react-hot-toast";
import CellAction from "./cell-action";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

const onCopy = (value) => {
  navigator.clipboard.writeText(value);
  toast.success("Color code copied successfully.");
};

export const colorColumn = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <span
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.value }}
        />
        <span>{row.original.value}</span>

        <Button
          onClick={() => onCopy(row.original.value)}
          title="copy color code"
          variant="outline"
          className="p-3"
        >
          <Copy className="h-4 w-4 " />
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    header: "Action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
