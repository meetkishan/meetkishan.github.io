import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(), // ISO date, e.g. 2026-07-19
        tags: z.array(z.string()).default([]),
        cover: z.string().optional(),
        draft: z.boolean().default(false),
      }),
    }),
    gallery: defineCollection({
      type: 'page',
      source: 'gallery/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.string(),
        location: z.string().optional(),
        cover: z.string().optional(),
        images: z
          .array(
            z.object({
              src: z.string(),
              caption: z.string().optional(),
            }),
          )
          .default([]),
        draft: z.boolean().default(false),
      }),
    }),
  },
})
