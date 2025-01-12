import * as z from 'zod';

export const blogSchema = z.object({
  title: z.string().min(3, {
    message: 'Title must be at least 3 characters long',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters long',
  }),
  imgUrl: z.string().url({
    message: 'Please enter an image',
  }),
  category: z.string({
    message: 'Please select a category',
  }),
  userId: z.string(),
});
