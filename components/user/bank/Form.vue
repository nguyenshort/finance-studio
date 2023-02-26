<template>
  <div>
    <n-divider title-placement="left">
      Tài Khoản Ngân Hàng
    </n-divider>
    <n-form
        ref="formRef"
        :rules="rules"
        :model="form"
        :label-width="160"
    >
      <n-form-item label="Tên người nhận" path="name">
        <n-input v-model:value="form.name" placeholder="Tên người nhận" @keydown.enter="debouncedUpdate" />
      </n-form-item>
      <n-form-item label="Ngân hàng" path="user.collaborator.id">
        <n-select
            v-model:value="form.bank"
            :options="banks"
            placeholder="Chọn ngân hàng hưởng thụ"
        />
      </n-form-item>
      <n-form-item label="Số tài khoản" path="account">
        <n-input v-model:value="form.account" placeholder="Số tài khoản" @keydown.enter="debouncedUpdate" />
      </n-form-item>
    </n-form>

    <n-image-group class="w-full">
      <div v-if="identity" class="flex">
      <div class="w-1/3 pr-4">

        <div class="relative aspect-w-3 aspect-h-4">
          <n-image :src="$cdn(identity.avatar)" alt="" class="w-full h-full object-cover" />
        </div>

      </div>
      <div class="w-2/3">

        <div class="relative aspect-w-8 aspect-h-5 w-full">
          <n-image :src="$cdn(identity.front)" alt="" class="w-full h-full object-cover" />
        </div>

        <div class="relative aspect-w-8 aspect-h-5 mt-4 w-full">
          <n-image :src="$cdn(identity.front)" alt="" class="w-full h-full object-cover" />
        </div>

      </div>
    </div>
    </n-image-group>
  </div>
</template>

<script lang="ts" setup>
import {AdminBank_adminBank} from "~/apollo/queries/__generated__/AdminBank"
import {FormRules} from "naive-ui/es/form/src/interface"
import {SelectMixedOption} from "naive-ui/es/select/src/interface";
import {UPDATE_BANK} from "~/apollo/mutates/user.mutate";
import {UpdateBank, UpdateBankVariables} from "~/apollo/mutates/__generated__/UpdateBank";
import {FormInst} from "naive-ui";
import {GET_ID} from "#imports";
import {AdminIdentity, AdminIdentityVariables} from "~/apollo/queries/__generated__/AdminIdentity";

const props = defineProps<{
  initData: AdminBank_adminBank
}>()

const formRef = ref<FormInst>()
const form = ref<AdminBank_adminBank>(JSON.parse(JSON.stringify(props.initData)))
const rules = computed<FormRules>(() => ({
  name: [
    {
      required: true,
      message: 'Tên là bắt buộc',
      trigger: 'blur'
    }
  ],
  account: [
    {
      required: true,
      message: 'Số tài khoản là bắt buộc',
      trigger: 'blur'
    }
  ],
  bank: [
    {
      required: true,
      message: 'Ngân hàng là bắt buộc',
      trigger: 'blur'
    }
  ]
}))

const res = useFetch<{
  data: any[]
}>('https://api.vietqr.io/v2/banks')
const banksData = computed(() => res.data.value?.data || [])

const banks = computed<SelectMixedOption[]>(() => {
  return banksData.value.map((item: any) => {
    return {
      label: item.shortName,
      value: item.code
    }
  })
})

const { mutate, loading } = useMutation<UpdateBank, UpdateBankVariables>(UPDATE_BANK)

const submit = async () => {
  formRef.value?.validate((errors) => {
    if (errors) {
      throw new Error('Form is not valid')
    }
    mutate({
      input: {
        account: form.value.account,
        bank: form.value.bank,
        name: form.value.name,
        id: form.value.id
      }
    })
  })
}

const message = useMessage()
const debouncedUpdate = useDebounceFn(async () => {
  try {
    await submit()
    message.success('Cập nhật thành công')
  } catch (e) {
    // console.log(e)
  }
}, 500)

const route = useRoute()
const { result } = useQuery<AdminIdentity, AdminIdentityVariables>(GET_ID, {
  filter: {
    user: route.params.id as string
  }
})
const identity = computed(() => result.value?.adminIdentity)

defineExpose({
  submit,
  loading
})
</script>

<style scoped></style>
