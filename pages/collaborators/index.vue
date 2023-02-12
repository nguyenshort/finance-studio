<template>
  <div>
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

    <layout-teleport to="#actions">
      <n-button type="primary" @click="openModifyModal({ name: '', fanpage: '' })">
        <Icon name="ic:twotone-plus" class="mr-1"/>
        CTV
      </n-button>
    </layout-teleport>

    <n-modal v-model:show="showModal" preset="dialog" title="Dialog">
      <template #header>
        <div>
          {{ form.id ? 'Cập Nhật' : 'Tạo Mới' }}
        </div>
      </template>


      <n-form
          ref="formRef"
          :label-width="80"
          :model="form"
          :rules="rules"
      >
        <n-form-item label="Tên" path="name">
          <n-input v-model:value="form.name" placeholder="Tên cộng tác viên"/>
        </n-form-item>
        <n-form-item label="Fanpage" path="fanpage">
          <n-input v-model:value="form.fanpage" placeholder="Đường dẫn tới trang"/>
        </n-form-item>

        <n-form-item
            v-if="form.id"
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

  </div>
</template>
<script lang="ts" setup>
import {PaginationProps} from "naive-ui/es/pagination/src/Pagination"
import {DataTableColumns, FormInst, FormItemRule, NButton, NTag} from "naive-ui"
import {CreateCollaboratorInput, UpdateCollaboratorInput} from "~/apollo/__generated__/serverTypes";
import {FormRules} from "naive-ui/es/form/src/interface";
import {CreateCollaborator, CreateCollaboratorVariables} from "~/apollo/mutates/__generated__/CreateCollaborator";
import {
  GetCollaborators,
  GetCollaborators_collaborators,
  GetCollaboratorsVariables
} from "~/apollo/queries/__generated__/GetCollaborators";
import {GET_COLLABORATORS} from "~/apollo/queries/collaborator.query";
import {NSpace} from "#components"
import {UpdateCollaborator, UpdateCollaboratorVariables} from "~/apollo/mutates/__generated__/UpdateCollaborator";
import {TOGGLE_COLLABORATOR, UPDATE_COLLABORATOR} from "~/apollo/mutates/collaborator.mutate";
import {ToggleCollaborator} from "~/apollo/mutates/__generated__/ToggleCollaborator";
import {SelectMixedOption} from "naive-ui/es/select/src/interface";

const message = useMessage()

/**
 * Section: Query Data
 */
const filter = reactive<GetCollaboratorsVariables>({
  filter: {
    limit: 10,
    offset: 0,
    sort: 'createdAt'
  }
})
const {result, loading, refetch} = useQuery<GetCollaborators, GetCollaboratorsVariables>(GET_COLLABORATORS, filter)
const users = computed<GetCollaborators_collaborators[]>(() => result.value?.collaborators || [])

const { $apollo } = useNuxtApp()

/**
 * Section: Toggle Status
 */
const {
  mutate: toggleStatus,
  loading: isToggling,
  onDone: afterToggling
} = useMutation<ToggleCollaborator, ToggleCollaborator>(TOGGLE_COLLABORATOR)

/**
 * Section: Create
 */
const {
  mutate: createCollaborator,
  loading: creatingCollaborator,
  onDone: afterCreated
} = useMutation<CreateCollaborator, CreateCollaboratorVariables>(CREATE_COLLABORATOR)
afterCreated((val) => {
  formRef.value?.restoreValidation()
  val.data?.createCollaborator && refetch()
})

/**
 * Section: Update
 */
const {
  mutate: updateCollaborator,
  loading: updatingCollaborator
} = useMutation<UpdateCollaborator, UpdateCollaboratorVariables>(UPDATE_COLLABORATOR)
const statusOptions = computed<SelectMixedOption[]>(() => [
  {
    label: 'Hoạt Động',
    value: COLLABORATOR_STATUS.ACTIVE
  },
  {
    label: 'Tạm Ngưng',
    value: COLLABORATOR_STATUS.INACTIVE
  }
])

/**
 * Section: Table Data
 */
const getRowKey = (user: GetCollaborators_collaborators) => user.id
const columns = ref<DataTableColumns<GetCollaborators_collaborators>>([
  {
    title: 'Tên',
    key: 'name'
  },
  {
    title: 'Fanpage',
    key: 'fanpage',
    render(row) {
      return h(
          'a',
          {
            href: row.fanpage,
            target: '_blank'
          },
          {default: () => row.fanpage}
      )
    }
  },
  {
    title: 'Khách Hàng',
    key: 'status',
    render(row) {
      return h(NTag, {type: 'info'}, {default: () => row.clients.length})
    }
  },
  {
    title: 'Trạng Thái',
    key: 'status',
    render(row) {
      return h(NTag, {
            type: row.status === COLLABORATOR_STATUS.ACTIVE ? 'success' : 'error',
            onClick: () => row.status === COLLABORATOR_STATUS.ACTIVE ? toggleStatus({
              // @ts-ignore
              input: {
                id: row.id,
                status: COLLABORATOR_STATUS.INACTIVE
              }
            }) : toggleStatus({
              // @ts-ignore
              input: {
                id: row.id,
                status: COLLABORATOR_STATUS.ACTIVE
              }
            })
          },
          {
            default: () => row.status === COLLABORATOR_STATUS.ACTIVE ? 'Hoạt Động' : 'Tạm Ngưng'
          }
      )
    }
  },
  {
    title: 'Action',
    key: 'actions',
    render(row) {
      return h(NSpace, {size: 'small'}, {
        default: () => [
          h(NButton, {
            type: 'info',
            onClick: () => openModifyModal({ id: row.id, name: row.name, fanpage: row.fanpage, status: row.status })
          }, {default: () => 'Sửa'}),
          h(NButton, {type: 'error'}, {default: () => 'Xóa'})
        ]
      })
    }
  }
])
const pagination = reactive<PaginationProps>({
  pageSize: 10
})

/**
 * Section: Modal Modify
 */
const [showModal, toggleShowModal] = useToggle(false)
const formRef = ref<FormInst>()
const form = ref<UpdateCollaboratorInput | CreateCollaboratorInput>({
  id: '',
  name: '',
  fanpage: '',
})
const openModifyModal = (initValue: UpdateCollaboratorInput | CreateCollaboratorInput) => {
  form.value = initValue
  toggleShowModal()
}
const rules = ref<FormRules>({
  name: [
    {
      required: true,
      message: 'Tên là bắt buộc'
    }
  ],
  fanpage: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Vui lòng nhập đường dẫn')
        } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(value)) {
          return new Error('Đường dẫn không hợp lệ')
        }
        return true
      },
    }
  ]
})
const submit = () => {
  formRef.value?.validate((errors) => {
    if (errors) {
      return message.success('Vui lòng nhập đầy đủ thông tin')
    }
    toggleShowModal()
    // @ts-ignore
    if (form.value?.id) {
      updateCollaborator({
        input: form.value as UpdateCollaboratorInput
      })
    } else {
      createCollaborator({
        input: form.value as CreateCollaboratorInput
      })
    }
  })
}
</script>
