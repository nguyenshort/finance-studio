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
import {AdminLogbooks, AdminLogbooks_adminLogbooks} from "~/apollo/queries/__generated__/AdminLogbooks";
import {PaginationProps} from "naive-ui/es/pagination/src/Pagination";
import {DataTableColumns, NTag} from "naive-ui";
import {NSpace, UserLogbookAction} from "#components";
import {LOGBOOK_STATUS, LOGBOOK_TYPE} from "~/apollo/__generated__/serverTypes"
import {ADMIN_LOGBOOKS} from "~/apollo/queries/loan.query";

const router = useRouter()
const route = useRoute()
/**
 * Get logbooks
 */
const { data: logbooksData, refresh, pending } = await useAsyncQuery<AdminLogbooks>(ADMIN_LOGBOOKS, {
  filter: {
    user: route.params.id
  }
})
const logbooks = computed(() => logbooksData.value?.adminLogbooks || [])
const getRowKey = (record: AdminLogbooks_adminLogbooks) => record.id
const { $dayjs, $moneyFormat } = useNuxtApp()
const columns = ref<DataTableColumns<AdminLogbooks_adminLogbooks>>([
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
    title: 'Gi chú',
    key: 'note'
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
      return h(UserLogbookAction, { logbook: row, onAfterDelete: () => refresh() })
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
