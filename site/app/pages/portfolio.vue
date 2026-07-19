<script setup lang="ts">
import { profile, about, skills, experience, projects } from '~/data/profile'

const featured = projects.filter((p) => p.featured)
const others = projects.filter((p) => !p.featured)

useSeoMeta({
  title: 'Portfolio',
  description: `${profile.name} — ${profile.role} in ${profile.location}. Experience, skills and featured SaaS projects.`,
})
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-14">
    <h1 class="text-3xl font-extrabold tracking-tight">Portfolio</h1>
    <p class="mt-2 text-muted">{{ profile.role }} · {{ profile.location }}</p>

    <!-- About -->
    <section class="mt-12">
      <h2 class="mb-4 text-2xl font-bold">About Me</h2>
      <div class="grid gap-6 md:grid-cols-2">
        <div class="rounded-xl border border-line bg-card p-6">
          <h3 class="mb-2 font-semibold text-accent">Why Germany</h3>
          <p class="text-sm leading-relaxed text-muted">{{ about.whyGermany }}</p>
        </div>
        <div class="rounded-xl border border-line bg-card p-6">
          <h3 class="mb-2 font-semibold text-accent">How I Build Products</h3>
          <ul class="space-y-1 text-sm leading-relaxed text-muted">
            <li v-for="line in about.howIBuild" :key="line">{{ line }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section class="mt-14">
      <h2 class="mb-4 text-2xl font-bold">Technical Skills</h2>
      <div class="grid gap-6 md:grid-cols-3">
        <div v-for="group in skills" :key="group.category" class="rounded-xl border border-line bg-card p-6">
          <h3 class="mb-3 font-semibold">{{ group.category }}</h3>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="item in group.items"
              :key="item"
              class="rounded-full border border-line px-2.5 py-1 text-xs text-muted"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience -->
    <section class="mt-14">
      <h2 class="mb-4 text-2xl font-bold">Professional Experience</h2>
      <div class="space-y-6 border-l-2 border-line pl-6">
        <div v-for="job in experience" :key="job.period" class="relative">
          <span class="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-accent" />
          <div class="text-xs font-semibold uppercase tracking-wide text-accent">{{ job.period }}</div>
          <h3 class="mt-1 font-semibold">{{ job.title }}</h3>
          <div class="text-sm text-muted">{{ job.company }}</div>
          <ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
            <li v-for="point in job.points" :key="point">{{ point }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <section class="mt-14">
      <h2 class="mb-4 text-2xl font-bold">Featured Projects</h2>
      <div class="grid gap-6 md:grid-cols-3">
        <ProjectCard v-for="project in featured" :key="project.name" :project="project" />
      </div>
      <h2 class="mb-4 mt-10 text-2xl font-bold">Other Notable Projects</h2>
      <div class="grid gap-6 md:grid-cols-3">
        <ProjectCard v-for="project in others" :key="project.name" :project="project" />
      </div>
    </section>

    <!-- Resume + contact -->
    <section id="contact" class="mt-14 rounded-xl border border-line bg-card p-8 text-center">
      <h2 class="text-2xl font-bold">Get In Touch</h2>
      <p class="mt-2 text-sm text-muted">
        {{ profile.location }} ·
        <a :href="`mailto:${profile.email}`" class="text-accent hover:underline">{{ profile.email }}</a> ·
        <a :href="`tel:${profile.phone.replace(/\s/g, '')}`" class="text-accent hover:underline">{{ profile.phone }}</a>
      </p>
      <div class="mt-6 flex flex-wrap justify-center gap-3">
        <a
          :href="profile.resume.en"
          target="_blank"
          rel="noopener"
          class="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-base hover:opacity-90"
        >
          English Resume PDF
        </a>
        <a
          :href="profile.resume.de"
          target="_blank"
          rel="noopener"
          class="rounded-lg border border-line px-5 py-2.5 text-sm font-semibold hover:border-accent hover:text-accent"
        >
          German Resume PDF
        </a>
      </div>
    </section>
  </div>
</template>
