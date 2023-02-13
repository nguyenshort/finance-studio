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
import { Icon } from '#components'
import { NIcon } from 'naive-ui'

defineProps<{
  collapsed: boolean
}>()

type MenuOptionWithIcon = MenuOption & { icon_name: string }

const renderMenuIcon = (option: MenuOptionWithIcon) => {
  return h(NIcon, null, { default: () => h(Icon, { name: option.icon_name }) })
}

const menuOptions: MenuOptionWithIcon[] = [
  {
    label: 'Tổng Quan',
    key: 'discovery',
    icon_name: 'icon-park-outline:browser-safari'
  },
  {
    label: 'Khoản Vay',
    key: 'loans',
    icon_name: 'ri:money-pound-circle-line'
  },
  {
    label: 'Cộng Tác Viên',
    key: 'collaborators',
    icon_name: 'majesticons:support-line'
  },
  {
    label: 'Người Dùng',
    key: 'users',
    icon_name: 'ri:user-4-line'
  }
]

const selectedKey = ref('user')
</script>

<style scoped></style>
