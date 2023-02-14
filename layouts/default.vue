<template>
  <n-layout position="absolute" :class="[showUI ? '' : 'opacity-0']">
    <n-layout-header style="height: 64px; padding:0 24px" bordered>
      <div class="flex items-center h-full">
        <h1 class="w-[216px] flex-shrink-0">Financial 247</h1>
        <div id="tabs" class="w-full h-full flex items-center"></div>
        <div id="actions" class="flex-shrink-0"></div>
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
</template>

<script lang="ts" setup>
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
