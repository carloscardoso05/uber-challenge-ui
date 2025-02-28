import { z } from 'zod'

export const emailSchema = z.object({
  receiver: z.string().email(),
  subject: z.string().default(''),
  body: z.string().default(''),
})

export type Email = z.infer<typeof emailSchema>
