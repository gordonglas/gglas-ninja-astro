import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Not using "pubDate", because Obsidian always interprets it as a
    // date with format yyyy-mm-dd, which javascript interprets wrongly.
    // See: https://stackoverflow.com/questions/7556591/
    // By changing the name to something else (pubDateString in this case),
    // Obsidian won't overwrite the format we choose (yyyy/mm/dd).
    pubDateString: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    published: z.boolean(),
  }),
});

export const collections = { blog };
