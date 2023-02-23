<template>
  <n-space vertical :size="12">
    <n-data-table
        :bordered="false"
        :single-line="false"
        :columns="columns"
        :data="logbooks"
        :row-key="getRowKey"
        :pagination="pagination"
        :loading="loading"
    />

    <n-modal v-model:show="showModal" preset="dialog" title="Cập nhật">
      <n-form
          v-if="form"
          ref="formRef"
          :label-width="80"
          :model="form"
          :rules="rules"
      >
        <n-form-item label="Số tiền" path="amount">
          <n-input-number :min="1" v-model:value="form.amount" placeholder="Nhập số tiền rút"/>
        </n-form-item>
        <n-form-item label="Nội dung rút tiền" path="note">
          <n-input v-model:value="form.note" placeholder="Gi chú giao dịch"/>
        </n-form-item>

        <n-form-item
            label="Trạng Thái"
            path="status"
        >
          <n-select
              v-model:value="form.status"
              placeholder="Chọn trạng thái"
              :options="statusOptions"
          />
        </n-form-item>

      </n-form>


      <template #action>
        <n-button type="primary" @click="submit">
          Xác Nhận
        </n-button>
      </template>
    </n-modal>
  </n-space>
</template>

<script lang="ts" setup>
import {GET_LOGBOOKS} from "~/apollo/queries/loan.query";
import {
  AdminLogbooks,
  AdminLogbooks_adminLogbooks,
  AdminLogbooksVariables
} from "~/apollo/queries/__generated__/AdminLogbooks";
import {DataTableColumns, FormInst, FormItemRule, NButton, NTag} from "naive-ui";
import {NSpace, NuxtLink} from "#components";
import {PaginationProps} from "naive-ui/es/pagination/src/Pagination"
import {
  CreateCollaboratorInput,
  GetLogbooksFilter,
  LOGBOOK_GROUP,
  LOGBOOK_STATUS, UpdateCollaboratorInput,
  UpdateWithdrawInput
} from "~/apollo/__generated__/serverTypes";
import {UPDATE_WITHDRAW} from "~/apollo/mutates/loan.mutate";
import {AdminUpdateWithdraw, AdminUpdateWithdrawVariables} from "~/apollo/mutates/__generated__/AdminUpdateWithdraw";
import {FormRules} from "naive-ui/es/form/src/interface";
import {SelectMixedOption} from "naive-ui/es/select/src/interface";

const router = useRouter()
const message = useMessage()

const { result, loading } = useQuery<AdminLogbooks, AdminLogbooksVariables>(GET_LOGBOOKS, {
  filter: {
    limit: 10,
    offset: 0,
    sort: 'createdAt',
    group: [
      LOGBOOK_GROUP.WITHDRAW
    ]
  }
})
const logbooks = computed(() => result.value?.adminLogbooks || [])


const { mutate } = useMutation<AdminUpdateWithdraw, AdminUpdateWithdrawVariables>(UPDATE_WITHDRAW)
const form = ref<UpdateWithdrawInput>()
const rules = ref<FormRules>({
  amount: [
    {
      required: true,
      validator: (rule, value) => {
        if (value <= 0) {
          return Promise.reject('Số tiền phải lớn hơn 0')
        }
        return Promise.resolve()
      }
    }
  ]
})


const [showModal, toggleShowModal] = useToggle(false)
const statusOptions = computed<SelectMixedOption[]>(() => [
  {
    label: 'Đang Chờ',
    value: LOGBOOK_STATUS.PENDING
  },
  {
    label: 'Xác Nhận',
    value: LOGBOOK_STATUS.APPROVED
  },
  {
    label: 'Từ Chối',
    value: LOGBOOK_STATUS.REJECTED
  }
])
const formRef = ref<FormInst>()
const submit = () => {
  formRef.value?.validate((errors) => {
    if (errors) {
      return message.success('Vui lòng nhập đầy đủ thông tin')
    }
    toggleShowModal()
    // @ts-ignore
    mutate({
      input: form.value!
    })
  })
}

const getRowKey = (record: AdminLogbooks_adminLogbooks) => record.id
const { $dayjs, $moneyFormat } = useNuxtApp()
const columns = ref<DataTableColumns<AdminLogbooks_adminLogbooks>>([
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
                id: row.user.id
              }
            }
          },
          { default: () => row.user?.info?.name || '--' }
      )
    }
  },
  {
    title: 'CCCD',
    key: 'cccd',
    render: (row) => row.user.info?.cccd
  },
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
    title: 'Cộng Tác Viên',
    key: 'collaborator',
    render(row) {
      return h(
          NTag,
          {
            style: {
              marginRight: '6px'
            },
            type: 'success',
            bordered: false,
            onClick: () => router.push({
              name: 'collaborators-id',
              params: {
                id: row.user.collaborator!.id
              }
            })
          },
          {
            default: () => row.user.collaborator!.name
          }
      )
    }
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
            type: row.status === LOGBOOK_STATUS.PENDING ? 'info' : row.status === LOGBOOK_STATUS.APPROVED ? 'success' : 'error',
            bordered: false,
          },
          {
            default: () => row.status === LOGBOOK_STATUS.PENDING ? 'Đang Chờ' : row.status === LOGBOOK_STATUS.APPROVED ? 'Thành Công' : 'Từ Chối'
          }
      )
    }
  },
  {
    title: 'Ngày Yêu Cầu',
    key: 'createdAt',
    render: (row) => $dayjs(row.createdAt).format('DD/MM/YYYY hh:mm'),
    sorter: (row1, row2) => row1.createdAt - row2.createdAt
  },
  {
    title: 'Gi chú',
    key: 'note'
  },
  {
    title: 'Hành Động',
    key: 'actions',
    render (row) {
      return h(
          NSpace,
          { size: 'small' },
          {
            default: () => [
                h(
                    NButton, {
                      type: 'info',
                      onClick: () => {
                        form.value = {
                          amount: row.amount,
                          content: row.content,
                          id: row.id,
                          note: row.note,
                          status: LOGBOOK_STATUS.APPROVED
                        }
                        toggleShowModal(true)
                      },
                      disabled: row.status === LOGBOOK_STATUS.APPROVED
                    },
                    {
                      default: () => 'Duyệt'
                    }
                ),
              h(
                  NButton,
                  {
                    type: 'error'
                  },
                  {
                    default: () => 'Tù Chối'
                  }
              )
        ]
      })
    }
  }
])
const pagination = reactive<PaginationProps>({
  pageSize: 10
})
</script>

<style scoped></style>
