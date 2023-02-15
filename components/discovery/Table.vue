<template>
  <n-data-table
      :bordered="false"
      :single-line="false"
      :columns="columns"
      :data="users"
      :row-key="getRowKey"
      :pagination="pagination"
  />
</template>

<script lang="ts" setup>
import { AdminRangeUsers_adminRangeUsers} from "~/apollo/queries/__generated__/AdminRangeUsers";
import {DataTableColumns, NButton, NTag} from "naive-ui";
import {PaginationProps} from "naive-ui/es/pagination/src/Pagination";
import {NuxtLink} from "#components";

const props = defineProps<{
  users: AdminRangeUsers_adminRangeUsers[]
}>()

const getRowKey = (user: AdminRangeUsers_adminRangeUsers) => user.id

const router = useRouter()
const { $dayjs } = useNuxtApp()
const columns = ref<DataTableColumns<AdminRangeUsers_adminRangeUsers>>([
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
          { default: () => row.info?.name || '--' }
      )
    }
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
    title: 'Ngày Tham Gia',
    key: 'createdAt',
    render: (row) => $dayjs(row.createdAt).format('DD/MM/YYYY hh:mm'),
    sorter: (row1, row2) => row1.createdAt - row2.createdAt
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
            onClick: () => router.push({
              name: 'users-id',
              params: {
                id: row.id
              }
            })
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

<style scoped>

</style>