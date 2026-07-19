<script setup lang="ts">
import { profile, metrics, projects } from '~/data/profile'

const { data: posts } = await useAsyncData('home-posts', () =>
  queryCollection('blog').where('draft', '=', false).order('date', 'DESC').limit(3).all(),
)
const { data: albums } = await useAsyncData('home-albums', () =>
  queryCollection('gallery').where('draft', '=', false).order('date', 'DESC').limit(3).all(),
)

const featuredProjects = projects.filter((p) => p.featured)

useSeoMeta({
  description: `${profile.name} — ${profile.role} in ${profile.location}. ${profile.subtitle}`,
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="mx-auto grid max-w-5xl items-center gap-10 px-4 py-16 md:grid-cols-[3fr_2fr] md:py-24">
      <div>
        <p class="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
          {{ profile.role }}
        </p>
        <h1 class="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
          {{ profile.tagline }}
        </h1>
        <p class="mt-4 text-lg text-muted">{{ profile.subtitle }}</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink
            to="/blog"
            class="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-base transition-opacity hover:opacity-90"
          >
            Read the Blog
          </NuxtLink>
          <NuxtLink
            to="/portfolio"
            class="rounded-lg border border-line px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
          >
            View Portfolio
          </NuxtLink>
        </div>
      </div>
      <div class="justify-self-center">
        <img
          :src="profile.photo"
          :alt="`${profile.name} - portrait`"
          class="h-56 w-56 rounded-full border-4 border-line object-cover shadow-lg md:h-64 md:w-64"
        />
      </div>
    </section>

    <!-- Metrics -->
    <section class="border-y border-line bg-soft">
      <div class="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 py-10 text-center md:grid-cols-4">
        <div v-for="m in metrics" :key="m.label">
          <div class="text-3xl font-extrabold text-accent">{{ m.value }}</div>
          <div class="mt-1 text-sm text-muted">{{ m.label }}</div>
        </div>
      </div>
    </section>

    <!-- Latest posts -->
    <section class="mx-auto max-w-5xl px-4 py-16">
      <div class="mb-6 flex items-baseline justify-between">
        <h2 class="text-2xl font-bold">Latest Writing</h2>
        <NuxtLink to="/blog" class="text-sm font-medium text-accent hover:underline">All posts →</NuxtLink>
      </div>
      <div v-if="posts?.length" class="grid gap-6 md:grid-cols-3">
        <PostCard v-for="post in posts" :key="post.path" :post="post" />
      </div>
      <p v-else class="text-muted">First posts are on their way.</p>
    </section>

    <!-- Gallery teaser -->
    <section class="border-t border-line bg-soft">
      <div class="mx-auto max-w-5xl px-4 py-16">
        <div class="mb-6 flex items-baseline justify-between">
          <h2 class="text-2xl font-bold">Travel Gallery</h2>
          <NuxtLink to="/gallery" class="text-sm font-medium text-accent hover:underline">All albums →</NuxtLink>
        </div>
        <div v-if="albums?.length" class="grid gap-6 md:grid-cols-3">
          <AlbumCard v-for="album in albums" :key="album.path" :album="album" />
        </div>
        <p v-else class="text-muted">Albums coming soon.</p>
      </div>
    </section>

    <!-- Featured projects -->
    <section class="mx-auto max-w-5xl px-4 py-16">
      <div class="mb-6 flex items-baseline justify-between">
        <h2 class="text-2xl font-bold">Featured Projects</h2>
        <NuxtLink to="/portfolio" class="text-sm font-medium text-accent hover:underline">Full portfolio →</NuxtLink>
      </div>
      <div class="grid gap-6 md:grid-cols-3">
        <ProjectCard v-for="project in featuredProjects" :key="project.name" :project="project" />
      </div>
    </section>
  </div>
</template>
