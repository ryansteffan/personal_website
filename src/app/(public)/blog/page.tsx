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
        <div className="w-full border-spacing-4 border-b border-slate-700" />
        <div className="w h-40"></div>
        <div className="w-full border-spacing-4 border-b border-slate-700" />
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
        <div className="w-full border-spacing-4 border-b border-slate-700" />
      </div>
    </>
  );
}
