import { z } from "zod";

const contactFormScheme = z
  .object({
    name: z.string().nonempty().min(2).max(50),
    email: z.string().email(),
    message: z.string().nonempty().min(10).max(500),
    consent: z.boolean().default(false),
  })
  .strict();

export default contactFormScheme;
