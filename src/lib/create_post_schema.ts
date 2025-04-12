import { z } from "zod";

const createPostSchema = z.object({
  title: z.string().nonempty().min(2).max(50),
  author: z.string().nonempty().min(2).max(50),
  content: z.string().nonempty().min(10).max(2000),
});

export default createPostSchema;
