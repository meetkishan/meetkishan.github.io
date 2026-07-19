<script setup lang="ts">
const theme = ref<'light' | 'dark'>('dark')

onMounted(() => {
  theme.value = (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') || 'dark'
})

function toggle() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', theme.value)
  try {
    localStorage.setItem('theme', theme.value)
  } catch {}
}
</script>

<template>
  <button
    class="rounded-md border border-line px-2 py-1 text-sm transition-colors hover:border-accent hover:text-accent"
    :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`"
    @click="toggle"
  >
    <span v-if="theme === 'dark'">☀️</span>
    <span v-else>🌙</span>
  </button>
</template>
