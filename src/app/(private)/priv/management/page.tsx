import { ClerkProvider } from "@clerk/nextjs";
import ManagementHeader from "~/components/client/management_header/management_header";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Management() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <>
      <ClerkProvider>
        <ManagementHeader pageName="Home" />
        <h1>Hello World</h1>
      </ClerkProvider>
    </>
  );
}
