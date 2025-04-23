import { z } from "zod";

const getPostScheme = z.object({
  postId: z.number().int().positive(),
});

export default getPostScheme;
