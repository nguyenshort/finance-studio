<template>
  <div>

    <n-spin :show="loading">
      <div class="flex -mx-4 -mt-4">
        <user-verify-form v-if="contract" :init-data="contract" class="w-1/3 px-4" ref="formVerifyRef" />
        <user-loan-form v-if="loan" :init-data="loan" class="w-1/3 px-4" ref="formLoanRef" />
        <user-bank-form v-if="bank" :init-data="bank" class="w-1/3 px-4" ref="formBankRef" />
      </div>

      <div class="flex">

        <div class="w-1/2 pr-2">
          <n-divider title-placement="left">Biến Động Số Dư</n-divider>

          <user-logbook-table ref="tableRef" />
        </div>

        <div class="w-1/2 pl-2">
          <n-divider title-placement="left">Yêu Cầu Rút Tiền</n-divider>

          <user-withdraw-table ref="table2Ref" />
        </div>
      </div>

    </n-spin>

    <layout-teleport to="#actions">

     <div class="flex items-center">

       <n-popconfirm
           v-if="status === LoanStatus.PENDING"
           @positive-click="quickApprove"
       >
         <template #trigger>
           <n-button type="error" :disabled="loading">
             Phê Duyệt
           </n-button>
         </template>
         Phê duyệt và cộng tiền cho khách hàng?
       </n-popconfirm>

       <div class="w-3"></div>

       <n-button type="success" @click="notifyBus.emit('add')" :disabled="loading">
         Thêm Giao Dịch
       </n-button>
<!--       <div class="w-3"></div>-->

<!--       <n-button type="success" @click="notifyBus.emit('subtract')" :disabled="loading">-->
<!--         Trừ Tiền-->
<!--       </n-button>-->

       <div class="w-3"></div>

       <n-button type="primary" @click="submit" :disabled="loading">
         Cập Nhật
       </n-button>
     </div>
    </layout-teleport>

    <user-logbook-modify />

  </div>
</template>

<script lang="ts" setup>
import {AdminLoan, AdminLoanVariables} from "~/apollo/queries/__generated__/AdminLoan";
import {AdminInfo} from "~/apollo/queries/__generated__/AdminInfo";
import {GET_INFO} from "~/apollo/queries/info.query";
import {ADMIN_BANK} from "~/apollo/queries/bank.query";
import {AdminBank} from "~/apollo/queries/__generated__/AdminBank";
import {LoanStatus} from "#imports";
import {
  AdminUpdateUserInput, UpdateBankInput,
  UpdateInfoInput,
  UpdateLoanInput,
  UpdateLogbookInput
} from "~/apollo/__generated__/serverTypes";
import {UPDATE_EXTRA} from "~/apollo/mutates/user.mutate";
import {UpdateCompile, UpdateCompileVariables} from "~/apollo/mutates/__generated__/UpdateCompile";
import {GET_LOAN_STATUS} from "~/apollo/queries/loan.query";
import {AdminLoanStatus} from "~/apollo/queries/__generated__/AdminLoanStatus";

/**
 * Section: Get contract data
 */
const route = useRoute()
const { data: loanData } = await useAsyncQuery<AdminLoan>(GET_LOAN, {
  filter: {user: route.params.id}
})
const loan = computed(() => toRaw(loanData.value?.adminLoan))

/**
 * Section: Get contract data
 */
const { data: infoData } = await useAsyncQuery<AdminInfo>(GET_INFO, {
  filter: {id: route.params.id}
})
const contract = computed(() => toRaw(infoData.value?.adminInfo))

const { data: bankData } = await useAsyncQuery<AdminBank>(ADMIN_BANK, {
  filter: {
    id: route.params.id
  }
})
const bank = computed(() => bankData.value?.adminBank)

const { result: dataStatus } = useQuery<AdminLoanStatus, AdminLoanVariables>(GET_LOAN_STATUS, {
  filter: {user: String(route.params.id)}
})
const status = computed(() => dataStatus.value?.adminLoan?.status)

// Ref Form
interface FormRef<T> {
  submit: () => Promise<T>
}
interface FormLoanRef extends FormRef<[UpdateLoanInput, AdminUpdateUserInput]> {
  quickApprove: () => Promise<void>
}

const formVerifyRef = ref<FormRef<UpdateInfoInput>>()
const formLoanRef = ref<FormLoanRef>()
const formBankRef = ref<FormRef<[UpdateBankInput, AdminUpdateUserInput]>>()
const tableRef = ref<{ refresh: () => Promise<void> }>()
const message = useMessage()

const { loading, mutate } = useMutation<UpdateCompile, UpdateCompileVariables>(UPDATE_EXTRA)
const logBookBus = useEventBus<string>('logbooks')
const submit = async () => {
  try {
    const inputs = await Promise.all([
      formVerifyRef.value!.submit(),
      formLoanRef.value!.submit(),
      formBankRef.value!.submit()
    ])
    const [info, loan, bank] = inputs
    await mutate({
      input: info,
      input1: loan[0],
      input2: {
        ...loan[1],
        /// ...bank[1]
      },
      input3: bank[0],
    })
    logBookBus.emit('refresh')
    message.success('Cập nhật thành công')
  } catch (e) {
    message.error('Kiểm tra lại thông tin')
  }
}
const quickApprove = async () => {
  try {
    await formLoanRef.value?.quickApprove()
    logBookBus.emit('refresh')
  } catch (e) {
    console.log(e)
    //
  }
}
const notifyBus = useEventBus<string, (UpdateLogbookInput | undefined )>('modify-logbook')
</script>

<style scoped></style>
