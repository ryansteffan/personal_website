import { z } from "zod";

const editPostSchema = z.object({
  postId: z.string().nonempty(),
  title: z.string().nonempty().min(2).max(50),
  author: z.string().nonempty().min(2).max(50),
  content: z.string().nonempty().min(10).max(10000),
});

export default editPostSchema;
