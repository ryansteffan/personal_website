"use client";

import Link from "next/link";
import React from "react";
import {
  AiOutlineHome,
  AiOutlineProfile,
  AiOutlineMail,
  AiOutlineRocket,
  AiOutlineCode,
  AiOutlineBook,
} from "react-icons/ai";

export default function ManagementSidebar(): React.ReactNode {
  return (
    <div className="flex flex-col">
      <div className="flex h-screen w-fit flex-col bg-gray-100 p-4 shadow-md shadow-black dark:bg-gray-900">
        <h1 className="m-0 mb-3 text-center text-2xl font-bold underline">
          Menus
        </h1>
        <ManagementLink link="">
          <AiOutlineHome className="mr-2 text-3xl text-gray-500 dark:text-blue-500" />
          <p>Home</p>
        </ManagementLink>
        <ManagementLink link="/about">
          <AiOutlineProfile className="mr-2 text-3xl text-gray-500 dark:text-blue-500" />
          <p>About Me</p>
        </ManagementLink>
        <ManagementLink link="/contact">
          <AiOutlineMail className="mr-2 text-3xl text-gray-500 dark:text-blue-500" />
          <p>Contact Me</p>
        </ManagementLink>
        <ManagementLink link="/skills">
          <AiOutlineRocket className="mr-2 text-3xl text-gray-500 dark:text-blue-500" />
          <p>My Skills</p>
        </ManagementLink>
        <ManagementLink link="/projects">
          <AiOutlineCode className="mr-2 text-3xl text-gray-500 dark:text-blue-500" />
          <p>My Projects</p>
        </ManagementLink>
        <ManagementLink link="/blog">
          <AiOutlineBook className="mr-2 text-3xl text-gray-500 dark:text-blue-500" />
          <p>My Blog</p>
        </ManagementLink>
      </div>
    </div>
  );
}

function ManagementLink({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string;
}): React.ReactNode {
  return (
    <Link href={`/priv/management${link}`}>
      <div className="mb-2 mt-1 flex w-max rounded-md bg-slate-700 p-2 text-left">
        {children}
      </div>
    </Link>
  );
}
