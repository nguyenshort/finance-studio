<template>
  <div>
    <n-divider title-placement="left">Thông Tin Khoản Vay</n-divider>
    <n-form
        ref="formRef"
        :model="form"
        :rules="rules"
        :label-width="160"
    >
      <n-form-item label="Số tiền vay" path="amount">
        <n-input-number v-model:value="form.amount" placeholder="Số tiền vay" :min="30000000" :max="500000000" class="w-full" @keydown.enter="debouncedUpdate" />
      </n-form-item>

      <div class="flex">
        <n-form-item label="Số tháng vay" path="months">
          <n-input-number v-model:value="form.months" placeholder="Số tháng vay" :min="6" :max="36" @keydown.enter="debouncedUpdate" />
        </n-form-item>

        <n-form-item label="Lãi suất" path="interest" class="ml-10">
          <n-input-number v-model:value="form.interest" placeholder="Lãi suất" :min="0" :max="100" @keydown.enter="debouncedUpdate" />
        </n-form-item>
      </div>

      <n-form-item label="Trạng Thái" path="status">
        <n-select v-model:value="form.status" :options="status" placeholder="Trạng thái khoản vay" />
      </n-form-item>

      <n-form-item label="Cộng tác viên" v-if="form.user.collaborator" path="user.collaborator.id">
        <n-select
            v-model:value="form.user.collaborator.id"
            :options="collaboratorsOptions"
            placeholder="Chọn nhân viên"
        />
      </n-form-item>

      <n-form-item label="Chữ Ký Người Vay" path="signature">

        <div class="w-full aspect-w-3 aspect-h-1 overflow-hidden relative">
          <div
              class="relative overflow-hidden _signature rounded-md cursor-pointer w-full h-full"
              @click="toggleSignatureModal()"
          >
            <img class="w-full h-full object-cover relative z-1" alt="" :src="$cdn(form.signature)" />
            <div class="absolute z-10 w-full h-full top-0 left-0 flex items-center justify-center bg-primary-600 transition opacity-0 hover:opacity-100">
              <Icon name="majesticons:cloud-upload" class="text-[50px]" />
            </div>
          </div>
        </div>

      </n-form-item>

      <div class="-mt-[120px]">
        <n-form-item label="Rút tiền">
          <div>
            <div>
              <n-switch v-model:value="form2.withdrawable"/>
            </div>
            <div class="mt-3 text-[13px] text-gray-500">
              <p v-if="form2.withdrawable">Hiện người này có thể rút tiền về tài khoản.</p>
              <p v-else>
                Hiện người này không thể rút tiền về tài khoản. Với lý do sau:
              </p>
            </div>
          </div>
        </n-form-item>

        <n-form-item v-if="!form2.withdrawable" class="-mt-[30px]">
          <n-input v-model:value="form2.withdrawNote" placeholder="Nhập lý do từ chối" @keydown.enter="debouncedWithdraw" />
        </n-form-item>
      </div>

    </n-form>
    <n-modal v-model:show="showSignatureModal" preset="dialog" title="Tuỳ chỉnh chữ ký">


      <n-spin :show="loadingUpload">
        <client-only>
          <div class="rounded rounded-md _signature_pad mt-3 aspect-w-3 aspect-h-1">
            <VueSignaturePad ref="signaturePadRef" :options="signaturePadOptions" />
          </div>
        </client-only>
      </n-spin>


      <template #action>
        <n-button type="error" @click="signaturePadRef?.clearSignature()" :disabled="loadingUpload">
          Đặt Lại
        </n-button>
        <n-button type="primary" @click="insertNewSignature" :loading="loadingUpload">
          Chèn Vào
        </n-button>
      </template>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import {AdminLoan_adminLoan} from "~/apollo/queries/__generated__/AdminLoan";
import {FormInst} from "naive-ui";
import {FormRules} from "naive-ui/es/form/src/interface";
import {SelectMixedOption} from "naive-ui/es/select/src/interface";
import {GET_COLLABORATORS_FOR_LOAN} from "~/apollo/queries/loan.query";
import {
  FormCollaborators,
  FormCollaborators_collaborators,
} from "~/apollo/queries/__generated__/formCollaborators";
import {SignaturePadEntity} from "~/entities/signature-pad.entity";
import {Options} from "signature_pad/src/signature_pad";
import {UPDATE_LOAN} from "~/apollo/mutates/loan.mutate";
import {
  AdminUpdateLoan,
  AdminUpdateLoanVariables
} from "~/apollo/mutates/__generated__/AdminUpdateLoan";
import {CHANGE_BALANCE, CHANGE_COLLABORATOR, CHANGE_WITHDRAW_STATUS} from "~/apollo/mutates/user.mutate";
import {
  AdminUpdateUserCollaborator,
  AdminUpdateUserCollaboratorVariables
} from "~/apollo/mutates/__generated__/AdminUpdateUserCollaborator";
import {AdminUpdateUserInput, UpdateLoanInput} from "~/apollo/__generated__/serverTypes";
import {AdminUserBalance, AdminUserBalanceVariables} from "~/apollo/queries/__generated__/AdminUserBalance";
import {GET_USER_BALANCE, GET_USER_WITHDRAW_STATUS} from "~/apollo/queries/user.query";
import {
  AdminUserWithdrawStatus,
  AdminUserWithdrawStatusVariables
} from "~/apollo/queries/__generated__/AdminUserWithdrawStatus";
import {
  AdminUpdateUserBalance,
  AdminUpdateUserBalanceVariables
} from "~/apollo/mutates/__generated__/AdminUpdateUserBalance";
import {
  AdminUpdateUserWithdrawStatus,
  AdminUpdateUserWithdrawStatusVariables
} from "~/apollo/mutates/__generated__/AdminUpdateUserWithdrawStatus";

const props = defineProps<{
  initData: AdminLoan_adminLoan
}>()
const message = useMessage()

/**
 * Section: collaborators
 */
const {result, loading} = useQuery<FormCollaborators>(GET_COLLABORATORS_FOR_LOAN)
const collaborators = computed<FormCollaborators_collaborators[]>(() => result.value?.collaborators || [])

/**
 * Section: Form
 */
const form = ref<AdminLoan_adminLoan>(JSON.parse(JSON.stringify(props.initData)))
const formRef = ref<FormInst>()
// convert rules from interface AdminLoan_adminLoan
const rules = computed<FormRules>(() => ({
  amount: [
      // validate number, minimum value and maximum value
    {
      required: true,
      validator: (rule, value) => {
        if (value < 30000000) {
          return Promise.reject('Số tiền vay tối thiểu là 30.000.000')
        } else if (value > 500000000) {
          return Promise.reject('Số tiền vay tối đa là 500.000.000')
        }
      }
    }
  ],
  months: [
    {
      required: true,
      validator: (rule, value) => {
        if (value < 6) {
          return Promise.reject('Thời hạn vay tối thiểu là 6 tháng')
        } else if (value > 36) {
          return Promise.reject('Thời hạn vay tối đa là 34 tháng')
        }
      }
    }
  ],
  interest: [
    {
      required: true,
      validator: (rule, value) => {
        if (value < 1) {
          return Promise.reject('Lãi suất tối thiểu là 1%')
        }
      }
    }
  ],
  signature: [
    {
      required: true,
      message: 'Vui lòng thêm chữ ký',
      trigger: 'blur'
    }
  ],
  status: [
    {
      required: true,
      message: 'Vui lòng chọn trạng thái',
      trigger: 'blur'
    }
  ]
}))
const status: SelectMixedOption[] = [
  { label: 'Đang Chờ Duyệt', value: LoanStatus.PENDING },
  { label: 'Đã Phê Duyệt', value: LoanStatus.APPROVED },
  { label: 'Bị Từ Chối', value: LoanStatus.REJECTED, disabled: true }
]

const collaboratorsOptions = computed<SelectMixedOption[]>(() => {
  return collaborators.value.map(collaborator => ({
    label: collaborator.name,
    value: collaborator.id,
    disabled: collaborator.id === form.value.user.collaborator?.id || collaborator.status !== COLLABORATOR_STATUS.ACTIVE
  }))
})


const signaturePadRef = ref<SignaturePadEntity|undefined>()
const signaturePadOptions = computed<Options>(() => ({
  // penColor: 'rgba(255, 255, 255, 0.9)',
}))
const [showSignatureModal, toggleSignatureModal] = useToggle(false)

const upload = useUpload()
const loadingUpload = ref(false)
const insertNewSignature = async () => {
  loadingUpload.value = true
  if(signaturePadRef.value) {
    const { isEmpty, data } = signaturePadRef.value.saveSignature()
    if(isEmpty) {
      return message.error('Vui lòng thêm chữ ký')
    }

   // cover base64 to blob
   const blob = await fetch(data).then(r => r.blob())
   // upload to server
   form.value.signature = await upload.image(blob, 'signature')
  }
  toggleSignatureModal()
  loadingUpload.value = false
}


/**
 * Section: Update Loan
 */
const { mutate: updateLoan, loading: updatingLoan, onDone } = useMutation<AdminUpdateLoan, AdminUpdateLoanVariables>(UPDATE_LOAN)
const { mutate: updateCollaborator, loading: updatingCollaborator } = useMutation<AdminUpdateUserCollaborator, AdminUpdateUserCollaboratorVariables>(CHANGE_COLLABORATOR)

const submitLoan = async () => {
  return new Promise<UpdateLoanInput>((resolve, reject) => {
    formRef.value?.validate((errors) => {
      if (errors) {
        return reject(new Error('Form is not valid'))
      }
      resolve({
        user: form.value.user.id,
        amount: form.value.amount,
        interest: form.value.interest,
        months: form.value.months,
        signature: form.value.signature,
        status: form.value.status
      })
    })
  })
}

const submitCollaborator = (): AdminUpdateUserInput => {
  return {
    user: form.value.user.id,
    collaborator: form.value.user.collaborator?.id
  }
}

const submit = async () => {
  return Promise.all([
    submitLoan(),
    submitCollaborator(),
    submitWithdraw()
  ])
}

const debouncedUpdate = useDebounceFn(async () => {
  try {
    const inputs = await submit()
    await Promise.all([
      updateLoan({ input: inputs[0] }),
      updateCollaborator({ input: inputs[1] })
    ])
    message.success('Cập nhật thành công')
  } catch (e) {
    // console.log(e)
  }
}, 500)


const route = useRoute()
const { onResult, refetch } = useQuery<AdminUserWithdrawStatus, AdminUserWithdrawStatusVariables>(GET_USER_WITHDRAW_STATUS, {
  filter: {
    id: route.params.id as string
  }
}, { fetchPolicy: 'network-only' })

const form2 = ref<Pick<AdminUpdateUserInput, 'withdrawable' | 'withdrawNote'>>({
  withdrawable: undefined,
  withdrawNote: ''
})

onResult((result) => {
  if(result.data.adminUser) {
    form2.value.withdrawable = result.data.adminUser.withdrawable
    form2.value.withdrawNote = result.data.adminUser.withdrawNote
  }
})

const { mutate: updateWithdraw } = useMutation<AdminUpdateUserWithdrawStatus, AdminUpdateUserWithdrawStatusVariables>(CHANGE_WITHDRAW_STATUS)

const submitWithdraw = (): AdminUpdateUserInput => {
  return {
    user: form.value.user.id,
    withdrawable: form2.value.withdrawable,
    withdrawNote: form2.value.withdrawNote
  }
}

const debouncedWithdraw = useDebounceFn(async () => {
  try {
    const data = await submitWithdraw()
    await updateWithdraw({
      input: data
    })
    message.success('Cập nhật thành công')
  } catch (e) {
    //
  }
}, 500)

const countChange = ref(0)
watch(() => form2.value.withdrawable, () => {
  if(countChange.value > 0) {
    debouncedWithdraw()
  }
  countChange.value++
})

defineExpose({
  submit,
  quickApprove: async () => {
    form.value.status = LoanStatus.APPROVED
    await debouncedUpdate()
  },
})
</script>

<style scoped>
/*._signature img {
  filter: invert(100%);
}

._signature_pad :deep(canvas) {
  filter: invert(100%);
}
._signature, ._signature_pad {
  background: rgba(255, 255, 255, 0.1);
}*/
</style>
