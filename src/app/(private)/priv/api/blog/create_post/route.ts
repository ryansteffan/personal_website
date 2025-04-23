import { auth } from "@clerk/nextjs/server";
import { ZodError, type z } from "zod";
import createPostSchema from "~/lib/create_post_schema";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";
import { db } from "~/server/db";
import { blogPosts } from "~/server/db/schema";
import { NextResponse } from "next/server";
import type CreatePostResponse from "~/components/types/create_post_response";

export async function POST(request: Request) {
  await auth.protect();

  try {
    const data: z.infer<typeof createPostSchema> = createPostSchema.parse(
      await request.json(),
    );
    console.log("Post Created: ", data);

    const window = new JSDOM("").window;
    const purify = DOMPurify(window);
    const title = purify.sanitize(data.title);
    const author = purify.sanitize(data.author);
    const content = purify.sanitize(data.content);
    const date = new Date();

    const postID = await db
      .insert(blogPosts)
      .values({
        title: title,
        author: author,
        content: content,
        createdAt: date,
        updatedAt: date,
      })
      .returning({ postId: blogPosts.id });

    const responseData: CreatePostResponse = {
      message: "Post created successfully!",
      postId: postID[0]?.postId.toString(),
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Error creating post: ", error);
    if (error instanceof ZodError) {
      return new Response("Invalid Request!", { status: 400 });
    } else {
      return new Response(
        `There was an unknown error with the request: ${String(error)}`,
        {
          status: 500,
        },
      );
    }
  }
}
