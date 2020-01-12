module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: 'Sadoyan Roman',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Roman Sadoyan - Web-developer from Saint-Petersburg',
      },
      {
        property: 'og:url',
        content: 'https://sadoyan.ru',
      },
      {
        property: 'og:title',
        content: 'Roman Sadoyan',
      },
      {
        property: 'og:description',
        content: 'Roman Sadoyan - Web-developer from Saint-Petersburg',
      },
      {
        property: 'og:image',
        content: 'https://avatars0.githubusercontent.com/u/2903772',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.7.1/css/all.css',
        integrity:
          'sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr',
        crossorigin: 'anonymous',
      },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [
    {
      src: '~assets/css/tailwind.css',
      lang: 'postcss',
    },
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    // '@nuxtjs/axios'
    'nuxt-purgecss',
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  purgeCSS: {
    content: [
      './pages/**/*.vue',
      './layouts/**/*.vue',
      './components/**/*.vue',
    ],
    whitelist: ['html', 'body'],
    extractors: [
      {
        extractor: class {
          static extract(content) {
            return content.match(/[A-Za-z0-9-_:/]+/g) || [];
          }
        },
        // Specify the file extensions to include when scanning for
        // class names.
        extensions: ['js', 'vue'],
      },
    ],
  },
  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,
    analyze: false,
  },
  buildModules: ['@nuxtjs/tailwindcss'],
};
