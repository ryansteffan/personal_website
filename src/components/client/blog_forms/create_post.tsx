"use client";
import createPostSchema from "~/lib/create_post_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import PostResponse from "~/components/types/create_post_response";

export default function CreatePostForm() {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      author: "",
      content: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof createPostSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const data = { ...values, date: new Date() };
    try {
      const result = await axios.post<PostResponse>(
        "/priv/api/blog/create_post",
        data,
      );

      if (result.status === 200) {
        const postId = result.data.postId;

        if (postId === undefined) {
          router.push("/priv/management/blog/failure");
        }

        router.push(`/blog/${postId}`);
      } else {
        console.log("Post Creation Failed!");
      }
    } catch {
      router.push("/priv/management/blog/failure");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Author" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Content"
                  className="h-52 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="mb-4 bg-slate-700 text-white hover:bg-slate-500"
          type="submit"
        >
          Create Post
        </Button>
      </form>
    </Form>
  );
}
