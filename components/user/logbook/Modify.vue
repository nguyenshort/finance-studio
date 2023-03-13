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
        <n-input-number v-model:value="form.amount" placeholder="Nhập số tiền rút" class="w-full" :step="1" />
      </n-form-item>

      <n-form-item label="Nội dung" path="note">
        <n-input v-model:value="form.note" placeholder="Nội dung giao dịch" type="textarea"/>
      </n-form-item>
    </n-form>


    <template #action>
      <n-button type="error" @click="() => toggle(false)">
        Huỷ
      </n-button>
      <n-button type="primary" @click="submit(true)">
        Cộng Tiền
      </n-button>
      <n-button type="primary" @click="submit(false)">
        Trừ Tiền
      </n-button>
    </template>
  </n-modal>
</template>

<script lang="ts" setup>
import {CREATE_LOGBOOK, UPDATE_LOGBOOK} from "~/apollo/mutates/user.mutate";
import {AdminCreateLogbook, AdminCreateLogbookVariables} from "~/apollo/mutates/__generated__/AdminCreateLogbook";
import {
  CreateLogbookInput,
  UpdateLogbookInput
} from "~/apollo/__generated__/serverTypes";
import {FormRules} from "naive-ui/es/form/src/interface";
import {FormInst} from "naive-ui";
import {AdminUpdateLogbook, AdminUpdateLogbookVariables} from "~/apollo/mutates/__generated__/AdminUpdateLogbook";

const [show, toggle] = useToggle(false)

const form = ref<Omit<CreateLogbookInput, 'user'> | UpdateLogbookInput>({
  amount: 0,
  note: ''
})

const realAmount = computed(() => form.value.amount! * 1000000)

const { mutate: createLogbook } = useMutation<AdminCreateLogbook, AdminCreateLogbookVariables>(CREATE_LOGBOOK)


const rules = ref<FormRules>({
  amount: [
    {
      required: true,
      validator: (rule, value) => {
        if (value === 0) {
          return Promise.reject('Số tiền phải khác 0')
        }
        return Promise.resolve()
      }
    }
  ]
})
const formRef = ref<FormInst>()

const route = useRoute()
const newLogbook = async () => {
  try {
    const _form = form.value as Omit<CreateLogbookInput, 'user'>
    createLogbook({
      input: {
        amount: realAmount.value,
        note: _form.note,
        user: String(route.params.id)
      }
    })
  } catch (e) {
    //
  }
}

const bus2 = useEventBus<string>('logbooks')
const submit = (inc: boolean) => {
  formRef.value?.validate(async (errors) => {
    if (errors) {
      throw new Error('Form is not valid')
    }
    form.value.amount = inc ? Math.abs(form.value.amount!) : -Math.abs(form.value.amount!)
    await newLogbook()
    toggle(false)
    bus2.emit('refresh')
  })
}

const bus = useEventBus<string, (UpdateLogbookInput | undefined )>('modify-logbook')
bus.on(() => {
  form.value = {
    amount: 0,
    note: ''
  }
  toggle(true)
})
</script>

<style scoped></style>
