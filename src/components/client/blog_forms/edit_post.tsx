"use client";
import editPostSchema from "~/lib/edit_post_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import type EditPostResponse from "~/components/types/edit_post_response";
import type BlogPost from "~/components/types/BlogPost";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { useEffect, useState } from "react";
import { type PostsIds } from "~/components/types/post_ids_response";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";

export default function EditPostForm() {
  const router = useRouter();
  const [posts, setPosts] = useState<PostsIds[]>([]);
  const [postSelectionOpen, setPostSelectionOpen] = useState(false);

  useEffect(() => {
    fetch("/priv/api/blog/get_post_ids")
      .then(async (response) => {
        setPosts((await response.json()) as PostsIds[]);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  // 1. Define your form.
  const form = useForm<z.infer<typeof editPostSchema>>({
    resolver: zodResolver(editPostSchema),
    defaultValues: {
      title: "",
      author: "",
      content: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof editPostSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    try {
      // Update to be a patch request
      const result = await axios.patch<EditPostResponse>(
        "/priv/api/blog/edit_post",
        values,
      );

      console.log("Post Updated: ", result.data);

      if (result.status === 200) {
        const postId = result.data.postId;

        if (postId === undefined) {
          router.push("/priv/management/blog/failure");
        }
        router.push(`/blog-post/${postId}`);
      } else {
        console.log("Post Update Failed!");
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
          name="postId"
          render={({ field }) => (
            <FormItem className="mb-4 flex flex-col">
              <FormLabel>Post to Edit...</FormLabel>
              <Popover
                open={postSelectionOpen}
                onOpenChange={setPostSelectionOpen}
              >
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between bg-transparent hover:bg-slate-500",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? posts.find((post) => post.postId === field.value)
                            ?.postTitle
                        : "Select Post to Edit..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command className="bg-slate-900">
                    <CommandInput placeholder="Select a Post to Edit..." />
                    <CommandList>
                      <CommandEmpty>Not Posts Found.</CommandEmpty>
                      <CommandGroup>
                        {posts.map((post) => (
                          <CommandItem
                            value={post.postId as unknown as string}
                            key={post.postId}
                            className="data-[selected=true]:!bg-slate-500"
                            onSelect={async () => {
                              form.setValue("postId", post.postId);
                              setPostSelectionOpen(false);
                              const existingPost = await fetchPost(post.postId);
                              form.reset({
                                postId: post.postId,
                                title: existingPost.title,
                                author: existingPost.author,
                                content: existingPost.content,
                              });
                            }}
                          >
                            {post.postTitle}
                            <Check
                              className={cn(
                                "ml-auto",
                                post.postId === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  className="h-48 resize-y"
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
          Update Post
        </Button>
      </form>
    </Form>
  );
}

async function fetchPost(postId: number) {
  const response = await fetch("/priv/api/blog/get_post", {
    method: "POST",
    body: JSON.stringify({ postId: postId }),
  });

  return (await response.json()) as Promise<BlogPost>;
}
