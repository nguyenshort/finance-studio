<template>
  <div>
    <layout-teleport to="#tabs">
      <layout-tabs :tabs="tabs" fallback="loan" />
    </layout-teleport>


    <layout-teleport to="#actions">
      <n-button type="primary" @click="toggleFilter()">
        <Icon name="ic:outline-timeline" class="mr-1"/>
        Bộ Lọc
      </n-button>
    </layout-teleport>

    <client-only>
      <discovery-chart :range="range" />
    </client-only>

    <n-modal v-model:show="showFilter" preset="dialog" title="Tuỳ chỉnh thời gian" class="!w-[635px]">
      <div class="mb-2 mt-6">
        <n-date-picker
            v-model:value="range"
            type="datetimerange"
            clearable
            panel
            format="dd/MM/yyyy - HH:mm"
            :on-confirm="() => toggleFilter()"
        />
      </div>
    </n-modal>

  </div>
</template>

<script lang="ts" setup>
const { $dayjs } = useNuxtApp()

const tabs = computed<{
  label: string
  value: string
}[]>(() => [
  {
    label: 'Đăng Ký Mới',
    value: 'loan'
  },
])

/**
 * Modal Time Filter
 */
const [showFilter, toggleFilter] = useToggle(false)

const initRange = (): [number, number] => {
  const now = Date.now()
  const start = $dayjs(now).subtract(23, 'hour').valueOf()
  return [start, now]
}

const range = ref<[number, number]>(initRange())
</script>

<style scoped></style>
