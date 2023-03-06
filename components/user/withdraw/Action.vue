<template>
  <div class="flex items-center">
    <n-button
        type="error"
        size="small"
        :disabled="loading || logbook.status === 'REJECTED'"
        @click="toggle(WithDrawStatus.REJECTED)"
    >
      Từ Chối
    </n-button>
    <div class="w-2"></div>

    <n-button
        type="info"
        size="small"
        :disabled="loading || logbook.status === 'APPROVED'"
        @click="toggle(WithDrawStatus.APPROVED)"
    >
      Duyệt
    </n-button>
  </div>
</template>

<script lang="ts" setup>
import {TOGGLE_WITHDRAW} from "~/apollo/mutates/user.mutate";
import {UpdateLogbookInput, WithDrawStatus} from "~/apollo/__generated__/serverTypes";
import {WithdrawsAdmin_withdrawsAdmin} from "~/apollo/queries/__generated__/WithdrawsAdmin";
import {ToggleWithdraw, ToggleWithdrawVariables} from "~/apollo/mutates/__generated__/ToggleWithdraw";

const props = defineProps<{
  logbook: WithdrawsAdmin_withdrawsAdmin
}>()

const isApprove = computed(() => props.logbook.status === 'APPROVED')

const { mutate: deleteLogBook, loading, onDone: afterDelete } = useMutation<ToggleWithdraw, ToggleWithdrawVariables>(TOGGLE_WITHDRAW)

const toggle = async (status: WithDrawStatus) => deleteLogBook({
  filter: {
    id: props.logbook.id,
    status
  }
})
const logBookBus = useEventBus<string>('logbooks')
// define emits to emit delete action typescript
const emits = defineEmits<{
  (event: 'after-delete'): void
}>()

afterDelete(() => {
  logBookBus.emit('refresh')
  emits('after-delete')
})

const bus = useEventBus<string, (UpdateLogbookInput | undefined )>('modify-logbook')
</script>

<style scoped></style>
