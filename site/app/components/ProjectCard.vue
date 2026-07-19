<script setup lang="ts">
defineProps<{
  project: {
    name: string
    image: string
    metric: string
    description: string
    tech: string[]
    url: string
  }
}>()
</script>

<template>
  <div class="flex flex-col overflow-hidden rounded-xl border border-line bg-card transition-shadow hover:shadow-lg">
    <img :src="project.image" :alt="project.name" class="h-40 w-full object-cover object-top" />
    <div class="flex flex-1 flex-col p-5">
      <h3 class="font-semibold">{{ project.name }}</h3>
      <p class="mt-1 text-xs font-medium text-accent">{{ project.metric }}</p>
      <p class="mt-2 text-sm text-muted">{{ project.description }}</p>
      <div class="mt-3 flex flex-wrap gap-1.5">
        <span
          v-for="t in project.tech"
          :key="t"
          class="rounded-full border border-line px-2 py-0.5 text-xs text-muted"
        >
          {{ t }}
        </span>
      </div>
      <a
        :href="project.url"
        target="_blank"
        rel="noopener"
        class="mt-auto pt-4 text-sm font-medium text-accent hover:underline"
      >
        View Project →
      </a>
    </div>
  </div>
</template>
