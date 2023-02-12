export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    if (authStore.user && to.name === 'discovery') {
        return navigateTo('/')
    } else if (!authStore.user && to.name !== 'discovery') {
        return navigateTo('/discovery')
    }
})
