const { z } = require('zod');

const bookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  isbn: z.string().min(10).max(17).optional(),
  genre: z.string().min(1),
  status: z.enum(['planned', 'reading', 'finished']).default('planned'),
  rating: z.number().int().min(1).max(5).optional(),
  startedAt: z.string().optional(),
  finishedAt: z.string().optional(),
  notes: z.string().max(2000).optional()
});

module.exports = { bookSchema };
