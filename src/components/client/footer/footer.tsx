"use client";

import type { JSX } from "react";
import type Linkable from "~/components/types/linkable";
import { useRouter } from "next/navigation";

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
      <div
        className={`bottom-0 mt-4 flex max-h-[9rem] w-full flex-row justify-between bg-slate-800 p-2`}
      >
        <div className="m-2 mb-2 ml-6 h-fit w-fit rounded-md bg-slate-700 p-2 pl-3 shadow-md shadow-slate-900">
          <h3 className="text-sm">Site Map:</h3>
          <ul className="flex flex-wrap">{siteMap}</ul>
        </div>
        <div className="m-2 mr-6 flex flex-col text-nowrap rounded-md bg-slate-700 p-2 pl-3 pr-3 text-xs shadow-md shadow-slate-900">
          <p>Copyright: Ryan Steffan, 2025</p>
          <p>Contact Email: ryansteffan.biz@gmail.com</p>
          <p>
            License Details are available:&nbsp;
            <a
              href="license"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
