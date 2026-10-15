import {z} from 'zod';

export const studentContextSchema = z.object({
  language: z.string().max(30).optional(),
  level: z.enum(['unknown', 'beginner', 'intermediate', 'advanced']).optional(),
  subjects: z.array(z.string().max(80)).max(20).optional(),
  learningStyle: z.string().max(80).optional(),
  strengths: z.array(z.string().max(120)).max(20).optional(),
  struggles: z.array(z.string().max(120)).max(20).optional(),
  topicsCovered: z.array(z.string().max(120)).max(30).optional(),
  isDeafMode: z.boolean().optional(),
  isVisionAssist: z.boolean().optional(),
  triageComplete: z.boolean().optional(),
}).strict();

/** First message of a live session; also the body of POST /api/live/token. */
export const liveStartSchema = z.object({
  context: studentContextSchema.optional(),
  memory: z.string().max(4_000).optional(),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    text: z.string().max(2_000),
  }).strict()).max(12).optional(),
}).strict();

export type LiveStart = z.infer<typeof liveStartSchema>;
