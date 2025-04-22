import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { PostsIds } from "~/components/types/post_ids_response";
import { db } from "~/server/db";
import { blogPosts } from "~/server/db/schema";

export async function GET(request: Request) {
  await auth.protect();

  const posts: PostsIds[] = await db
    .select({ postId: blogPosts.id, postTitle: blogPosts.title })
    .from(blogPosts);

  return NextResponse.json(posts, {
    status: 200,
  });
}
