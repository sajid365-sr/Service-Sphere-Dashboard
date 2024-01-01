"use client";

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
];
