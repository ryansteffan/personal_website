"use client";

import * as React from "react";
import axios from "axios";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { PostsIds } from "../types/post_ids_response";

export function PostsCombobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [posts, setPosts] = React.useState<PostsIds[]>([]);

  React.useEffect(() => {
    fetch("/priv/api/blog/get_post_ids")
      .then(async (response) => {
        setPosts((await response.json()) as PostsIds[]);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? posts.find((post) => post.postId.toString() === value)?.postTitle
            : "Select Post to Edit..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Select Post to Edit..." />
          <CommandList>
            <CommandEmpty>No Post Found.</CommandEmpty>
            <CommandGroup>
              {posts.map((post) => (
                <CommandItem
                  key={post.postId}
                  value={post.postId as unknown as string}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === (post.postId as unknown as string)
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {post.postTitle}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
