import { SignOutButton } from "@clerk/nextjs";
import ManagementHeader from "~/components/client/management_header/management_header";
import { Button } from "~/components/ui/button";

export default function Management() {
  return (
    <>
      <ManagementHeader pageName="Home" />
      <h1>Hello World</h1>
    </>
  );
}
