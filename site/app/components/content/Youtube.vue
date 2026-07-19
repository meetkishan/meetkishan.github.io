<script setup lang="ts">
// MDC usage inside markdown:
// ::youtube{id="oLqO7zBwVyE"}
// ::
defineProps<{ id: string; title?: string }>()
</script>

<template>
  <div class="not-prose my-6 aspect-video overflow-hidden rounded-xl border border-line">
    <iframe
      :src="`https://www.youtube-nocookie.com/embed/${id}`"
      :title="title || 'YouTube video'"
      class="h-full w-full"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
</template>
