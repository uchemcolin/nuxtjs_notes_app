// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false, // Disable Server-Side Rendering, as I am uploading to shared hosting and some don't support node.js
  //ssr: true, // Enable Server-Side Rendering
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  //modules: ['@nuxt/eslint'],
  modules: ['dayjs-nuxt'],
  /*dayjs: {
    locales: ['en', 'fr'], // Add desired locales
    plugins: ['relativeTime', 'utc', 'timezone'], // Add desired plugins
    defaultLocale: 'en',
    defaultTimezone: 'America/Lagos',
  },*/
  css: [
    '@/assets/css/mystyle.css', // Apply to the entire application
    '@fortawesome/fontawesome-svg-core/styles.css',

  ],
  plugins: [
    '~/plugins/fontawesome.js'  // For Font Awesome Icons
  ],
  runtimeConfig: {
    public: {
      //apiBase: 'http://localhost:8000/api', // Laravel application url in localhost
      apiBase: "https://simple-notes-app-backend.uchemcolin.xyz/api", // Laravel application backend hosted live
    },
  },
})