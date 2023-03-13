export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    if (authStore.user && to.name === 'index') {
        return navigateTo('/discovery')
    } else if (!authStore.user && to.name !== 'index') {
        return navigateTo('/')
    }
})
