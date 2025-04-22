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

interface PostsComboboxProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function PostsCombobox({ value, onChange }: PostsComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [posts, setPosts] = React.useState<PostsIds[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  // Use internal state if no external state is provided
  const [internalValue, setInternalValue] = React.useState("");

  // Use the provided value from form or fall back to internal state
  const currentValue = value ?? internalValue;

  React.useEffect(() => {
    fetch("/priv/api/blog/get_post_ids")
      .then(async (response) => {
        setPosts((await response.json()) as PostsIds[]);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  // Filter posts based on search term
  const filteredPosts = React.useMemo(() => {
    if (!searchTerm) return posts;
    return posts.filter((post) =>
      post.postTitle.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [posts, searchTerm]);

  // Handler for selection
  const handleSelect = (selectedValue: string) => {
    console.log("Selected:", selectedValue);

    // Update internal state
    setInternalValue(selectedValue);

    // Call onChange if provided (for react-hook-form)
    if (onChange) {
      onChange(selectedValue);
    }

    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {currentValue
            ? posts.find((post) => post.postId.toString() === currentValue)
                ?.postTitle
            : "Select Post to Edit..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search posts..."
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <CommandList>
            <CommandEmpty>No Post Found.</CommandEmpty>
            <CommandGroup>
              {filteredPosts.map((post) => (
                <CommandItem
                  key={post.postId}
                  value={post.postId.toString()}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentValue === post.postId.toString()
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
