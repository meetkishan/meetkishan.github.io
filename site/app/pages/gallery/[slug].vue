<script setup lang="ts">
const route = useRoute()

const { data: album } = await useAsyncData(`gallery-${route.path}`, () =>
  queryCollection('gallery').path(route.path).first(),
)

if (!album.value) {
  throw createError({ statusCode: 404, statusMessage: 'Album not found', fatal: true })
}

const lightboxIndex = ref<number | null>(null)

function formatDate(date?: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
}

function next() {
  if (lightboxIndex.value === null || !album.value?.images?.length) return
  lightboxIndex.value = (lightboxIndex.value + 1) % album.value.images.length
}
function prev() {
  if (lightboxIndex.value === null || !album.value?.images?.length) return
  lightboxIndex.value = (lightboxIndex.value - 1 + album.value.images.length) % album.value.images.length
}

useSeoMeta({
  title: album.value.title,
  description: album.value.description,
  ogImage: album.value.cover || album.value.images?.[0]?.src,
})
</script>

<template>
  <div v-if="album" class="mx-auto max-w-5xl px-4 py-14">
    <header class="mb-8">
      <time class="text-sm text-muted">{{ formatDate(album.date) }}</time>
      <h1 class="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">{{ album.title }}</h1>
      <p v-if="album.location" class="mt-2 text-muted">📍 {{ album.location }}</p>
    </header>

    <!-- Story body (markdown) -->
    <ContentRenderer
      :value="album"
      class="prose max-w-none dark:prose-invert prose-a:text-accent"
    />

    <!-- Photo grid -->
    <div v-if="album.images?.length" class="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
      <button
        v-for="(img, i) in album.images"
        :key="img.src"
        class="group relative overflow-hidden rounded-lg"
        @click="lightboxIndex = i"
      >
        <img
          :src="img.src"
          :alt="img.caption || `${album.title} photo ${i + 1}`"
          loading="lazy"
          class="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105 md:h-52"
        />
      </button>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="lightboxIndex !== null && album.images?.[lightboxIndex]"
        class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4"
        @click.self="lightboxIndex = null"
      >
        <img
          :src="album.images[lightboxIndex]!.src"
          :alt="album.images[lightboxIndex]!.caption || album.title"
          class="max-h-[80vh] max-w-full rounded-lg object-contain"
        />
        <p v-if="album.images[lightboxIndex]!.caption" class="mt-3 text-sm text-white/80">
          {{ album.images[lightboxIndex]!.caption }}
        </p>
        <div class="mt-4 flex items-center gap-6 text-white">
          <button class="rounded-full border border-white/30 px-4 py-1.5 hover:bg-white/10" @click="prev">←</button>
          <span class="text-sm text-white/60">{{ lightboxIndex + 1 }} / {{ album.images.length }}</span>
          <button class="rounded-full border border-white/30 px-4 py-1.5 hover:bg-white/10" @click="next">→</button>
          <button class="rounded-full border border-white/30 px-4 py-1.5 hover:bg-white/10" @click="lightboxIndex = null">✕</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>
