<script setup lang="ts">
defineProps<{
  post: {
    path: string
    title: string
    description?: string
    date?: string
    tags?: string[]
    cover?: string
  }
}>()

function formatDate(date?: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>

<template>
  <NuxtLink
    :to="post.path"
    class="group flex flex-col overflow-hidden rounded-xl border border-line bg-card transition-shadow hover:shadow-lg"
  >
    <img v-if="post.cover" :src="post.cover" :alt="post.title" class="h-40 w-full object-cover" />
    <div class="flex flex-1 flex-col p-5">
      <time class="text-xs text-muted">{{ formatDate(post.date) }}</time>
      <h3 class="mt-1 font-semibold group-hover:text-accent">{{ post.title }}</h3>
      <p v-if="post.description" class="mt-2 line-clamp-3 text-sm text-muted">{{ post.description }}</p>
      <div v-if="post.tags?.length" class="mt-auto flex flex-wrap gap-1.5 pt-3">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="rounded-full border border-line px-2 py-0.5 text-xs text-muted"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
