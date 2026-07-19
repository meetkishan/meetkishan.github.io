<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(`blog-${route.path}`, () =>
  queryCollection('blog').path(route.path).first(),
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

const { data: surround } = await useAsyncData(`blog-surround-${route.path}`, () =>
  queryCollectionItemSurroundings('blog', route.path, { fields: ['title'] }),
)

function formatDate(date?: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

useSeoMeta({
  title: post.value.title,
  description: post.value.description,
  ogTitle: post.value.title,
  ogDescription: post.value.description,
  ogImage: post.value.cover,
})
</script>

<template>
  <article v-if="post" class="mx-auto max-w-3xl px-4 py-14">
    <header class="mb-8">
      <time class="text-sm text-muted">{{ formatDate(post.date) }}</time>
      <h1 class="mt-2 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
        {{ post.title }}
      </h1>
      <p v-if="post.description" class="mt-3 text-lg text-muted">{{ post.description }}</p>
      <div v-if="post.tags?.length" class="mt-4 flex flex-wrap gap-1.5">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="rounded-full border border-line px-2 py-0.5 text-xs text-muted"
        >
          {{ tag }}
        </span>
      </div>
    </header>

    <img v-if="post.cover" :src="post.cover" :alt="post.title" class="mb-8 w-full rounded-xl" />

    <ContentRenderer
      :value="post"
      class="prose prose-lg max-w-none dark:prose-invert prose-a:text-accent prose-headings:tracking-tight"
    />

    <nav v-if="surround?.some(Boolean)" class="mt-12 flex justify-between gap-4 border-t border-line pt-6 text-sm">
      <NuxtLink v-if="surround?.[0]" :to="surround[0].path" class="text-accent hover:underline">
        ← {{ surround[0].title }}
      </NuxtLink>
      <span v-else />
      <NuxtLink v-if="surround?.[1]" :to="surround[1].path" class="text-right text-accent hover:underline">
        {{ surround[1].title }} →
      </NuxtLink>
    </nav>
  </article>
</template>
