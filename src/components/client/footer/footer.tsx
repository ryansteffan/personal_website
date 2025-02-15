"use client";

import type { JSX } from "react";
import type Linkable from "~/components/types/linkable";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="fixed bottom-0 w-full text-sm">
        <p>Copyright: Ryan Steffan, 2025</p>
        <p>
          License:{" "}
          <Link href={"/license"} className="hover:underline">
            Here
          </Link>
        </p>
      </div>
    </>
  );
}
