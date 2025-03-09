import { z } from 'zod';

export const Video4Schema = z.object({
  images: z.array(z.string()),
  username: z.string(),
  productName: z.string(),
  price: z.string(),
  type: z.number(),
});