<template>
  <n-space vertical :size="12">

    <client-only>
      <collaborator-chart :range="range" :clients="clients" />
    </client-only>


    <div class="mt-5">
      <n-h4>Bảng Số Liệu</n-h4>
    </div>

    <collaborator-table :clients="clients" />

    <n-modal v-model:show="showFilter" preset="dialog" title="Tuỳ chỉnh thời gian" class="!w-[635px]">
      <div class="mb-2 mt-6">
        <n-date-picker
            v-model:value="range"
            type="datetimerange"
            clearable
            panel
            format="dd/MM/yyyy - HH:mm"
            :on-confirm="() => toggleFilter()"
        />
      </div>
    </n-modal>

    <layout-teleport to="#actions">
      <n-button type="primary" @click="toggleFilter()">
        <Icon name="ic:outline-timeline" class="mr-1"/>
        Bộ Lọc
      </n-button>
    </layout-teleport>
  </n-space>
</template>
<script lang="ts" setup>
import {GET_COLLABORATOR} from "~/apollo/queries/collaborator.query"
import {
  GetCollaborator,
  GetCollaborator_collaborator,
  GetCollaborator_collaborator_clients
} from "~/apollo/queries/__generated__/GetCollaborator";

definePageMeta({
  middleware: ['collaborator'],
})

/**
 * Section: Get data
 */
const route = useRoute()
const { data } = await useAsyncQuery<GetCollaborator>(GET_COLLABORATOR, {
  filter: {
    id: route.params.id
  }
})
const collaborator = computed<GetCollaborator_collaborator>(() => data.value!.collaborator)
const clients = computed<GetCollaborator_collaborator_clients[]>(() => collaborator.value.clients || [])

const { $dayjs } = useNuxtApp()
const [showFilter, toggleFilter] = useToggle(false)
const initRange = (): [number, number] => {
  const now = Date.now()
  const start = $dayjs(now).subtract(23, 'hour').valueOf()
  return [start, now]
}

const range = ref<[number, number]>(initRange())
</script>
