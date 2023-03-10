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

    <n-divider title-placement="left">Thông Tin Bổ Sung</n-divider>

    <n-form
        ref="formRef2"
        :rules="rules2"
        :model="form2"
    >
      <n-form-item label="Số dư tài khoản" path="balance">
        <n-input-number v-model:value.number="form2.balance" placeholder="Số dư tài khoản" @keydown.enter="debouncedUpdate2" class="w-full" :min="0" />
      </n-form-item>
    </n-form>

    <n-image-group class="w-full">
      <div v-if="identity" class="flex -mx-1.5">
        <div class="w-1/3 px-1.5">
          <n-image :src="$cdn(identity.avatar)" alt="" class="w-full h-full object-cover" />
        </div>

        <div class="w-1/3 px-1.5">
          <n-image :src="$cdn(identity.front)" alt="" class="w-full h-full object-cover" />
        </div>

        <div class="w-1/3 px-1.5">
          <n-image :src="$cdn(identity.back)" alt="" class="w-full h-full object-cover" />
        </div>
    </div>
    </n-image-group>


  </div>
</template>

<script lang="ts" setup>
import {AdminBank_adminBank} from "~/apollo/queries/__generated__/AdminBank"
import {FormRules} from "naive-ui/es/form/src/interface"
import {SelectMixedOption} from "naive-ui/es/select/src/interface";
import {CHANGE_BALANCE, UPDATE_BANK} from "~/apollo/mutates/user.mutate";
import {UpdateBank, UpdateBankVariables} from "~/apollo/mutates/__generated__/UpdateBank";
import {FormInst} from "naive-ui";
import {GET_ID} from "#imports";
import {AdminIdentity, AdminIdentityVariables} from "~/apollo/queries/__generated__/AdminIdentity";
import {AdminUserBalance, AdminUserBalanceVariables} from "~/apollo/queries/__generated__/AdminUserBalance";
import {GET_USER_BALANCE} from "~/apollo/queries/user.query";
import {
  AdminUpdateUserBalance,
  AdminUpdateUserBalanceVariables
} from "~/apollo/mutates/__generated__/AdminUpdateUserBalance";
import {AdminUpdateUserInput, UpdateBankInput} from "~/apollo/__generated__/serverTypes";

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

const message = useMessage()
const route = useRoute()
const { result } = useQuery<AdminIdentity, AdminIdentityVariables>(GET_ID, {
  filter: {
    user: route.params.id as string
  }
})
const identity = computed(() => result.value?.adminIdentity)

// user balance
const formRef2 = ref<FormInst>()
const form2 = ref<Pick<AdminUpdateUserInput, 'balance'>>({
  balance: 0
})
const { onResult, refetch } = useQuery<AdminUserBalance, AdminUserBalanceVariables>(GET_USER_BALANCE, {
  filter: {
    id: route.params.id as string
  }
}, { fetchPolicy: 'network-only' })
onResult((res) => {
  if(res.data?.adminUser) {
    form2.value.balance = res.data.adminUser.balance
  }
})
const rules2 = computed<FormRules>(() => ({
  balance: [
    {
      required: true,
      trigger: 'blur',
      validator: (rule, value) => {
        if (value >= 0) {
          return Promise.resolve()
        }
        return Promise.reject('Số dư phải lớn hơn 0')
      },
    }
  ]
}))


const { mutate, loading } = useMutation<UpdateBank, UpdateBankVariables>(UPDATE_BANK)
const { mutate: updateBalance } = useMutation<AdminUpdateUserBalance, AdminUpdateUserBalanceVariables>(CHANGE_BALANCE)

const submitBank = async () => {
  // covert callback to promise
  return new Promise<UpdateBankInput>((resolve, reject) => {
    formRef.value?.validate((errors) => {
      if (errors) {
        reject(new Error('Form is not valid'))
      }
      resolve({
        account: form.value.account,
        bank: form.value.bank,
        name: form.value.name,
        id: form.value.id
      })
    })
  })
}
const submitBalance = async () => {
  return new Promise<AdminUpdateUserInput>((resolve, reject) => {
    formRef2.value?.validate((errors) => {
      if (errors) {
        reject(new Error('Form is not valid'))
      }
      resolve({
        user: route.params.id as string,
        balance: form2.value.balance
      })
    })
  })
}
/**
 * Debounce function
 */
const debouncedUpdate = useDebounceFn(async () => {
  try {
    const data = await submitBank()
    await mutate({
      input: data
    })
    message.success('Cập nhật thành công')
  } catch (e) {
    //
  }
}, 500)
const debouncedUpdate2 = useDebounceFn(async () => {
  try {
    const data = await submitBalance()
    await updateBalance({
      input: data
    })
    message.success('Cập nhật thành công')
  } catch (e) {
    //
  }
}, 500)


const submit = async () => {
  return Promise.all([
    submitBank(),
    submitBalance()
  ])
}

const listener = (event: string) => {
  if(event === 'refresh') {
    refetch()
  }
}
const balanceBus = useEventBus<string>('balance')
balanceBus.on(listener)

defineExpose({
  submit
})
</script>

<style scoped></style>
