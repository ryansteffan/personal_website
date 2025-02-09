"use client";

import React from "react";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

export default function UnderConstruction() {
  const router = useRouter();
  return (
    <>
      <div className="mx-auto mt-5 flex h-fit w-1/3 flex-col content-center justify-items-center rounded-md bg-blue-900 p-2 shadow-sm shadow-black">
        <h1 className="mb-1 text-center font-bold">Hold Up!</h1>
        <p className="text-center">
          This page is a place holder and is currently being worked on.
        </p>
        <p className="pb-2 text-center">Comeback later to see whats new 🥳</p>
        <Button
          color="primary"
          onPress={() => {
            router.push("/");
          }}
        >
          Back to Home Page...
        </Button>
      </div>
    </>
  );
}
