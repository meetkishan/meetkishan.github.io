<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-list', () =>
  queryCollection('blog').where('draft', '=', false).order('date', 'DESC').all(),
)

const activeTag = ref<string | null>(null)
const tags = computed(() => {
  const set = new Set<string>()
  posts.value?.forEach((p) => p.tags?.forEach((t: string) => set.add(t)))
  return [...set].sort()
})
const filtered = computed(() =>
  activeTag.value ? posts.value?.filter((p) => p.tags?.includes(activeTag.value!)) : posts.value,
)

useSeoMeta({
  title: 'Blog',
  description: 'Thoughts, experiences and journey notes by Kishan Kachchhi.',
})
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-14">
    <h1 class="text-3xl font-extrabold tracking-tight">Blog</h1>
    <p class="mt-2 text-muted">Writing about my life, work and journey.</p>

    <div v-if="tags.length" class="mt-6 flex flex-wrap gap-2">
      <button
        class="rounded-full border px-3 py-1 text-sm transition-colors"
        :class="activeTag === null ? 'border-accent text-accent' : 'border-line text-muted hover:text-accent'"
        @click="activeTag = null"
      >
        All
      </button>
      <button
        v-for="tag in tags"
        :key="tag"
        class="rounded-full border px-3 py-1 text-sm transition-colors"
        :class="activeTag === tag ? 'border-accent text-accent' : 'border-line text-muted hover:text-accent'"
        @click="activeTag = tag"
      >
        {{ tag }}
      </button>
    </div>

    <div v-if="filtered?.length" class="mt-8 grid gap-6 md:grid-cols-3">
      <PostCard v-for="post in filtered" :key="post.path" :post="post" />
    </div>
    <p v-else class="mt-8 text-muted">No posts yet.</p>
  </div>
</template>
