<template>
  <n-modal v-model:show="show" preset="dialog" title="Tuỳ biến giao dịch">

    <n-form
        v-if="form"
        ref="formRef"
        :label-width="80"
        :model="form"
        :rules="rules"
    >
      <n-form-item label="Số tiền" path="amount">
        <n-input-number :min="1" v-model:value="form.amount" placeholder="Nhập số tiền rút" class="w-full" :step="500000" />
      </n-form-item>

      <n-form-item label="Nội dung" path="content">
        <n-input v-model:value="form.content" placeholder="Nội dung giao dịch" type="textarea"/>
      </n-form-item>

      <div class="flex">
        <n-form-item label="Nhóm giao dịch" path="group" class="w-full">
          <n-select
              v-model:value="form.group"
              placeholder="Chọn nhóm giao dịch"
              :options="groupOptions"
          />
        </n-form-item>

        <div class="w-5 flex-shrink-0"></div>

        <n-form-item label="Thay đổi số dư" path="effective" class="w-full">
          <n-switch :disabled="!isCreate" v-model:value="form.effective" />
        </n-form-item>
      </div>

      <div class="flex">
        <n-form-item
            label="Trạng Thái"
            path="status"
            class="w-full"
        >
          <n-select
              v-model:value="form.status"
              placeholder="Chọn trạng thái"
              :options="statusOptions"
          />
        </n-form-item>

        <div class="w-3 flex-shrink-0"/>

        <n-form-item
            label="Trạng Thái"
            path="status"
            class="w-full"
        >
          <n-select
              v-model:value="form.type"
              placeholder="Chọn trạng thái"
              :options="typeOptions"
          />
        </n-form-item>
      </div>
      <n-form-item label="Gi chú rút tiền" path="note">
        <n-input v-model:value="form.note" placeholder="Gi chú giao dịch"/>
      </n-form-item>
      <p v-if="form.effective" class="-mt-3 text-[13px] text-rose-500">
        Thao tác này sẽ {{ form.type === LOGBOOK_TYPE.ADD ? 'cộng' : 'trừ' }} {{ $moneyFormat(Number(form.amount || 0)) }} VNĐ vào số dư của khách
      </p>
      <p v-else class="-mt-3 text-[13px] text-gray-500">
        Thêm giao dịch này sẽ không làm thay đổi số dư của khách
      </p>
    </n-form>


    <template #action>
      <n-button type="error" @click="() => toggle(false)">
        Huỷ
      </n-button>
      <n-button type="primary" @click="submit">
        {{ isCreate ? 'Tạo' : 'Cập nhật' }}
      </n-button>
    </template>
  </n-modal>
</template>

<script lang="ts" setup>
import {CREATE_LOGBOOK, UPDATE_LOGBOOK} from "~/apollo/mutates/user.mutate";
import {AdminCreateLogbook, AdminCreateLogbookVariables} from "~/apollo/mutates/__generated__/AdminCreateLogbook";
import {
  CreateLogbookInput,
  LOGBOOK_GROUP,
  LOGBOOK_STATUS,
  LOGBOOK_TYPE,
  UpdateLogbookInput
} from "~/apollo/__generated__/serverTypes";
import {FormRules} from "naive-ui/es/form/src/interface";
import {SelectMixedOption} from "naive-ui/es/select/src/interface";
import {FormInst} from "naive-ui";
import {AdminUpdateLogbook, AdminUpdateLogbookVariables} from "~/apollo/mutates/__generated__/AdminUpdateLogbook";

const [show, toggle] = useToggle(false)
const [isCreate, toggleCreate] = useToggle(true)

const form = ref<Omit<CreateLogbookInput, 'user'> | UpdateLogbookInput>({
  amount: 0,
  content: '',
  effective: true,
  group: LOGBOOK_GROUP.LOAN,
  note: '',
  status: LOGBOOK_STATUS.APPROVED,
  type: LOGBOOK_TYPE.ADD
})

const { mutate: createLogbook, loading: creatingLogbook } = useMutation<AdminCreateLogbook, AdminCreateLogbookVariables>(CREATE_LOGBOOK)
const { mutate: updateLogbook, loading: updatingLogbook } = useMutation<AdminUpdateLogbook, AdminUpdateLogbookVariables>(UPDATE_LOGBOOK)


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

const typeOptions = computed<SelectMixedOption[]>(() => [
  {
    label: 'Cộng Tiền',
    value: LOGBOOK_TYPE.ADD
  },
  {
    label: 'Trừ Tiền',
    value: LOGBOOK_TYPE.SUBTRACT
  }
])

const groupOptions = computed<SelectMixedOption[]>(() => [
  {
    label: 'Hợp Đồng',
    value: LOGBOOK_GROUP.LOAN
  },
  {
    label: 'Rút Tiền',
    value: LOGBOOK_GROUP.WITHDRAW
  }
])
const formRef = ref<FormInst>()

const route = useRoute()
const newLogbook = async () => {
  try {
    const _form = form.value as Omit<CreateLogbookInput, 'user'>
    createLogbook({
      input: {
        amount: _form.amount,
        content: _form.content,
        effective: _form.effective,
        group: _form.group,
        note: _form.note,
        status: _form.status,
        type: _form.type,
        user: String(route.params.id)
      }
    })
  } catch (e) {
    //
  }
}

const updateLogbookHandle = async () => {
  try {
    const _form = form.value as UpdateLogbookInput
    updateLogbook({
      input: {
        amount: _form.amount,
        content: _form.content,
        group: _form.group,
        note: _form.note,
        status: _form.status,
        type: _form.type,
        id: _form.id
      }
    })
  } catch (e) {
    //
  }
}

const bus2 = useEventBus<string>('logbooks')
const bus3 = useEventBus<string>('balance')
const submit = () => {
  formRef.value?.validate(async (errors) => {
    if (errors) {
      throw new Error('Form is not valid')
    }

    if (isCreate.value) {
      await newLogbook()
    } else {
      await updateLogbookHandle()
    }

    toggle(false)

    bus2.emit('refresh')

    setTimeout(() => {
      bus3.emit('refresh2')
    }, 1000)

  })
}

const bus = useEventBus<string, (UpdateLogbookInput | undefined )>('modify-logbook')
bus.on((event: string, payload) => {
  if(event === 'new') {
    toggleCreate(true)
    form.value = {
      amount: 0,
      content: '',
      effective: true,
      group: LOGBOOK_GROUP.LOAN,
      note: '',
      status: LOGBOOK_STATUS.APPROVED,
      type: LOGBOOK_TYPE.ADD
    }
  } else if(event === 'add') {
    toggleCreate(true)
    form.value = {
      amount: 0,
      content: '',
      effective: true,
      group: LOGBOOK_GROUP.LOAN,
      note: '',
      status: LOGBOOK_STATUS.APPROVED,
      type: LOGBOOK_TYPE.ADD
    }
  } else if (event === 'subtract') {
    toggleCreate(true)
    form.value = {
      amount: 0,
      content: '',
      effective: true,
      group: LOGBOOK_GROUP.LOAN,
      note: '',
      status: LOGBOOK_STATUS.APPROVED,
      type: LOGBOOK_TYPE.SUBTRACT
    }
  } else {
    toggleCreate(false)
    form.value = JSON.parse(JSON.stringify(payload))
     if (event === 'reject') {
      form.value.status = LOGBOOK_STATUS.REJECTED
    } else if (event === 'approve') {
      form.value.status = LOGBOOK_STATUS.APPROVED
    }
  }
  toggle(true)
})
</script>

<style scoped></style>
