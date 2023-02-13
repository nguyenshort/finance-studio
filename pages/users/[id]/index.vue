<template>
  <div>
    <layout-teleport to="#tabs">
      <layout-tabs :tabs="tabs" fallback="verify" />
    </layout-teleport>

    <keep-alive>
      <user-verify v-if="$route.query.tab === 'verify'" />
    </keep-alive>

  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['user'],
})

const tabs = computed<{
  label: string
  value: string
}[]>(() => [
  {
    label: 'Thông Tin Xác Minh',
    value: 'verify'
  },
  {
    label: 'Khoản Vay',
    value: 'loan'
  },
])
</script>

<style scoped></style>
