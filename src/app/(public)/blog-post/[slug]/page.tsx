import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import type BlogPost from "~/components/types/BlogPost";
import { db } from "~/server/db";
import { SelectRandomListElement } from "~/lib/utils";
import { titleColors } from "~/components/client/blog_card/blog_card";
import { Remarkable } from "remarkable";
import hljs from "highlight.js";

// CSS imports for markdown content.
import "./blog-post.css";
import "highlight.js/styles/monokai-sublime.css";

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

  const markdownParser = new Remarkable("full", {
    html: true,
    xhtmlOut: true,
    breaks: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (err) {
          console.log("Error highlighting code: ", err);
        }
      }

      return "";
    },
  });

  console.log("Post: ", post);

  const htmlContent = {
    __html: markdownParser.render(post.content),
  } as {
    __html: string;
  };

  return (
    <>
      <div className="m-16" />
      <div className="flex flex-col items-center justify-center">
        <div className="m-4 w-4/5 rounded-md bg-slate-700 bg-opacity-40 p-4 text-black shadow-sm shadow-black dark:text-white md:mb-10 md:ml-40 md:mr-40 md:p-10">
          <h1
            className={`${SelectRandomListElement<string>(titleColors)} not_md mb-4 font-mono text-3xl font-bold`}
          >
            {post.title}
          </h1>
          <p className="mb-4 font-mono text-sm">
            Author: {post.author} | Posted: {post.createdAt?.toDateString()} |
            Updated: {post.updatedAt?.toDateString()}
          </p>
          <div className="w-full border-spacing-4 border-b border-slate-500" />
          <div className="mb-4 mt-4" dangerouslySetInnerHTML={htmlContent} />
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
