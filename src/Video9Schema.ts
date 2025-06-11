import { z } from 'zod';

export const Video9Schema = z.object({
  images: z.array(z.string()).min(1).describe("Array of image URLs (will be normalized to exactly 4 images)"),
  username: z.string(),
  productName: z.string(),
  price: z.string(),
  type: z.number(),
}); 