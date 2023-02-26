<template>
  <div :class="[showUI ? '' : 'opacity-0']">
    <n-config-provider :theme-overrides="themeOverrides" :locale="viVN" :date-locale="dateViVN">
      <n-message-provider>
        <n-space vertical size="large">
          <NuxtLayout />
        </n-space>
      </n-message-provider>
    </n-config-provider>
  </div>
</template>

<script lang="ts" setup>
import {darkTheme, viVN, dateViVN} from 'naive-ui'
import {GlobalThemeOverrides} from "naive-ui/es/config-provider/src/interface"
import {signOut} from "firebase/auth";

const mode = useColorMode()
const authStore = useAuthStore()

const themeOverrides = reactive<GlobalThemeOverrides>({
  common: {
    primaryColor: '#1890ff'
  }
})

const _theme = computed(() => mode.value === 'light' ? null : darkTheme)

const [showUI, toggleUI] = useToggle(false)
onMounted(() => nextTick(() => toggleUI(true)))

onMounted(async () => {
  if(authStore.user?.role === 0) {
    await $fetch('/api/logout', {method: 'POST'})
    await signOut(faAuth())
    window.location.href = '/'
  }
})
</script>

<style scoped></style>
