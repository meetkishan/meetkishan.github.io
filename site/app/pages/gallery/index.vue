<script setup lang="ts">
const { data: albums } = await useAsyncData('gallery-list', () =>
  queryCollection('gallery').where('draft', '=', false).order('date', 'DESC').all(),
)

useSeoMeta({
  title: 'Gallery',
  description: 'Travel photo albums and stories by Kishan Kachchhi.',
})
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-14">
    <h1 class="text-3xl font-extrabold tracking-tight">Gallery</h1>
    <p class="mt-2 text-muted">Travel albums, photos and stories.</p>

    <div v-if="albums?.length" class="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      <AlbumCard v-for="album in albums" :key="album.path" :album="album" />
    </div>
    <p v-else class="mt-8 text-muted">No albums yet.</p>
  </div>
</template>
