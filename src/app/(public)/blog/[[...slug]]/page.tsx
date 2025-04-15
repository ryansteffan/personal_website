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
import { asc, desc, gt, gte } from "drizzle-orm";
import BlogPost from "~/components/types/BlogPost";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string | undefined }>;
}) {
  let showHeader = false;
  let pageNumber: number;
  const numberOfPosts = 3;

  const { slug } = await params;

  if (slug === undefined || slug == "1") {
    showHeader = true;
    pageNumber = 1;
  } else {
    pageNumber = parseInt(slug);
  }

  const blogPosts: BlogPost[] = await GetBlogPosts(
    pageNumber,
    numberOfPosts + 1,
  ); // Extra post used to check for next page

  const blogPostsJSX: React.JSX.Element[] = [];

  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let postNumber = 0; postNumber < blogPosts.length; postNumber++) {
    const post = blogPosts[postNumber];

    if (post !== undefined) {
      blogPostsJSX.push(
        <div key={blogPosts[postNumber]?.id}>
          <BlogCard post={post} />
        </div>,
      );
    }
  }

  return (
    <>
      <div className="m-16" />
      <div className="flex flex-col items-center justify-center">
        <div className="m-4 rounded-md bg-slate-700 bg-opacity-40 p-4 text-black shadow-sm shadow-black dark:text-white md:mb-10 md:ml-40 md:mr-40 md:p-10">
          {showHeader && <BlogHeader />}
          <div className="w-full border-spacing-4 border-b border-slate-500" />
          <div className="min-h-40 min-w-full">{blogPostsJSX}</div>
          <div className="w-full border-spacing-4 border-b border-slate-500" />
          <div className="flex w-full items-center justify-center">
            <Pagination className="justify-center">
              <PaginationContent>
                {pageNumber != 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      href={`/blog/${pageNumber - 1}`}
                    ></PaginationPrevious>
                  </PaginationItem>
                )}
                <PaginationItem>
                  <p className="text-md ml-2 mr-2 rounded-md border border-blue-500 pb-1 pl-2 pr-2 pt-1">
                    {pageNumber}
                  </p>
                </PaginationItem>
                {blogPosts.length > numberOfPosts && (
                  <PaginationItem>
                    <PaginationNext href={`/blog/${pageNumber + 1}`} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
          <div className="w-full border-spacing-4 border-b border-slate-500" />
        </div>
      </div>
    </>
  );
}

function BlogHeader() {
  return (
    <>
      <h1 className="mb-4 pb-2 pl-4 pr-4 pt-4 font-sans text-2xl font-semibold tracking-tight text-black dark:text-white">
        Welcome to Ryan&apos;s Ramblings...
      </h1>
      <p className="p-4 text-lg">
        This is my blog where I share my thoughts on programming, technology,
        and networking. I plan to posts about some of the projects that I am
        working on and maybe make some tutorials about new things I have leaned
        or I wished I would have known when I started programming.
      </p>
    </>
  );
}

async function GetBlogPosts(cursor: number, pageSize = 3): Promise<BlogPost[]> {
  return await db
    .select()
    .from(blogPosts)
    .where(gt(blogPosts.id, cursor * pageSize - pageSize))
    .limit(pageSize)
    .orderBy(desc(blogPosts.updatedAt));
}
