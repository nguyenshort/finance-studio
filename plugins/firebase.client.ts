import {initializeApp} from "@firebase/app";
import {getAnalytics} from "@firebase/analytics";
import {getAuth} from "firebase/auth";

export default defineNuxtPlugin(nuxtApp => {
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyAbSvmRxZO1mvw2UNDNX53aZRJtlxd_55g",
        authDomain: "finance-33a61.firebaseapp.com",
        projectId: "finance-33a61",
        storageBucket: "finance-33a61.appspot.com",
        messagingSenderId: "636033621818",
        appId: "1:636033621818:web:c6f1190b7e91b89babba03",
        measurementId: "G-ML7VQXBRV0"
    };

// Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth(app)
    // const kokiApp = useAppStore()
    //
    const route = useRoute()
    const router = useRouter()
    const authStore = useAuthStore()

    nuxtApp.hooks.hook('app:mounted', () => {
        // Listen to Supabase auth changes
        auth.onIdTokenChanged(async (user) => {
            if (user) {
                const firebaseToken = await user.getIdToken()

                const userMeta = {
                    token: firebaseToken
                }

                if(firebaseToken) {
                    try {
                        const { token } = await $fetch('/api/auth', {
                            method: 'POST',
                            body: {
                                token: firebaseToken,
                                meta: userMeta
                            }
                        })
                        if(token) {

                            if(window && route.name === 'index') {
                                return window.location.href = '/discovery'
                            }

                            const { user } = await $fetch('/api/me', {
                                headers: {
                                    Authorization: 'Bearer ' + token
                                }
                            })

                            if (user) {

                                authStore.token = token
                                // @ts-ignore
                                authStore.user = user
                            }
                        }
                        // if(route.path === '/auth') {
                        //     await router.push('/')
                        // }

                    } catch (e) {
                       // await kokiApp.logOut()
                    }
                }
            } else {
                // kokiApp.token = ''
            }
        })


        // listen user data change => update
    })

    return {
        provide: {
            firebase: app,
            analytics
        }
    }
})
