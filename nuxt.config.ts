// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    databaseUrl: '',
    jwtAccessSecret: '',
    jwtRefreshSecret: ''
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  css: ['@wale/general-sans', '~/assets/css/main.css'],
  modules: ["@nuxt/image", "@pinia/nuxt"]
});