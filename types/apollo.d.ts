declare module '#app' {
    import {ApolloClient, NormalizedCacheObject} from "@apollo/client";

    interface NuxtApp {
        $apollo: {
            defaultClient: ApolloClient<NormalizedCacheObject>
        }
    }
}
