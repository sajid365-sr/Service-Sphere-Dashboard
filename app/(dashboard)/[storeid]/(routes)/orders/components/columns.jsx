"use client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const orderColumns = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
    // cell: ({ row }) => (
    //   <div className="bg-green-600 bg-opacity-70 rounded-md px-3 py-2">
    //     {row.original.isPaid}
    //   </div>
    // ),
  },
];
