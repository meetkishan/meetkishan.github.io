<script setup lang="ts">
import { marked } from 'marked'

// Browser editor for blog posts. Commits markdown straight to the GitHub
// repo via the Contents API using a fine-grained personal access token
// (Contents: read & write) kept in localStorage — no server, works from
// any phone browser. Nuxt Studio is the fancier alternative; this one
// always works, even offline-drafting.

useSeoMeta({ title: 'Admin', robots: 'noindex, nofollow' })

const GITHUB = 'https://api.github.com'
const CONTENT_DIR = 'site/content/blog'
const UPLOAD_DIR = 'site/public/images/uploads'

const token = ref('')
const repo = ref('meetkishan/meetkishan.github.io')
const branch = ref('main')
const connected = ref(false)

const posts = ref<{ name: string; path: string; sha: string }[]>([])
const busy = ref(false)
const status = ref('')
const error = ref('')

// Editor state
const editing = ref(false)
const currentPath = ref<string | null>(null) // null = new post
const currentSha = ref<string | null>(null)
const title = ref('')
const description = ref('')
const date = ref('')
const tags = ref('')
const draft = ref(false)
const body = ref('')
const showPreview = ref(false)
const restoredDraft = ref(false)

const previewHtml = computed(() => marked.parse(body.value) as string)

onMounted(() => {
  token.value = localStorage.getItem('gh_token') || ''
  repo.value = localStorage.getItem('gh_repo') || repo.value
  branch.value = localStorage.getItem('gh_branch') || branch.value
  if (token.value) connect()
})

// --- base64 helpers (UTF-8 safe) ---

function b64encode(text: string) {
  const bytes = new TextEncoder().encode(text)
  let bin = ''
  bytes.forEach((b) => (bin += String.fromCharCode(b)))
  return btoa(bin)
}

function b64decode(b64: string) {
  const bin = atob(b64.replace(/\n/g, ''))
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)))
}

// --- GitHub API ---

async function api(path: string, init: RequestInit = {}) {
  const res = await fetch(`${GITHUB}/repos/${repo.value}${path}`, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      // Without a token a public repo is still readable — publishing will 401.
      ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
      ...init.headers,
    },
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`GitHub API ${res.status}: ${text.slice(0, 200)}`)
  }
  return res
}

async function connect() {
  busy.value = true
  error.value = ''
  try {
    localStorage.setItem('gh_token', token.value)
    localStorage.setItem('gh_repo', repo.value)
    localStorage.setItem('gh_branch', branch.value)
    await loadPosts()
    connected.value = true
  } catch (e: any) {
    error.value = e.message
  } finally {
    busy.value = false
  }
}

function disconnect() {
  localStorage.removeItem('gh_token')
  token.value = ''
  connected.value = false
  editing.value = false
}

async function loadPosts() {
  try {
    const res = await api(`/contents/${CONTENT_DIR}?ref=${branch.value}`)
    const items = (await res.json()) as { name: string; path: string; sha: string; type: string }[]
    posts.value = items.filter((i) => i.type === 'file' && i.name.endsWith('.md'))
  } catch (e: any) {
    if (e.message.includes('404')) posts.value = [] // directory doesn't exist yet
    else throw e
  }
}

// --- frontmatter (limited to this blog's flat schema) ---

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/)
  const data: Record<string, any> = {}
  if (!match) return { data, body: raw }
  for (const line of match[1]!.split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/)
    if (!kv) continue
    const [, key, value] = kv
    if (value === '') continue
    if (value === 'true' || value === 'false') data[key!] = value === 'true'
    else if (value!.startsWith('[')) {
      data[key!] = value!
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    } else data[key!] = value!.replace(/^["']|["']$/g, '')
  }
  return { data, body: raw.slice(match[0].length) }
}

function buildMarkdown() {
  const tagList = tags.value.split(',').map((t) => t.trim()).filter(Boolean)
  const fm = [
    '---',
    `title: "${title.value.replace(/"/g, '\\"')}"`,
    `description: "${description.value.replace(/"/g, '\\"')}"`,
    `date: "${date.value}"`,
    `tags: [${tagList.map((t) => `"${t}"`).join(', ')}]`,
    `draft: ${draft.value}`,
    '---',
    '',
  ].join('\n')
  return fm + body.value
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

// --- editor lifecycle ---

function draftKey() {
  return `admin_draft_${currentPath.value || '__new__'}`
}

function newPost() {
  currentPath.value = null
  currentSha.value = null
  title.value = ''
  description.value = ''
  date.value = new Date().toISOString().slice(0, 10)
  tags.value = ''
  draft.value = false
  body.value = ''
  editing.value = true
  restoredDraft.value = false
  restoreLocalDraft()
}

async function openPost(path: string) {
  busy.value = true
  error.value = ''
  try {
    const res = await api(`/contents/${path}?ref=${branch.value}`)
    const file = (await res.json()) as { content: string; sha: string }
    const { data, body: md } = parseFrontmatter(b64decode(file.content))
    currentPath.value = path
    currentSha.value = file.sha
    title.value = data.title || ''
    description.value = data.description || ''
    date.value = data.date || ''
    tags.value = Array.isArray(data.tags) ? data.tags.join(', ') : ''
    draft.value = !!data.draft
    body.value = md
    editing.value = true
    restoredDraft.value = false
    restoreLocalDraft()
  } catch (e: any) {
    error.value = e.message
  } finally {
    busy.value = false
  }
}

function restoreLocalDraft() {
  try {
    const saved = localStorage.getItem(draftKey())
    if (!saved) return
    const d = JSON.parse(saved)
    title.value = d.title
    description.value = d.description
    date.value = d.date
    tags.value = d.tags
    draft.value = d.draft
    body.value = d.body
    restoredDraft.value = true
  } catch {}
}

function discardLocalDraft() {
  localStorage.removeItem(draftKey())
  restoredDraft.value = false
  if (currentPath.value) openPost(currentPath.value)
  else newPost()
}

// Autosave to localStorage so nothing is lost mid-writing.
watch([title, description, date, tags, draft, body], () => {
  if (!editing.value) return
  localStorage.setItem(
    draftKey(),
    JSON.stringify({
      title: title.value,
      description: description.value,
      date: date.value,
      tags: tags.value,
      draft: draft.value,
      body: body.value,
      savedAt: Date.now(),
    }),
  )
})

async function commitFile(path: string, contentB64: string, message: string, sha?: string | null) {
  const res = await api(`/contents/${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      content: contentB64,
      branch: branch.value,
      ...(sha ? { sha } : {}),
    }),
  })
  return (await res.json()) as { content: { sha: string } }
}

async function publish() {
  if (!title.value || !date.value) {
    error.value = 'Title and date are required.'
    return
  }
  busy.value = true
  error.value = ''
  status.value = ''
  try {
    const path = currentPath.value || `${CONTENT_DIR}/${date.value}-${slugify(title.value)}.md`
    const result = await commitFile(
      path,
      b64encode(buildMarkdown()),
      `${currentPath.value ? 'Update' : 'Add'} blog post: ${title.value}`,
      currentSha.value,
    )
    localStorage.removeItem(draftKey())
    currentPath.value = path
    currentSha.value = result.content.sha
    status.value = 'Published! GitHub Actions rebuilds the site in ~2 minutes.'
    await loadPosts()
  } catch (e: any) {
    error.value = e.message
  } finally {
    busy.value = false
  }
}

async function removePost(post: { name: string; path: string; sha: string }) {
  if (!confirm(`Delete ${post.name}? This commits the deletion to ${branch.value}.`)) return
  busy.value = true
  error.value = ''
  try {
    await api(`/contents/${post.path}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `Delete blog post: ${post.name}`,
        sha: post.sha,
        branch: branch.value,
      }),
    })
    if (currentPath.value === post.path) editing.value = false
    await loadPosts()
    status.value = 'Deleted.'
  } catch (e: any) {
    error.value = e.message
  } finally {
    busy.value = false
  }
}

// --- image upload: resize client-side, commit as base64, insert markdown ---

const fileInput = ref<HTMLInputElement>()

async function uploadImage(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  busy.value = true
  error.value = ''
  try {
    const resized = await resizeImage(file, 1600)
    const name = `${Date.now()}-${slugify(file.name.replace(/\.\w+$/, ''))}.jpg`
    await commitFile(`${UPLOAD_DIR}/${name}`, resized, `Upload image: ${name}`)
    body.value += `\n\n![](/images/uploads/${name})\n`
    status.value = 'Image uploaded and inserted.'
  } catch (e: any) {
    error.value = e.message
  } finally {
    busy.value = false
    if (fileInput.value) fileInput.value.value = ''
  }
}

function resizeImage(file: File, maxSize: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)
      canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL('image/jpeg', 0.85).split(',')[1]!)
    }
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-10">
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-extrabold tracking-tight">Blog Admin</h1>
      <button v-if="connected" class="text-sm text-muted hover:text-accent" @click="disconnect">
        Sign out
      </button>
    </div>

    <p v-if="error" class="mb-4 rounded-lg border border-red-400 bg-red-400/10 p-3 text-sm text-red-400">
      {{ error }}
    </p>
    <p v-if="status" class="mb-4 rounded-lg border border-accent bg-accent/10 p-3 text-sm text-accent">
      {{ status }}
    </p>

    <!-- Token setup -->
    <div v-if="!connected" class="max-w-md rounded-xl border border-line bg-card p-6">
      <h2 class="font-semibold">Connect to GitHub</h2>
      <p class="mt-2 text-sm text-muted">
        Create a fine-grained personal access token (GitHub → Settings → Developer settings)
        scoped to this repository with <code class="text-accent">Contents: Read and write</code>,
        and paste it here. It is stored only in this browser's localStorage.
      </p>
      <label class="mt-4 block text-xs font-semibold uppercase tracking-wide text-muted">Access token</label>
      <input
        v-model="token"
        type="password"
        placeholder="github_pat_…"
        class="mt-1 w-full rounded-lg border border-line bg-base p-2 text-sm"
      />
      <label class="mt-3 block text-xs font-semibold uppercase tracking-wide text-muted">Repository</label>
      <input v-model="repo" class="mt-1 w-full rounded-lg border border-line bg-base p-2 text-sm" />
      <label class="mt-3 block text-xs font-semibold uppercase tracking-wide text-muted">Branch</label>
      <input v-model="branch" class="mt-1 w-full rounded-lg border border-line bg-base p-2 text-sm" />
      <button
        class="mt-4 w-full rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-base disabled:opacity-50"
        :disabled="busy"
        @click="connect"
      >
        {{ busy ? 'Connecting…' : token ? 'Connect' : 'Browse read-only (no token)' }}
      </button>
    </div>

    <!-- Post list -->
    <div v-else-if="!editing">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="font-semibold">Posts <span class="text-sm text-muted">({{ branch }})</span></h2>
        <button class="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-base" @click="newPost">
          + New Post
        </button>
      </div>
      <ul class="divide-y divide-line rounded-xl border border-line bg-card">
        <li v-for="post in posts" :key="post.path" class="flex items-center justify-between p-3">
          <button class="text-left text-sm font-medium hover:text-accent" @click="openPost(post.path)">
            {{ post.name }}
          </button>
          <button class="text-xs text-muted hover:text-red-400" @click="removePost(post)">Delete</button>
        </li>
        <li v-if="!posts.length" class="p-3 text-sm text-muted">No posts found on "{{ branch }}".</li>
      </ul>
    </div>

    <!-- Editor -->
    <div v-else>
      <div class="mb-4 flex flex-wrap items-center gap-2">
        <button class="rounded-lg border border-line px-3 py-1.5 text-sm hover:border-accent" @click="editing = false">
          ← Posts
        </button>
        <span class="text-sm text-muted">{{ currentPath || 'new post' }}</span>
        <span class="ml-auto flex gap-2">
          <button
            class="rounded-lg border border-line px-3 py-1.5 text-sm hover:border-accent"
            @click="showPreview = !showPreview"
          >
            {{ showPreview ? 'Edit' : 'Preview' }}
          </button>
          <button
            class="rounded-lg bg-accent px-4 py-1.5 text-sm font-semibold text-base disabled:opacity-50"
            :disabled="busy"
            @click="publish"
          >
            {{ busy ? 'Publishing…' : 'Publish' }}
          </button>
        </span>
      </div>

      <p v-if="restoredDraft" class="mb-4 rounded-lg border border-line bg-soft p-2 text-xs text-muted">
        Restored unsaved local draft.
        <button class="text-accent hover:underline" @click="discardLocalDraft">Discard it</button>
      </p>

      <div v-if="!showPreview" class="space-y-3">
        <div class="grid gap-3 sm:grid-cols-2">
          <input v-model="title" placeholder="Title" class="rounded-lg border border-line bg-card p-2 text-sm" />
          <input v-model="date" type="date" class="rounded-lg border border-line bg-card p-2 text-sm" />
        </div>
        <input
          v-model="description"
          placeholder="Short description (SEO + cards)"
          class="w-full rounded-lg border border-line bg-card p-2 text-sm"
        />
        <div class="flex flex-wrap items-center gap-3">
          <input
            v-model="tags"
            placeholder="tags, comma, separated"
            class="flex-1 rounded-lg border border-line bg-card p-2 text-sm"
          />
          <label class="flex items-center gap-1.5 text-sm text-muted">
            <input v-model="draft" type="checkbox" /> Draft
          </label>
          <label class="cursor-pointer rounded-lg border border-line px-3 py-1.5 text-sm hover:border-accent">
            📷 Image
            <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="uploadImage" />
          </label>
        </div>
        <textarea
          v-model="body"
          rows="18"
          placeholder="Write in markdown…"
          class="w-full rounded-lg border border-line bg-card p-3 font-mono text-sm leading-relaxed"
        />
      </div>

      <div v-else class="prose max-w-none rounded-xl border border-line bg-card p-6 dark:prose-invert" v-html="previewHtml" />
    </div>
  </div>
</template>
