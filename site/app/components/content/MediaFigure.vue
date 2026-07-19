<script setup lang="ts">
// MDC usage inside markdown:
// ::media-figure{src="/images/photo.jpg" caption="A caption"}
// ::
defineProps<{ src: string; caption?: string; alt?: string }>()
</script>

<template>
  <figure class="not-prose my-6">
    <img :src="src" :alt="alt || caption || ''" loading="lazy" class="w-full rounded-xl" />
    <figcaption v-if="caption" class="mt-2 text-center text-sm text-muted">{{ caption }}</figcaption>
  </figure>
</template>
