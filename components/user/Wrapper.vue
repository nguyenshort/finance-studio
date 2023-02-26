<template>
  <div>

    <n-spin :show="loading">
      <div class="flex -mx-4 -mt-4">
        <user-verify-form v-if="contract" :init-data="contract" class="w-1/3 px-4" ref="formVerifyRef" />
        <user-loan-form v-if="loan" :init-data="loan" class="w-1/3 px-4" ref="formLoanRef" @after-update="changeLoanStatus" />
        <user-bank-form v-if="bank" :init-data="bank" class="w-1/3 px-4" ref="formBankRef" />
      </div>

      <n-divider title-placement="left">Biến Động Số Dư</n-divider>

      <user-logbook-table ref="tableRef" />

    </n-spin>

    <layout-teleport to="#actions">

     <div class="flex items-center">

       <n-popconfirm
           v-if="loanStatus === LoanStatus.PENDING"
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

       <n-button type="success" @click="bus.emit('add')" :disabled="loading">
         Thêm Tiền
       </n-button>

       <div class="w-3"></div>

       <n-button type="success" @click="bus.emit('subtract')" :disabled="loading">
         Trừ Tiền
       </n-button>

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
import {AdminLoan} from "~/apollo/queries/__generated__/AdminLoan";
import {AdminInfo} from "~/apollo/queries/__generated__/AdminInfo";
import {GET_INFO} from "~/apollo/queries/info.query";
import {ADMIN_BANK} from "~/apollo/queries/bank.query";
import {AdminBank} from "~/apollo/queries/__generated__/AdminBank";
import {Ref} from "vue";
import {LoanStatus} from "#imports";
import {AdminUpdateLoan_adminUpdateLoan} from "~/apollo/mutates/__generated__/AdminUpdateLoan";
import {UpdateLogbookInput} from "~/apollo/__generated__/serverTypes";

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

// Ref Form
interface FormRef {
  submit: () => Promise<void>
  loading: Ref<boolean>
}
const formVerifyRef = ref<FormRef>()
const formLoanRef = ref<FormRef & {
  quickApprove: () => Promise<void>
}>()
const formBankRef = ref<FormRef>()
const tableRef = ref<{ refresh: () => Promise<void> }>()

const [loading, toggleLoading] = useToggle(false)

const message = useMessage()
const submit = async () => {
  toggleLoading()
  try {
    await Promise.all([
      formVerifyRef.value?.submit(),
      formLoanRef.value?.submit(),
      formBankRef.value?.submit()
    ])
    message.success('Cập nhật thành công')
  } catch (e) {
    message.error('Kiểm tra lại thông tin')
  }
  toggleLoading()
}

const { $apollo } = useNuxtApp()

const quickApprove = async () => {
  try {
    await formLoanRef.value?.quickApprove()
    // override cache by using apollo cache.writeQuery
    // $apollo.defaultClient.cache.writeQuery({
    //   query: GET_LOAN,
    //   data: {
    //     adminLoan: {
    //       ...loan.value,
    //       status: LoanStatus.APPROVED
    //     }
    //   }
    // })
    // refresh table
  } catch (e) {
    console.log(e)
    //
  }
}

const loanStatus = ref<LoanStatus>(LoanStatus.APPROVED)
const changeLoanStatus = async ({ status }: AdminUpdateLoan_adminUpdateLoan) => {
  loanStatus.value = status
}

const bus = useEventBus<string, (UpdateLogbookInput | undefined )>('modify-logbook')
</script>

<style scoped></style>
