import Link from "next/link";
import type BlogPost from "~/components/types/BlogPost";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import MarkdownComponent from "~/lib/markdown/generate_markdown";
import { SelectRandomListElement } from "~/lib/utils";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

export const titleColors = [
  "text-blue-300",
  "text-green-300",
  "text-orange-300",
  "text-purple-300",
  "text-red-300",
  "text-yellow-300",
  "text-pink-300",
  "text-teal-300",
  "text-cyan-300",
];

export default function BlogCard({
  post,
}: {
  post: BlogPost;
}): React.ReactNode {
  const domPurify = createDOMPurify(new JSDOM("").window);

  return (
    <Card className="mb-2 mt-2 min-w-96 bg-slate-900">
      <CardHeader>
        <CardTitle
          className={`font-mono text-xl ${SelectRandomListElement<string>(titleColors)}`}
        >
          {post.title}
        </CardTitle>
        <CardDescription className="font-mono">
          Author: {domPurify.sanitize(post.author)} | Posted:{" "}
          {domPurify.sanitize(post.createdAt?.toDateString())} | Updated:{" "}
          {domPurify.sanitize(post.updatedAt?.toDateString())}
        </CardDescription>
        <div className="w-full border-spacing-4 border-b border-slate-500" />
      </CardHeader>
      <CardContent>
        <MarkdownComponent
          content={`${domPurify.sanitize(post.content.substring(0, 300))}...`}
        />
      </CardContent>
      <CardFooter>
        <Link
          className="hover:text-blue-300"
          href={`/blog-post/${domPurify.sanitize(post.id.toString())}/`}
        >
          Read full post...
        </Link>
      </CardFooter>
    </Card>
  );
}
