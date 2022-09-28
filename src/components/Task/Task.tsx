import { z } from 'zod';

export const TaskValidator = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export type Task = z.infer<typeof TaskValidator>;
