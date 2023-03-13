<template>
  <div>
    <bar-chart :chart-data="dataChart" />

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
 * else if <= 31 days => filter by day
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

const filterChart = () =>  {
  // 1 day => filter by hour
  const start = props.range[0]
  const end = props.range[1]

  const countHours = (end - start) / (1000 * 60 * 60)
  const labels: number[] = []
  const sources: ({ total: number, signed: number, notSigned: number  })[] = []

  const filtterSource = (format: string) => {
    labels.forEach(_step => {
      const _total = users.value.filter(user => dayjs(user.createdAt).format(format) === _step.toString())
      const _signed = _total.filter((user) => user.loan?.signature)
      sources.push({
        total: _total.length,
        signed: _signed.length,
        notSigned: _total.length - _signed.length
      })
    })
  }

  if(countHours < 24) {
    for (let t = start; t <= end; t += 60 * 60 * 1000) {
      const hour = dayjs(t).hour()
      labels.push(hour)
    }
    filtterSource('H')
  } else if(countHours <= 31 * 24) {
    for (let t = start; t <= end; t += 24 * 60 * 60 * 1000) {
      const day = dayjs(t).date()
      labels.push(day)
    }
    filtterSource('D')
  } else {
    for (let t = start; t <= end; t += 30 * 24 * 60 * 60 * 1000) {
      const month = dayjs(t).month()
      labels.push(month)
    }
    filtterSource('M')
  }

  console.log('labels', labels)


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
const dataChart = computed<ChartData>(() => filterChart())
</script>
