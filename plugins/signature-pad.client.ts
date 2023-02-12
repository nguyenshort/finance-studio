import VueSignaturePad from 'vue-signature-pad'
export default defineNuxtPlugin((nuxt) => {
    nuxt.vueApp.use(VueSignaturePad)
})
