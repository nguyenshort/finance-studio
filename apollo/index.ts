import { defineApolloClient } from '@nuxtjs/apollo'

export default defineApolloClient({
    httpEndpoint: process.env.NUXT_PUBLIC_APOLLO_ENDPOIT as string,
    browserHttpEndpoint: '',
    httpLinkOptions: {},
    wsLinkOptions: {},
    websocketsOnly: false,
    connectToDevTools: false,
    defaultOptions: {},
    inMemoryCacheOptions: {},
    tokenName: 'apollo:app.token',
    tokenStorage: 'cookie',
    authHeader: 'Authorization'
})
