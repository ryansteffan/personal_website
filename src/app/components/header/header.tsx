"use client";

import type { JSX } from "react";
import { Button, ButtonGroup } from "@heroui/button";
import { useRouter } from "next/navigation";

import type page from "~/app/types/page";
import Link from "next/link";

export default function Header(): JSX.Element {
  const router = useRouter();

  const siteMapPages: page[] = [
    { title: "About Me", link: "about" },
    { title: "My Skills", link: "skills" },
    { title: "Contact Me", link: "contact" },
    { title: "My Blog", link: "blog" },
  ];

  // Make a list all the buttons to be used in the header of the website.
  const headerButtons: JSX.Element[] = siteMapPages.map((page) => (
    <li className="h-13 flex" key={page.title}>
      <Button
        className="align-middle"
        color="primary"
        onPressStart={() => router.push(page.link)}
      >
        {page.title}
      </Button>
    </li>
  ));

  return (
    <>
      <div className="m-4 flex max-h-14">
        <div className="mr-2 w-14 align-middle">
          <Link href={"/"}>
            <img
              src="logo.svg"
              alt="Ryan Steffan's website logo"
              className="w-fit"
            />
          </Link>
        </div>
        <ul className="flex w-full flex-row justify-around rounded-lg bg-slate-800 p-2 align-middle shadow-sm shadow-black">
          {headerButtons}
        </ul>
      </div>
    </>
  );
}
