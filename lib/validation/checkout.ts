import { z } from 'zod';

export const checkoutSchema = z
  .object({
    items: z
      .array(
        z
          .object({
            productId: z.string().cuid(),
            quantity: z.number().int().min(1).max(1000),
          })
          .strict(),
      )
      .min(1)
      .max(100),
    customer: z
      .object({
        email: z.string().email(),
        name: z.string().trim().min(2).max(120),
      })
      .strict(),
  })
  .strict();

export type CheckoutInput = z.infer<typeof checkoutSchema>;
