"use client";

import type { JSX } from "react";
import type Linkable from "~/components/types/linkable";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Footer() {
  const siteMapPages: Linkable[] = [
    { title: "About Me", link: "about" },
    { title: "My Skills", link: "skills" },
    { title: "Contact Me", link: "contact" },
    { title: "My Blog", link: "blog" },
  ];

  const router = useRouter();

  const siteMap: JSX.Element[] = siteMapPages.map((map) => (
    <li key={map.title} className="m-2 w-max text-nowrap">
      {map.title}
    </li>
  ));

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
