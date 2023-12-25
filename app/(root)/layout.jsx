import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import "../globals.css";
import prismaDb from "@/lib/prismadb";

export const metadata = {
  title: "Admin Dashboard",
  description: "Explore the future",
};

export default async function SetupLayout({ children }) {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismaDb.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
}
