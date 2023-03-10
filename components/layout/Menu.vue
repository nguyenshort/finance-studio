<template>
  <n-menu
      v-model:value="selectedKey"
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
      :render-icon="renderMenuIcon"
      :expand-icon="renderMenuIcon"
  >
  </n-menu>
</template>

<script lang="ts" setup>
import {MenuOption} from "naive-ui"
import {Icon, NuxtLink} from '#components'
import {NIcon} from 'naive-ui'

defineProps<{
  collapsed: boolean
}>()

type MenuOptionWithIcon = MenuOption & { icon_name: string }

const renderMenuIcon = (option: MenuOptionWithIcon) => {
  return h(NIcon, null, {default: () => h(Icon, {name: option.icon_name})})
}

const router = useRouter()
const authStore = useAuthStore()

const logOut = async (e: Event) => {
  e.preventDefault()
  await $fetch('/api/logout', {method: 'POST'})
  window.location.href = '/'
}

const menuOptions = computed<MenuOptionWithIcon[]>(() => [
  {
    label: () => h(
        NuxtLink,
        {
          to: {
            name: 'index'
          }
        },
        {default: () => 'Tổng Quan'}
    ),
    key: 'discovery',
    icon_name: 'icon-park-outline:browser-safari'
  },
  {
    label: () => h(
        NuxtLink,
        {
          to: {
            name: 'collaborators'
          }
        },
        {default: () => 'Cộng Tác Viên'}
    ),
    key: 'collaborators',
    icon_name: 'majesticons:support-line'
  },
  {
    label: () => h(
        NuxtLink,
        {
          to: {
            name: 'users'
          }
        },
        {default: () => 'Thành Viên'}
    ),
    key: 'users',
    icon_name: 'ri:user-4-line'
  },
  {
    label: () => h(
        NuxtLink,
        {
          to: {
            name: 'creator'
          }
        },
        {default: () => 'Hoá Đơn'}
    ),
    key: 'creator',
    icon_name: 'ri:user-4-line'
  },
  {
    label: () => h(
        'a',
        {
          href: '#',
          onClick: logOut
        },
        {default: () => 'Đăng Xuất'}
    ),
    key: 'out',
    icon_name: 'majesticons:logout-half-circle'
  }
])

const route = useRoute()
const selectedKey = computed({
  get: () => {
    // match by regex first
    if (/^\/discovery/.test(route.path)) return 'discovery'
    if (/^\/collaborators/.test(route.path)) return 'collaborators'
    if (/^\/users/.test(route.path)) return 'users'
    if (/^\/withdraw/.test(route.path)) return 'withdraw'
    return '/'
  },
  set: (value: string) => {}
})
</script>

<style scoped></style>
