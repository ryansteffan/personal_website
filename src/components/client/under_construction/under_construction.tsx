"use client";

import Link from "next/link";
import React from "react";

export default function UnderConstruction() {
  return (
    <>
      <div className="mx-auto flex h-fit w-1/3 flex-col content-center justify-items-center rounded-md bg-blue-900 p-2 shadow-sm shadow-black">
        <h1 className="mb-1 text-center font-bold">Hold Up!</h1>
        <p className="text-center">
          This page is a place holder and is currently being worked on.
        </p>
        <p className="pb-2 text-center">Comeback later to see whats new 🥳</p>
        <Link href={"/"} className="text-center">
          <button className="rounded-full bg-gradient-to-b from-blue-500 to-blue-600 px-8 py-2 text-white transition duration-200 hover:shadow-xl focus:ring-2 focus:ring-blue-400">
            Back to Home Page...
          </button>
        </Link>
      </div>
    </>
  );
}
