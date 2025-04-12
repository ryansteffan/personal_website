import Link from "next/link";
import BlogPost from "~/components/types/BlogPost";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { SelectRandomListElement } from "~/lib/utils";

export interface BlogCardProps {
  id: number;
  title: string;
  author: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const titleColors = [
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
  post: BlogCardProps;
}): React.ReactNode {
  return (
    <div key={post.id}>
      <Card className="mb-2 mt-2 bg-slate-900">
        <CardHeader>
          <CardTitle
            className={`text-xl ${SelectRandomListElement<string>(titleColors)}`}
          >
            {post.title}
          </CardTitle>
          <CardDescription className="">
            Author: {post.author} | Posted: {post.createdAt?.toDateString()} |
            Updated: {post.updatedAt?.toDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>{post.content.substring(0, 500)}...</CardContent>
        <CardFooter>
          <Link
            className="hover:text-blue-300"
            href={`/blog/posts/${post.id}/`}
          >
            Read full post...
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
