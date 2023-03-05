<template>
  <n-space vertical :size="12">


    <div class="flex">

      <div class="mr-3">
        <layout-input v-model:value="filter.name" placeholder="Nhập tên" />
      </div>

      <div class="mr-3">
        <layout-input v-model:value="filter.cccd" placeholder="Nhập CCCD" />
      </div>


      <div class="mr-3">
        <layout-input v-model:value="filter.email" placeholder="Nhập sđt" />
      </div>

      <n-button type="error" class="mr-3" @click="reset">Xoá</n-button>

    </div>

    <n-data-table
        :key="tableKey"
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
import {GetUsers, GetUsers_users} from "~/apollo/queries/__generated__/GetUsers"
import { NuxtLink, LayoutInput } from "#components"

const router = useRouter()


const filter = reactive({
  name: '',
  cccd: '',
  email: ''
})

const reset = () => {
  filter.name = ''
  filter.cccd = ''
  filter.email = ''
}

const { result, loading } = useQuery<GetUsers>(GET_USERS)
const users = computed<GetUsers_users[]>(() => (result.value?.users || [])
    .filter(user => user.info?.name?.includes(filter.name))
    .filter(user => user.info?.cccd?.includes(filter.cccd))
    .filter(user => user.email?.includes(filter.email))
)
const getRowKey = (user: GetUsers_users) => user.id
const { $dayjs } = useNuxtApp()

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
          { default: () => row.info?.name || '--' }
      )
    }
  },
  {
    title: 'CCCD',
    key: 'cccd',
    render(row): any {
      return h(
          NTag,
          {
            style: {
              marginRight: '6px'
            },
            type: 'info',
            bordered: false,
            // click
            onClick: () => router.push('/users/' + row.id)
          },
          {
            default: () => row.info?.cccd
          }
      )
    }
  },
  {
    title: 'SĐT',
    key: 'email',
    render(row) {
      return h(
          NTag,
          {
            style: {
              marginRight: '6px'
            },
            type: 'info',
            bordered: false,
            onClick: () => router.push('/users/' + row.id)
          },
          {
            default: () => row.email
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
    render: (row) => h('span', {
      onClick: () => router.push('/users/' + row.id)
    }, { default: () => $dayjs(row.createdAt).format('DD/MM/YYYY') }),
    sorter: (row1, row2) => row1.createdAt - row2.createdAt
  },
  {
    title: 'Hành Động',
    key: 'action',
    render: (row) => h(NButton, {
      type: 'info',
      onClick: () => {

      }
    }, { default: () => 'Đổi Mật Khẩu' })
  }
])
const pagination = reactive<PaginationProps>({
  pageSize: 10
})
</script>
