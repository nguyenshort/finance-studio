<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-space vertical size="large">
      <n-layout position="absolute" :class="[showUI ? '' : 'opacity-0']">
        <n-layout-header style="height: 64px; padding:0 24px" bordered>
          <div class="flex items-center justify-between h-full">
            <h1>Financial 247</h1>
            <div id="actions"></div>
          </div>
        </n-layout-header>
        <n-layout has-sider position="absolute" style="top: 64px">
          <n-layout-sider
              bordered
              collapse-mode="width"
              :collapsed-width="64"
              :width="240"
              show-trigger
              :collapsed="collapsed"
              @collapse="toggleCollapsed()"
              @expand="toggleCollapsed()"
          >
            <layout-menu :collapsed="collapsed"/>
          </n-layout-sider>
          <n-layout content-style="padding: 24px;">
            <NuxtPage />
          </n-layout>
        </n-layout>
      </n-layout>
    </n-space>
    </n-message-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import {darkTheme} from 'naive-ui'
import {GlobalThemeOverrides} from "naive-ui/es/config-provider/src/interface";

const [collapsed, toggleCollapsed] = useToggle(false)


const themeOverrides = reactive<GlobalThemeOverrides>({
  common: {
    primaryColor: '#1890ff'
  }
})

const [showUI, toggleUI] = useToggle(false)
onMounted(() => nextTick(() => toggleUI(true)))
</script>

<style scoped></style>
