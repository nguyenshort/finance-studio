<template>
  <div>
    <bar-chart :chart-data="testData" />

    <div class="mt-5">
      <n-h4>Bảng Số Liệu</n-h4>
    </div>
    <discovery-table :users="users" />
  </div>
</template>

<script lang="ts" setup>
import {AdminRangeUsers, AdminRangeUsersVariables} from "~/apollo/queries/__generated__/AdminRangeUsers"

import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import {RANGE_USERS} from "~/apollo/queries/user.query";
import dayjs from "dayjs";
Chart.register(...registerables);

const props = defineProps<{
  range: [number, number]
}>()

const filter = computed<AdminRangeUsersVariables>(() => ({
  filter: {
    start: props.range[0],
    end: props.range[1]
  }
}))

const { result } = useQuery<AdminRangeUsers, AdminRangeUsersVariables>(RANGE_USERS, filter, { debounce: 500 })
const users = computed<AdminRangeUsers['adminRangeUsers']>(() => result.value?.adminRangeUsers || [])

/**
 * using props.range to define chart data
 * if <= 1 day => filter by hour
 * else if <= 30 days => filter by day
 * else filter by month
 */
const { $dayjs } = useNuxtApp()

interface ChartData {
  labels: any[]
  datasets: {
    label: string
    backgroundColor: string
    data: number[]
  }[]
}

interface GenerateChartOptions {
  format: string
}
const filterChart = ({ format }: GenerateChartOptions) =>  {
  // 1 day => filter by hour
  const start = Number($dayjs(props.range[0]).format(format))
  const end = Number($dayjs(props.range[1]).format(format))

  const labels = Array.from({ length: end - start + 1 }, (_, i) => (i + start))

  const sources: ({ total: number, signed: number, notSigned: number  })[] = []

  labels.forEach(_time => {
    const _total = users.value.filter(user => dayjs(user.createdAt).format(format) === _time.toString())
    const _signed = _total.filter((user) => user.loan?.signature)
    sources.push({
      total: _total.length,
      signed: _signed.length,
      notSigned: _total.length - _signed.length
    })
  })

  const datasets = [
    {
      label: `Tổng số`,
      backgroundColor: '#3b66f5',
      data: sources.map(source => source.total)
    },
    {
      label: 'Đã ký',
      backgroundColor: '#f5b33b',
      data: sources.map(source => source.signed)
    },
    {
      label: 'Chưa ký',
      backgroundColor: '#f53b3b',
      data: sources.map(source => source.notSigned)
    }
  ]

  return {
    labels,
    datasets
  }
}
const testData = computed<ChartData>(() => {
  if (props.range[1] - props.range[0] <= 86400000) {
    return filterChart({ format: 'H' })
  } else if (props.range[1] - props.range[0] <= 2592000000) {
    return filterChart({ format: 'D' })
  } else {
    return filterChart({ format: 'M' })
  }
})
</script>
