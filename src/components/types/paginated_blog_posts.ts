import type BlogPost from "./BlogPost";

export default interface PaginatedBlogPosts {
  posts: BlogPost[];
  totalPosts: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number | null;
  previousPage: number | null;
}
