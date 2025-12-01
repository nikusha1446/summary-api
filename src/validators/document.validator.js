import { z } from 'zod';

export const createDocumentSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
});

export const updateDocumentSchema = z
  .object({
    title: z.string().optional(),
    content: z.string().min(1, 'Content cannot be empty').optional(),
  })
  .refine((data) => data.title !== undefined || data.content !== undefined, {
    message: 'At least one field (title or content) must be provided',
  });
