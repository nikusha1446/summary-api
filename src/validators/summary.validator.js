import z from 'zod';

export const createSummarySchema = z.object({
  documentId: z.string().min(1, 'Document ID is required'),
  style: z.enum(['brief', 'detailed', 'bullet-points'], {
    errorMap: () => ({
      message: 'Style must be one of: brief, detailed, bullet-points',
    }),
  }),
});
