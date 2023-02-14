<template>
  <n-space vertical :size="12">
    <n-data-table
        :bordered="false"
        :single-line="false"
        :columns="columns"
        :data="users"
        :row-key="getRowKey"
        :pagination="pagination"
        :loading="loading"
    />
  </n-space>
</template>
<script lang="ts" setup>
import {PaginationProps} from "naive-ui/es/pagination/src/Pagination"
import {DataTableColumns, NButton, NTag} from "naive-ui"
import {GetUsers, GetUsers_users, GetUsersVariables} from "~/apollo/queries/__generated__/GetUsers"
import { NuxtLink } from "#components"

const router = useRouter()

const filter = reactive<GetUsersVariables>({
  filter: {
    limit: 10,
    offset: 0,
    sort: 'createdAt'
  }
})
const { result, loading } = useQuery<GetUsers, GetUsersVariables>(GET_USERS, filter)
const users = computed<GetUsers_users[]>(() => result.value?.users || [])
const getRowKey = (user: GetUsers_users) => user.id
const columns = ref<DataTableColumns<GetUsers_users>>([
  {
    title: 'Tên',
    key: 'name',
    render(row) {
      return h(
          NuxtLink,
          {
            to: {
              name: 'users-id',
              params: {
                id: row.id
              }
            }
          },
          { default: () => row.name }
      )
    }
  },
  {
    title: 'Số Dư',
    key: 'balance',
    sorter: (row1, row2) => row1.balance - row2.balance
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
    title: 'Cộng Tác Viên',
    key: 'collaborator',
    render(row) {
      return !row.collaborator ? '' : h(
          NTag,
          {
            style: {
              marginRight: '6px'
            },
            type: 'success',
            bordered: false,
            // click to
            onClick: () => router.push({
              name: 'collaborators-id',
              params: {
                id: row.collaborator!.id
              }
            })
          },
          {
            default: () => row.collaborator?.name
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
            type: 'error',
            onClick: () => {
              console.log(row)
            }
          },
          { default: () => 'Xoá' }
      )
    }
  }
])
const pagination = reactive<PaginationProps>({
  pageSize: 10
})
</script>
