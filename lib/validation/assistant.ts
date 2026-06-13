import { z } from 'zod';

export const assistantRequestSchema = z
  .object({
    prompt: z.string().trim().min(1).max(2000),
    feature: z.enum(['thinking', 'search', 'guide']).default('guide'),
  })
  .strict();
