<template>
  <n-space vertical :size="12">
    <n-data-table
        :bordered="false"
        :single-line="false"
        :columns="columns"
        :data="clients"
        :row-key="getRowKey"
        :pagination="pagination"
    />
  </n-space>
</template>
<script lang="ts" setup>
import {PaginationProps} from "naive-ui/es/pagination/src/Pagination"
import {DataTableColumns, NButton, NTag} from "naive-ui"
import { NuxtLink } from "#components";

import {GET_COLLABORATOR} from "~/apollo/queries/collaborator.query"
import {
  GetCollaborator,
  GetCollaborator_collaborator,
  GetCollaborator_collaborator_clients
} from "~/apollo/queries/__generated__/GetCollaborator";

definePageMeta({
  middleware: ['collaborator'],
})

/**
 * Section: Get data
 */
const route = useRoute()
const router = useRouter()
const { data } = await useAsyncQuery<GetCollaborator>(GET_COLLABORATOR, {
  filter: {
    id: route.params.id
  }
})
const collaborator = computed<GetCollaborator_collaborator>(() => data.value!.collaborator)
const clients = computed<GetCollaborator_collaborator_clients[]>(() => collaborator.value.clients || [])

/**
 * Section: Setup Table
 */
const { $dayjs, $moneyFormat } = useNuxtApp()
const getRowKey = (user: GetCollaborator_collaborator_clients) => user.id
const columns = ref<DataTableColumns<GetCollaborator_collaborator_clients>>([
  {
    title: 'Tên',
    key: 'info.name',
    render: (row) => h(NuxtLink, { to: `/loans/${row.loan?.id}` }, { default: () => row.info!.name })
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
            onClick: () => router.push(`/loans/${row.loan?.id}`)
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
