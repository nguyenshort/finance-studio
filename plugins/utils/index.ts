import { defineNuxtPlugin } from '#imports'
import { $moneyFormat } from './money'

// Cutsom type
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $moneyFormat: typeof $moneyFormat
  }
}

declare module '#app' {
  interface NuxtApp {
    $moneyFormat: typeof $moneyFormat
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      moneyFormat: $moneyFormat
    }
  }
})
