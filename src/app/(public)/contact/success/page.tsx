"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function Success() {
  const router = useRouter();
  return (
    <>
      <div className="m-16" />
      <div className="m-4 mx-auto flex w-fit flex-col justify-center rounded-md bg-slate-700 p-4 text-center">
        <span className="text-3xl font-extrabold text-sky-400">Success!</span>
        <br />
        <span className="text-lg font-bold">Your message has been sent.</span>
        <Button
          onClick={() => {
            router.push("/");
          }}
          className="mt-2"
        >
          Home Page
        </Button>
      </div>
    </>
  );
}
