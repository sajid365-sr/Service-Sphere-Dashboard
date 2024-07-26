"use client";

import { images } from "@/next.config";
import CellAction from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const billboardColumns = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    header: "Action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
