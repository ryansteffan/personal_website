import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import BlogPost from "~/components/types/BlogPost";
import { db } from "~/server/db";
import { z } from "zod";

export const getPostScheme = z.object({
  postId: z.number().int().positive(),
});

export async function POST(request: Request) {
  await auth.protect();

  try {
    const data: z.infer<typeof getPostScheme> = getPostScheme.parse(
      await request.json(),
    );

    const post = await db.query.blogPosts.findFirst({
      where: (blogPosts, { eq }) => eq(blogPosts.id, data.postId),
    });

    if (!post) {
      return new Response("Post not found!", { status: 404 });
    }

    const responseData: BlogPost = {
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      author: post.author,
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Error fetching post: ", error);
    return new Response("Invalid Request!", { status: 400 });
  }
}
