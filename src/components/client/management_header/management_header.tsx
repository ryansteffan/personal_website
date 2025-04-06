import { SignOutButton } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";

export default function ManagementHeader({
  pageName,
}: {
  pageName: string;
}): React.ReactNode {
  return (
    <div className="flex w-full items-center justify-between rounded-md bg-gray-100 p-4 shadow-md shadow-black dark:bg-gray-900">
      <h1 className="text-bold text-lg">Management - {pageName}</h1>
      <SignOutButton redirectUrl="/blog">
        <Button className="bg-slate-700 text-white hover:bg-slate-500">
          Sign Out
        </Button>
      </SignOutButton>
    </div>
  );
}
