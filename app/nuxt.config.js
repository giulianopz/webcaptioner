require('dotenv').config();

import redirectSSL from 'redirect-ssl';
import healthCheckMiddleware from './middleware/server/health-check.js';
import sourcemapMiddleware from './middleware/server/sourcemaps.js';
import wwwRedirectMiddleware from './server/middleware/wwwRedirect.js';

module.exports = {
  server: {
    host: '0', // default: localhost
    port: '8080',
  },
  head: {
    title: 'Web Captioner',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Free, real-time captioning for your event.',
      },
      {
        name: 'theme-color',
        content: '#ffe200',
      },
      {
        name: 'google',
        content: 'notranslate',
      },
      {
        property: 'og:image',
        content: 'https://webcaptioner.com/static/og-image.jpg',
      },
      {
        property: 'og:image:secure_url',
        content: 'https://webcaptioner.com/static/og-image.jpg',
      },
      {
        property: 'og:image:type',
        content: 'image/jpg',
      },
      {
        property: 'og:image:width',
        content: '1200',
      },
      {
        property: 'og:image:height',
        content: '630',
      },
    ],
    link: [
      {
        // https://github.com/nuxt/nuxt.js/issues/1204
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico?v=2',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Cousine:wght@400;700&family=Inter:wght@400;700;900&display=swap',
      },
    ],
  },
  css: ['@/assets/scss/app.scss'],
  modules: [
    [
      'nuxt-env',
      {
        // These will be available via this.$env at runtime on the public frontend.
        // We can't use Nuxt's env property in this config unless we're okay with the
        // env variable being baked in at build time.
        keys: [
          'CHROME_EXTENSION_ID',
          'FIREBASE_API_KEY',
          'FIREBASE_AUTH_DOMAIN',
          'FIREBASE_DATABASE_URL',
          'FIREBASE_PROJECT_ID',
          'FIREBASE_STORAGE_BUCKET',
          'FIREBASE_MESSAGING_SENDER_ID',
          'GOOGLE_CAST_APP_ID',
          'HOST_PUBLIC',
        ],
      },
    ],
    // 'nuxt-trailingslash-module',
    '@nuxtjs/axios',
    [
      'nuxt-i18n',
      {
        defaultLocale: 'en-US',
        locales: [
          {
            code: 'en-US',
            file: 'en-US.js',
            iso: 'en-US',
          },
        ],
        lazy: true,
        langDir: 'lang/',
      },
    ],
    [
      'nuxt-fontawesome',
      {
        component: 'fa',
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: [
              'faFileAlt',
              'faFileWord',
              'faExclamationTriangle',
              'faQuestionCircle',
              'faTimes',
              'faMicrophone',
              'faDesktop',
              'faExternalLinkAlt',
              'faCopy',
              'faSave',
              'faSyncAlt',
              'faSearch',
              'faTrashAlt',
              'faCog',
              'faPaintBrush',
              'faGlobeAsia',
              'faFileDownload',
              'faCheckCircle',
              'faCheck',
              'faSpinner',
              'faLink',
              'faPlug',
              'faCircleNotch',
              'faChevronLeft',
              'faChevronDown',
              'faChevronRight',
              'faInfoCircle',
              'faMinusCircle',
              'faPlusCircle',
              'faPlus',
              'faSatelliteDish',
              'faMinus',
              'faCommentAlt',
              'faArrowLeft',
              'faArrowRight',
              'faFlask',
              'faCaretRight',
              'faCaretDown',
              'faKeyboard',
              'faHeart',
              'faBroadcastTower',
              'faWindowRestore',
              'faBars',
              'faUserCircle',
              'faStar',
              'faToggleOn',
              'faToggleOff',
              'faEllipsisV',
              'faEye',
              'faEyeSlash',
            ],
          },
          {
            set: '@fortawesome/free-regular-svg-icons',
            icons: ['faThumbsUp', 'faTimesCircle', 'faUserCircle'],
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: [
              'faApple',
              'faWindows',
              'faAndroid',
              'faChrome',
              'faTwitter',
              'faFacebook',
              'faDropbox',
            ],
          },
        ],
      },
    ],
    ['bootstrap-vue/nuxt'],
  ],
  plugins: [
    {
      src: '~/plugins/websocket',
      mode: 'client',
    },
    // {
    //   src: '~/plugins/firebase.js',
    //   mode: 'client',
    // },
    { src: '~/plugins/vue-timeago' },
    { src: '~/plugins/performance.js' },
  ],
  bootstrapVue: {
    icons: false,
  },
  axios: {
    proxy: true,
    timeout: 7000, // ms
  },
  loading: false,
  build: {
    transpile: [
      'screenfull',
      'node-fetch',
      'query-string',
      'filter-obj',
    ],
    babel: {
      compact: true, // https://github.com/bootstrap-vue/bootstrap-vue/issues/5627#issuecomment-668487772
      plugins: [
        [
          '@babel/plugin-proposal-optional-chaining',
          {
            proposal: 'minimal',
          },
        ],
      ],
    },
    extend(config, { isDev, isClient }) {
      if (process.client) {
        config.devtool = '#source-map';
      }

      if (process.server) {
      }
    },
  },
  hooks(hook) {
    hook('modules:before', (nuxt) => {
      // https://github.com/nuxt/nuxt.js/pull/6026#issuecomment-519030254
      nuxt.options.devModules = (nuxt.options.devModules || []).filter(
        (name) => name !== '@nuxt/loading-screen'
      );
    }),
      hook('render:setupMiddleware', (app) => {
        app.use('/health-check', healthCheckMiddleware);

        if (process.env.DISABLE_SSL_REDIRECT !== 'true') {
          app.use(redirectSSL.create());
        }

        app.use(wwwRedirectMiddleware);
        app.use(sourcemapMiddleware);
      });
  },
  serverMiddleware: [
    '~/api/index.js', // Keep first
    {
      path: '/admin',
      handler: '~/middleware/server/admin.js',
    },
    {
      path: '/feedback',
      handler: '~/middleware/server/feedback.js',
    },
  ],
};
