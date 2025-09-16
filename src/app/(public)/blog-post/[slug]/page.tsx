import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import type BlogPost from "~/components/types/BlogPost";
import { db } from "~/server/db";
import { SelectRandomListElement } from "~/lib/utils";
import { titleColors } from "~/components/client/blog_card/blog_card";
import MarkdownComponent from "~/lib/markdown/generate_markdown";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import type { Metadata } from "next";

async function GetBlogPost(postId: number): Promise<BlogPost> {
  const blogPost = await db.query.blogPosts.findFirst({
    where: (blogPosts) => eq(blogPosts.id, postId),
  });

  return blogPost as BlogPost;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blogPost = await GetBlogPost(parseInt(slug));
  const description = blogPost.content.substring(0, 300) + "...";

  return {
    title: blogPost.title,
    description: description,
    openGraph: {
      title: blogPost.title,
      description: description,
    },
    authors: [{ name: blogPost.author }],
    keywords: ["blog", "ryan steffan", blogPost.title],
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const postId = parseInt(slug);

  const post = await GetBlogPost(postId);
  if (post === undefined) {
    console.log("Attempted to access non-existent post: ", postId);
    redirect("/not-found");
  }

  const domPurify = createDOMPurify(new JSDOM("").window);

  return (
    <>
      <div className="m-16" />
      <div className="flex flex-col items-center justify-center">
        <div className="m-4 w-4/5 rounded-md bg-slate-700 bg-opacity-40 p-4 text-black shadow-sm shadow-black dark:text-white md:mb-10 md:ml-40 md:mr-40 md:p-10">
          <h1
            className={`${SelectRandomListElement<string>(titleColors)} not_md mb-4 font-mono text-3xl font-bold`}
          >
            {domPurify.sanitize(post.title)}
          </h1>
          <p className="mb-4 font-mono text-sm">
            Author: {domPurify.sanitize(post.author)} | Posted:{" "}
            {domPurify.sanitize(post.createdAt?.toDateString())} | Updated:{" "}
            {domPurify.sanitize(post.updatedAt?.toDateString())}
          </p>
          <div className="w-full border-spacing-4 border-b border-slate-500" />
          <MarkdownComponent
            content={domPurify.sanitize(post.content)}
            className="mb-2 mt-2 rounded-lg bg-slate-900 p-4"
          />
          <div className="w-full border-spacing-4 border-b border-slate-500" />
        </div>
      </div>
    </>
  );
}
