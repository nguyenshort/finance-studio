<template>
  <n-space vertical :size="12">
    <n-data-table
        :loading="pending"
        :bordered="false"
        :single-line="false"
        :columns="columns"
        :data="logbooks"
        :row-key="getRowKey"
        :pagination="pagination"
    />
  </n-space>
</template>

<script lang="ts" setup>
import {PaginationProps} from "naive-ui/es/pagination/src/Pagination";
import {DataTableColumns, NTag} from "naive-ui";
import {NSpace, UserWithdrawAction} from "#components";
import {GET_USER_WITHDRAW} from "~/apollo/queries/user.query";
import {WithdrawsAdmin, WithdrawsAdmin_withdrawsAdmin} from "~/apollo/queries/__generated__/WithdrawsAdmin";
import {WithDrawStatus} from "~/apollo/__generated__/serverTypes";

const router = useRouter()
const route = useRoute()
/**
 * Get logbooks
 */
const { data: logbooksData, refresh, pending } = await useAsyncQuery<WithdrawsAdmin>(GET_USER_WITHDRAW, {
  filter: {
    user: route.params.id
  }
})
const logbooks = computed(() => logbooksData.value?.withdrawsAdmin || [])
const getRowKey = (record: WithdrawsAdmin_withdrawsAdmin) => record.id
const { $dayjs, $moneyFormat } = useNuxtApp()
const columns = ref<DataTableColumns<WithdrawsAdmin_withdrawsAdmin>>([
  {
    title: 'Số tiền',
    key: 'amount',
    render(row) {
      return h(
          NTag,
          {
            style: {
              marginRight: '6px'
            },
            type: 'error',
            bordered: false,
          },
          {
            default: () => $moneyFormat(row.amount) + ' đ'
          }
      )
    },
    sorter: (row1, row2) => row1.amount - row2.amount
  },
  {
    title: 'Trạng Thái',
    key: 'status',
    render(row) {
      return h(
          NTag,
          {
            style: {
              marginRight: '6px'
            },
            type: row.status === WithDrawStatus.PENDING ? 'warning' : row.status === WithDrawStatus.APPROVED ? 'success' : 'error',
            bordered: false,
          },
          {
            default: () => row.status === WithDrawStatus.PENDING ? 'Đang Chờ' : row.status === WithDrawStatus.APPROVED ? 'Đã Duyệt' : 'Từ Chối'
          }
      )
    },
    sorter: (row1, row2) => row1.status.localeCompare(row2.status)
  },
  {
    title: 'Ngày Yêu Cầu',
    key: 'createdAt',
    render: (row) => $dayjs(row.createdAt).format('DD/MM/YYYY'),
    sorter: (row1, row2) => row1.createdAt - row2.createdAt,
    width: 150
  },
  {
    title: 'Hành Động',
    key: 'actions',
    render (row) {
      return h(UserWithdrawAction, { logbook: row, onAfterDelete: () => refresh() })
    },
    width: 100
  }
])

const pagination = reactive<PaginationProps>({
  pageSize: 10
})

const bus = useEventBus<string>('logbooks')
const bus2 = useEventBus<string>('balance')
const listener = (event: string) => {
  if(event === 'refresh') {
    refresh()
    setTimeout(() => {
      bus2.emit('refresh')
    }, 1000)
  }
}
bus.on(listener)

defineExpose({
  refresh
})
</script>

<style scoped></style>
