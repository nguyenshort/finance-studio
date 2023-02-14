<template>
  <div>
    <layout-teleport to="#tabs">
      <layout-tabs :tabs="tabs" fallback="verify" />
    </layout-teleport>

    <user-verify-wrapper v-if="$route.query.tab === 'verify'" />
    <user-loan-wrapper v-else-if="$route.query.tab === 'loan'" />

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
  {
    label: 'Biến Động Số Dư',
    value: 'report'
  },
])
</script>

<style scoped></style>
