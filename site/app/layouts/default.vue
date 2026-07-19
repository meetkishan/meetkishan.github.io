<script setup lang="ts">
const nav = [
  { label: 'Home', to: '/' },
  { label: 'Blog', to: '/blog' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Portfolio', to: '/portfolio' },
]

const menuOpen = ref(false)
const route = useRoute()
watch(() => route.path, () => (menuOpen.value = false))

// Flat pages (/gallery vs /gallery/[slug]) are sibling routes, so
// router-link-active never fires on child paths — match by path instead.
function isActive(to: string) {
  if (to === '/') return route.path === '/'
  return route.path === to || route.path.startsWith(`${to}/`)
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-base text-ink">
    <header class="sticky top-0 z-40 border-b border-line bg-base/90 backdrop-blur">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <NuxtLink to="/" class="text-lg font-bold tracking-tight hover:text-accent">
          Kishan Kachchhi
        </NuxtLink>
        <nav class="hidden items-center gap-6 sm:flex">
          <NuxtLink
            v-for="item in nav"
            :key="item.to"
            :to="item.to"
            class="text-sm font-medium transition-colors hover:text-accent"
            :class="isActive(item.to) ? 'text-accent' : 'text-muted'"
          >
            {{ item.label }}
          </NuxtLink>
          <ThemeToggle />
        </nav>
        <div class="flex items-center gap-3 sm:hidden">
          <ThemeToggle />
          <button
            class="rounded-md border border-line px-2 py-1 text-sm"
            aria-label="Toggle menu"
            @click="menuOpen = !menuOpen"
          >
            ☰
          </button>
        </div>
      </div>
      <nav v-if="menuOpen" class="border-t border-line px-4 py-2 sm:hidden">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="block py-2 text-sm font-medium hover:text-accent"
          :class="isActive(item.to) ? 'text-accent' : 'text-muted'"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>
