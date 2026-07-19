<script setup lang="ts">
import { profile } from '~/data/profile'
</script>

<template>
  <footer class="border-t border-line bg-soft">
    <div class="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 text-center">
      <div class="flex gap-5">
        <a v-for="s in profile.socials" :key="s.url" :href="s.url" target="_blank" rel="noopener"
          class="text-sm font-medium text-muted transition-colors hover:text-accent">
          {{ s.label }}
        </a>
      </div>
      <p class="text-xs text-muted">
        © {{ new Date().getFullYear() }} {{ profile.name }}
      </p>
    </div>
  </footer>
</template>
