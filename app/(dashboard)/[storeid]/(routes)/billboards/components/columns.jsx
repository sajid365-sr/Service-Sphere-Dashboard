"use client";

import { images } from "@/next.config";
import CellAction from "./cell-action";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const billboardColumns = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "image",
    header: "View",
    cell: ({ row }) => (
      <Image
        alt="Billboard Cover"
        src={row.original.image}
        width={100}
        height={60}
        className="aspect-[5/3]"
      />
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
