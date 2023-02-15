<template>
  <n-space vertical :size="12">
    <n-data-table
        :bordered="false"
        :single-line="false"
        :columns="columns"
        :data="loans"
        :pagination="pagination"
    />
  </n-space>
</template>
<script lang="ts" setup>
import {PaginationProps} from "naive-ui/es/pagination/src/Pagination"
import {DataTableColumns, NButton, NTag} from "naive-ui";
import {GET_LOANS} from "~/apollo/queries/loan.query";
import {AdminLoans, AdminLoans_adminLoans, AdminLoansVariables} from "~/apollo/queries/__generated__/AdminLoans"
import {NuxtLink} from "#components";

const filter = reactive<AdminLoansVariables>({
  filter: {
    sort: 'createdAt',
    offset: 0,
    limit: 10

  }
})

const {$moneyFormat, $dayjs} = useNuxtApp()
const router = useRouter()
const {data} = useLazyAsyncQuery<AdminLoans>(GET_LOANS, filter)
const loans = computed<AdminLoans_adminLoans[]>(() => data.value?.adminLoans || [])
const columns = computed<DataTableColumns<AdminLoans_adminLoans>>(() => ([
  {
    title: 'Name',
    key: 'name',
    render: (row) => row.user.info?.name ? h(NuxtLink, {
          to: `/users/${row.user.id}`
        }, {default: () => row.user.info?.name})
        : '--'
  },
  {
    title: 'Số Tiền',
    key: 'amount',
    render: (row) => {
      return $moneyFormat(row.amount) + ' VNĐ'
    },
    sorter: (row1, row2) => row1.amount - row2.amount
  },
  {
    title: 'Lãi Suất',
    key: 'interest',
    render: (row) => {
      return row.interest + '%'
    }
  },
  {
    title: 'Trạng Thái',
    key: 'status',
    render: (row) => h(
        NTag,
        {
          style: {
            marginRight: '6px'
          },
          type: 'info',
          bordered: false
        },
        {
          default: () => row.status === LoanStatus.PENDING ? 'Đang Chờ' : row.status === LoanStatus.APPROVED ? 'Đã Duyệt' : 'Đã Từ Chối'
        }
    )
  },
  {
    title: 'Ngày Ký Hợp Đồng',
    key: 'createdAt',
    render: (row) => $dayjs(row.createdAt).format('DD/MM/YYYY'),
    sorter: (row1, row2) => row1.createdAt - row2.createdAt
  },
  {
    title: 'Action',
    key: 'actions',
    render(row) {
      return h(
          NButton,
          {
            size: 'small',
            type: 'info',
            onClick: () => router.push(`/users/${row.user.id}`)
          },
          {default: () => 'Sửa'}
      )
    }
  }
]))
const pagination = reactive<PaginationProps>({
  pageSize: 10
})
</script>
