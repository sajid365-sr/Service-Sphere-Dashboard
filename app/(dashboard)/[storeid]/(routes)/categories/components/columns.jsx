"use client";

import CellAction from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const categoryColumns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billBoardLabel",
    header: "Billboard",
    cell: ({ row }) => row.original.billBoardLabel,
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
