import { TaskValidator } from 'components/Task/Task';
import { z } from 'zod';

export const ListValidator = z.object({
  id: z.string(),
  name: z.string(),
  tasks: z.array(TaskValidator),
});

export type List = z.infer<typeof ListValidator>;
