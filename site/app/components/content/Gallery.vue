<script setup lang="ts">
// MDC usage inside markdown:
// ::gallery{:images='["/images/a.jpg", "/images/b.jpg"]'}
// ::
const props = defineProps<{ images: string[]; cols?: number | string }>()
const gridClass = computed(() => {
  const n = Number(props.cols) || 3
  return { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' }[n] || 'md:grid-cols-3'
})
</script>

<template>
  <div class="not-prose my-6 grid grid-cols-2 gap-3" :class="gridClass">
    <img
      v-for="src in images"
      :key="src"
      :src="src"
      alt=""
      loading="lazy"
      class="h-40 w-full rounded-lg object-cover md:h-48"
    />
  </div>
</template>
