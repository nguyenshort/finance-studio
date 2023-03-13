<template>
  <n-data-table
      :bordered="false"
      :single-line="false"
      :columns="columns"
      :data="clients"
      :row-key="getRowKey"
      :pagination="pagination"
  />
</template>
<script lang="ts" setup>
import {PaginationProps} from "naive-ui/es/pagination/src/Pagination"
import {DataTableColumns, NButton, NTag} from "naive-ui"
import { NuxtLink } from "#components";

import {
  GetCollaborator_collaborator_clients
} from "~/apollo/queries/__generated__/GetCollaborator"

defineProps<{
  clients: GetCollaborator_collaborator_clients[]
}>()

const router = useRouter()

/**
 * Section: Setup Table
 */
const { $dayjs, $moneyFormat } = useNuxtApp()
const getRowKey = (user: GetCollaborator_collaborator_clients) => user.id
const columns = ref<DataTableColumns<GetCollaborator_collaborator_clients>>([
  {
    title: 'Tên',
    key: 'info.name',
    render: (row) => h(NuxtLink, { to: `/users/${row.id}` }, { default: () => row.info!.name })
  },
  {
    title: 'CCCD/CMND',
    key: 'info.cccd'
  },
  {
    title: 'Số Tiền Vay',
    key: 'loan.amount',
    render: (row) => $moneyFormat(row.loan?.amount)
  },
  {
    title: 'Trạng Thái',
    key: 'status',
    render(row): any {
      return h(
          NTag,
          {
            style: {
              marginRight: '6px'
            },
            type: 'info',
            bordered: false
          },
          {
            default: () => row.loan?.status === LoanStatus.PENDING ? 'Đang Chờ' : row.loan?.status === LoanStatus.APPROVED ? 'Đã Duyệt' : 'Đã Từ Chối'
          }
      )
    }
  },
  {
    title: 'Ngày Ký Hợp Đồng',
    key: 'loan.amount',
    render: (row) => $dayjs(row.loan?.createdAt).format('DD/MM/YYYY')
  },
  {
    title: 'Action',
    key: 'actions',
    render (row) {
      return h(
          NButton,
          {
            size: 'small',
            type: 'info',
            onClick: () => router.push(`/users/${row.id}`)
          },
          { default: () => 'Sửa' }
      )
    }
  }
])
const pagination = reactive<PaginationProps>({
  pageSize: 10
})
</script>
