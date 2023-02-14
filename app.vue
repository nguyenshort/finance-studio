<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-space vertical size="large">
        <NuxtLayout />
      </n-space>
    </n-message-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import {darkTheme} from 'naive-ui'
import {GlobalThemeOverrides} from "naive-ui/es/config-provider/src/interface"

const mode = useColorMode()

const themeOverrides = reactive<GlobalThemeOverrides>({
  common: {
    primaryColor: '#1890ff'
  }
})

const _theme = computed(() => mode.value === 'light' ? null : darkTheme)
</script>

<style scoped></style>
