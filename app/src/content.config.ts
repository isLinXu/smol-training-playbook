import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const enChapters = defineCollection({
  loader: glob({ pattern: 'en/*/[a-z]*.md', base: './src/content' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const zhChapters = defineCollection({
  loader: glob({ pattern: 'zh/*/[a-z]*.md', base: './src/content' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = {
  'en': enChapters,
  'zh': zhChapters,
};
