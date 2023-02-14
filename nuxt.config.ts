// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/apollo',
        '@vueuse/nuxt',
        // '@nuxt/devtools',
        [
            '@pinia/nuxt',
            {
                autoImports: [
                    // automatically imports `defineStore`
                    'defineStore', // import { defineStore } from 'pinia'
                    // automatically imports `defineStore` as `definePiniaStore`
                    ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
                ],
            },
        ],
        '@huntersofbook/naive-ui-nuxt',
        'nuxt-icon'
    ],
    imports: {
        autoImport: true,
        dirs: [
            // automatically imports apollo folder
           './apollo/*',
        ],
        imports: [
            // Vue Use Firebase
            { name: 'useAuth', from: '@vueuse/firebase' },
            { name: 'useRTDB', from: '@vueuse/firebase/useRTDB' },
            { name: 'useFirestore', from: '@vueuse/firebase/useFirestore' },

            // Firebase Auth
            { name: 'getAuth', from: '@firebase/auth', as: 'faAuth' },

            // Real time database
            { name: 'fdDatabase', from: 'firebase/database' },
            { name: 'ref', from: 'firebase/database', as: 'fdRef' },
            { name: 'set', from: 'firebase/database', as: 'fdSet' },
            { name: 'get', from: 'firebase/database', as: 'fdGet' },
            { name: 'onValue', from: 'firebase/database', as: 'fdOnValue' },

            // firestore
            { name: 'getStorage', from: 'firebase/storage', as: 'fsStorage' },
            { name: 'ref', from: 'firebase/storage', as: 'fsRef' },
            { name: 'uploadBytes', from: 'firebase/storage', as: 'fsUploadBytes' },
            { name: 'getDownloadURL', from: 'firebase/storage', as: 'fsGetDownloadURL' },

            // firedatabase
            { name: 'getFirestore', from: 'firebase/firestore', as: 'fsFirestore' },
            { name: 'doc', from: 'firebase/firestore', as: 'fsDocInstance' },
            { name: 'setDoc', from: 'firebase/firestore', as: 'fsSetDoc' },
            { name: 'getDoc', from: 'firebase/firestore', as: 'fsGetDoc' },
            { name: 'collection', from: 'firebase/firestore', as: 'fsCollection' },
            { name: 'deleteDoc', from: 'firebase/firestore', as: 'fsDeleteDoc' },

            // Native UI
            { name: 'useMessage', from: 'naive-ui' }
        ]
    },
    naiveUI: {
        themeOverrides: {
            common: {
                primaryColor: '#1890ff'
            }
        }
    },
    apollo: {
        clients: {
            default: './apollo/index.ts'
        }
    },
    runtimeConfig: {
        // Private config that is only available on the server
        apiSecret: process.env.NUXT_API_SECRET,
        // Config within public will be also exposed to the client
        public: {
            apiBase: '/api',
            apiGraphQL: process.env.NUXT_PUBLIC_APOLLO_ENDPOIT,
            apiBackend: process.env.NUXT_PUBLIC_BACKEND_ENDPOIT,
            cdnEndpoint: process.env.NUXT_PUBLIC_CDN_ENDPOIT,
        }
    },
    experimental: {
        externalVue: true,
    },
})
