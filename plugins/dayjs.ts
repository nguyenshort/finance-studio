import {defineNuxtPlugin} from "#imports"

import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import 'dayjs/locale/en'
import 'dayjs/locale/ja'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'

declare module '#app' {
    interface NuxtApp {
        $dayjs: typeof dayjs
    }
}

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $dayjs: typeof dayjs
    }
}

export default defineNuxtPlugin(() => {

    dayjs.extend(relativeTime)
    dayjs.extend(localizedFormat)
    dayjs.extend(customParseFormat)
    dayjs.locale('en')

    return {
        provide: {
            dayjs
        }
    }
})
