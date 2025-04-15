import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import type BlogPost from "~/components/types/BlogPost";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { db } from "~/server/db";
import { blogPosts } from "~/server/db/schema";
import { SelectRandomListElement } from "~/lib/utils";
import { titleColors } from "~/components/client/blog_card/blog_card";

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

  return (
    <>
      <div className="m-16" />
      <div className="flex flex-col items-center justify-center">
        <div className="m-4 rounded-md bg-slate-700 bg-opacity-40 p-4 text-black shadow-sm shadow-black dark:text-white md:mb-10 md:ml-40 md:mr-40 md:p-10">
          <h1
            className={`${SelectRandomListElement<string>(titleColors)} mb-4 font-mono text-3xl font-bold`}
          >
            {post.title}
          </h1>
          <p className="mb-4 font-mono text-sm">
            Author: {post.author} | Posted: {post.createdAt?.toDateString()} |
            Updated: {post.updatedAt?.toDateString()}
          </p>
          <div className="w-full border-spacing-4 border-b border-slate-500" />
          <div className="mb-4 mt-4 min-h-40 min-w-full">{post.content}</div>
          <div className="w-full border-spacing-4 border-b border-slate-500" />
        </div>
      </div>
    </>
  );
}

async function GetBlogPost(postId: number): Promise<BlogPost> {
  const blogPost = await db.query.blogPosts.findFirst({
    where: (blogPosts) => eq(blogPosts.id, postId),
  });

  return blogPost as BlogPost;
}
