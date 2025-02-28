import { z } from 'zod'

export const emailSchema = z.object({
  receiver: z.string().email(),
  subject: z.string().nonempty(),
  body: z.string().nonempty(),
})

export type Email = z.infer<typeof emailSchema>
