import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import SettingsFrom from "./components/settings-form";

const SettingsPage = async ({ params }) => {
  const { userId } = auth();
  if (!userId) {
    redirect("sign-in");
  }

  const store = await prismaDb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {" "}
        <SettingsFrom initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
