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

import {GET_COLLABORATOR} from "~/apollo/queries/collaborator.query"
import {
  GetCollaborator,
  GetCollaborator_collaborator,
  GetCollaborator_collaborator_clients
} from "~/apollo/queries/__generated__/GetCollaborator";

definePageMeta({
  middleware: ['collaborator'],
})

const route = useRoute()
const { data } = await useAsyncQuery<GetCollaborator>(GET_COLLABORATOR, {
  filter: {
    id: route.params.id
  }
})
const collaborator = computed<GetCollaborator_collaborator>(() => data.value!.collaborator)
const clients = computed<GetCollaborator_collaborator_clients[]>(() => collaborator.value.clients || [])
const getRowKey = (user: GetCollaborator_collaborator_clients) => user.id
const columns = ref<DataTableColumns<GetCollaborator_collaborator_clients>>([
  {
    title: 'Tên',
    key: 'name'
  },
  {
    title: 'Số Dư',
    key: 'balance'
  },
  {
    title: 'Số Điện Thoại',
    key: 'email',
    render(row) {
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
            default: () => row.email?.split('@')[0]
          }
      )
    }
  },
  {
    title: 'Số Tiền Vay',
    key: 'loan.amount',
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
    title: 'Action',
    key: 'actions',
    render (row) {
      return h(
          NButton,
          {
            size: 'small',
            type: 'info',
            onClick: () => {
              console.log(row)
            }
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
