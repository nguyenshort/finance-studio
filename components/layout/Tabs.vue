<template>
  <div>
    <a
        v-for="tab in tabs"
        :key="tab.value"
        :class="[currentTab === tab.value ? '_active' : '']"
        href="javascript:void(0)"
        @click="currentTab = tab.value"
    >
      {{ tab.label }}
    </a>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  tabs: {
    label: string
    value: string
  }[]
  fallback?: string
}>()


const router = useRouter()
const currentTab = ref<string>('')

const setTab = () => {
  const tab = router.currentRoute.value.query.tab as string
  if (tab) {
    if (props.tabs.find((item) => item.value === tab)) {
      currentTab.value = tab
    } else {
      currentTab.value = props.fallback || props.tabs[0].value
    }
  } else {
    currentTab.value = props.fallback || props.tabs[0].value
  }
}
setTab()

watch(
    currentTab,
    () => {
      router.replace({
        query: {
          tab: currentTab.value
        }
      })
    },
    { immediate: true }
)
</script>

<style scoped>
div {
  @apply flex items-center h-full;
}
div a {
  @apply h-full px-4 transition flex items-center;
}

div a._active {
  @apply text-sm font-medium;
  color: #1890ff;
  background: #1890ff26;
}
</style>
