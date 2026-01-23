export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "NEKSTUDIO - Entertain the World",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "NEKSTUDIO - Entertain the world with iconic apps and games",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/logo/5_icon_red.png" },
      { rel: "stylesheet", href: "https://cdn.tailwindcss.com" },
    ],
    script: [
      { src: "https://cdn.tailwindcss.com" },
      { src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js" },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js",
      },
    ],
  },
 axios: {
    baseURL: process.env.API_BASE_URL ,
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
  ],

  // Server Middleware
  serverMiddleware: [
    '~/server-middleware/app-ads.js'
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ['@studio-freight/lenis'],
  },
  server: {
    port: 8080,
  },
   
  ssr: true,
  target: "server",

  // Generate dynamic routes
  generate: {
    routes: function() {
      const fs = require('fs');
      const path = require('path');
      const gameDataDir = path.join(__dirname, 'game-data');
      
      if (!fs.existsSync(gameDataDir)) {
        return [];
      }
      
      const files = fs.readdirSync(gameDataDir);
      return files
        .filter(file => file.endsWith('.txt'))
        .map(file => {
          const gameName = file.replace('.txt', '');
          return `/${gameName}`;
        });
    }
  }
};
