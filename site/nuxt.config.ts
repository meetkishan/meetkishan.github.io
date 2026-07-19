import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  modules: ['@nuxt/content'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: (title) =>
        title ? `${title} | Kishan Kachchhi` : 'Kishan Kachchhi | Full-Stack Developer & SaaS Product Builder',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Kishan Kachchhi — Full-Stack Developer in Berlin building SaaS from concept to production. Blog, travel gallery and portfolio.',
        },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
        },
      ],
      script: [
        {
          // Set theme before first paint; same localStorage key as the old site.
          innerHTML: `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          tagPosition: 'head',
        },
      ],
    },
  },
  content: {
    preview: {
      // Enables editing this site in Nuxt Studio (connect the GitHub repo
      // at https://nuxt.studio).
      api: 'https://api.nuxt.studio',
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/admin'],
    },
  },
})
