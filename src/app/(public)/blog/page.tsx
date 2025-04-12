import { desc } from "drizzle-orm";
import type { Metadata } from "next";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { db } from "~/server/db";
import { blogPosts } from "~/server/db/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ryan Steffan - Blog",
  description: "Ryan Steffan's blog.",
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "Ryan Steffan",
    "home page",
    "blog",
    "website",
    "portfolio",
    "programming",
    "technology",
    "networking",
  ],
  authors: [{ name: "Ryan Steffan", url: "https://ryansteffan.com" }],
};

export default async function BlogPage(): Promise<React.ReactNode> {
  const recentBlogPosts = await db
    .select()
    .from(blogPosts)
    .orderBy(desc(blogPosts.updatedAt))
    .limit(5);

  console.log(recentBlogPosts);
  return (
    <>
      <div className="m-16" />
      <div className="m-4 rounded-md bg-slate-700 bg-opacity-40 p-4 text-black shadow-sm shadow-black dark:text-white md:mb-10 md:ml-40 md:mr-40 md:p-10">
        <h1 className="pb-2 pl-4 pr-4 pt-4 font-sans text-2xl font-semibold tracking-tight text-black dark:text-white">
          Welcome to Ryan&apos;s Ramblings...
        </h1>
        <p className="p-4 text-lg">
          Welcome to my tech blog covering programming, networking, and
          technology trends. You&apos;ll find tutorials, opinions, and
          experiences from my journey in tech. Explore the posts below and check
          back for new content!
        </p>
        <div className="w-full border-spacing-4 border-b border-slate-500" />
        <div className="min-h-40">
          {recentBlogPosts.map((post): React.ReactNode => {
            return (
              <div key={post.id}>
                <Card className="mb-2 mt-2 bg-slate-900">
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription className="">
                      Author: {post.author} | Posted:{" "}
                      {post.createdAt?.toDateString()} | Updated:{" "}
                      {post.updatedAt?.toDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>{post.content.substring(0, 500)}...</CardContent>
                  <CardFooter>
                    <Link href={`/blog/posts/${post.id}/`}>
                      Read full post...
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            );
          })}
        </div>
        <div className="w-full border-spacing-4 border-b border-slate-500" />
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="/blog/2/" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <div className="w-full border-spacing-4 border-b border-slate-500" />
      </div>
    </>
  );
}
