<template>
  <div>
    <layout-teleport to="#tabs">
      <layout-tabs :tabs="tabs" fallback="verify" />
    </layout-teleport>

    <client-only>
      <discovery-chart />
    </client-only>

  </div>
</template>

<script lang="ts" setup>
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
