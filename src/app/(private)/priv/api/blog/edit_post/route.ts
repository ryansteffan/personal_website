import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import EditPostResponse from "~/components/types/edit_post_response";
import editPostSchema from "~/lib/edit_post_schema";
import { db } from "~/server/db";
import { blogPosts } from "~/server/db/schema";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

export async function PATCH(request: Request) {
  await auth.protect();

  try {
    const data: z.infer<typeof editPostSchema> = editPostSchema.parse(
      await request.json(),
    );

    const window = new JSDOM("").window;
    const purify = DOMPurify(window);
    const title = purify.sanitize(data.title);
    const author = purify.sanitize(data.author);
    const content = purify.sanitize(data.content);
    const postId = parseInt(purify.sanitize(data.postId.toString()));
    const updatedAt = new Date();

    console.log("Post Edited: ", { title, author, content, postId });

    await db
      .update(blogPosts)
      .set({
        title: title,
        author: author,
        content: content,
        updatedAt: updatedAt,
      })
      .where(eq(blogPosts.id, postId));

    console.log("Post Updated...");

    const response: EditPostResponse = {
      message: "Updated successfully!",
      postId: data.postId.toString(),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error updating post: ", error);
    return new Response("Invalid Request!", { status: 400 });
  }
}
