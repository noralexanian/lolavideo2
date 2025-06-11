import { z } from 'zod';

export const Video8Schema = z.object({
  images: z.array(z.string()).min(1).describe("Array of image URLs (will be normalized to exactly 5 images)"),
  username: z.string(),
  productName: z.string(),
  price: z.string(),
  type: z.number(),
}); 