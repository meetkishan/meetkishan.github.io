<script setup lang="ts">
defineProps<{
  album: {
    path: string
    title: string
    date?: string
    location?: string
    cover?: string
    images?: { src: string; caption?: string }[]
  }
}>()
</script>

<template>
  <NuxtLink
    :to="album.path"
    class="group relative block overflow-hidden rounded-xl border border-line bg-card transition-shadow hover:shadow-lg"
  >
    <img
      v-if="album.cover || album.images?.length"
      :src="album.cover || album.images![0]!.src"
      :alt="album.title"
      class="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div class="p-4">
      <h3 class="font-semibold group-hover:text-accent">{{ album.title }}</h3>
      <p class="mt-1 text-xs text-muted">
        <span v-if="album.location">{{ album.location }}</span>
        <span v-if="album.location && album.images?.length"> · </span>
        <span v-if="album.images?.length">{{ album.images.length }} photos</span>
      </p>
    </div>
  </NuxtLink>
</template>
