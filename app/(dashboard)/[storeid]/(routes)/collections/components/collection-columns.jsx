"use client";

import Image from "next/image";
import CellAction from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const collectionColumns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "image",
    header: "Cover Image",
    cell: ({ row }) => (
      <Image
        alt="Collection Cover"
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
