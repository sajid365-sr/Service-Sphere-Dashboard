import Navbar from "@/components/navbar";
import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children, params }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
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
    <>
      <div>
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default DashboardLayout;
