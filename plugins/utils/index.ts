import { defineNuxtPlugin } from '#imports'
import { $moneyFormat } from './money'
import { $cdn } from './cdn'

// Cutsom type
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $moneyFormat: typeof $moneyFormat
    $cdn: typeof $cdn
  }
}

declare module '#app' {
  interface NuxtApp {
    $moneyFormat: typeof $moneyFormat
    $cdn: typeof $cdn
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      moneyFormat: $moneyFormat,
      cdn: $cdn
    }
  }
})
