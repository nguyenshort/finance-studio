<template>
  <div class="flex items-center">
    <n-popconfirm
        @positive-click="deleteRecord"
    >
      <template #trigger>
        <n-button
            type="error"
            size="small"
            :disabled="loading"
            :loading="loading"
        >
          Xoá
        </n-button>
      </template>
      Không thể đảo ngược giao dịch qua việc xoá?
    </n-popconfirm>
    <div class="w-2"></div>

    <template v-if="logbook.group === 'WITHDRAW'">
      <n-button
          type="error"
          size="small"
          :disabled="logbook.status === 'REJECTED'"
      >
        Từ Chối
      </n-button>
      <div class="w-2"></div>
      <n-button
          type="info"
          size="small"
          :disabled="logbook.status === 'APPROVED'"
      >
        Duyệt
      </n-button>
    </template>
    <template v-else>

      <n-button
          type="info"
          size="small"
          @click="bus.emit('modify-logbook', logbook)"
      >
        Sửa
      </n-button>
    </template>

  </div>
</template>

<script lang="ts" setup>
import {AdminLogbooks_adminLogbooks} from "~/apollo/queries/__generated__/AdminLogbooks";
import {DELETE_LOGBOOK} from "~/apollo/mutates/user.mutate";
import {AdminDeleteLogbook, AdminDeleteLogbookVariables} from "~/apollo/mutates/__generated__/AdminDeleteLogbook";
import {UpdateLogbookInput} from "~/apollo/__generated__/serverTypes";

const props = defineProps<{
  logbook: AdminLogbooks_adminLogbooks
}>()

const { mutate: deleteLogBook, loading, onDone: afterDelete } = useMutation<AdminDeleteLogbook, AdminDeleteLogbookVariables>(DELETE_LOGBOOK)

const deleteRecord = async () => deleteLogBook({ input: { id: props.logbook.id } })

// define emits to emit delete action typescript
const emits = defineEmits<{
  (event: 'after-delete'): void
}>()

afterDelete(() => emits('after-delete'))

const bus = useEventBus<string, (UpdateLogbookInput | undefined )>('modify-logbook')
</script>

<style scoped></style>
