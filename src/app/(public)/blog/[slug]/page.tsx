import BlogCard from "~/components/client/blog_card/blog_card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { db } from "~/server/db";
import { blogPosts } from "~/server/db/schema";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = parseInt((await params).slug);
  const recentBlogPosts = await db.select().from(blogPosts).limit(4);

  return (
    <>
      <div className="m-16" />
      <div className="flex flex-col items-center justify-center">
        <div className="m-4 rounded-md bg-slate-700 bg-opacity-40 p-4 text-black shadow-sm shadow-black dark:text-white md:mb-10 md:ml-40 md:mr-40 md:p-10">
          <h1 className="mb-4 pb-2 pl-4 pr-4 pt-4 font-sans text-2xl font-semibold tracking-tight text-black dark:text-white">
            Welcome to Ryan&apos;s Ramblings...
          </h1>
          <div className="w-full border-spacing-4 border-b border-slate-500" />
          <div className="min-h-40">
            {recentBlogPosts.map((post): React.ReactNode => {
              return (
                <div key={post.id}>
                  <BlogCard post={post} />
                </div>
              );
            })}
          </div>
          <div className="w-full border-spacing-4 border-b border-slate-500" />
          <Pagination className="justify-center">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={slug == 2 ? "/blog/" : `/blog/${slug - 1}/`}
                ></PaginationPrevious>
              </PaginationItem>
              <PaginationItem>
                <p className="text-md ml-2 mr-2">Page: {slug}</p>
              </PaginationItem>
              <PaginationItem className="">
                <PaginationNext href={`/blog/${slug + 1}`} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="w-full border-spacing-4 border-b border-slate-500" />
        </div>
      </div>
    </>
  );
}
