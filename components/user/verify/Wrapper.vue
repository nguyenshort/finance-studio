<template>
  <div>
    <user-verify-form v-if="contract" :init-data="contract" />
  </div>
</template>

<script lang="ts" setup>
import {GET_INFO} from "~/apollo/queries/info.query"
import {AdminInfo} from "~/apollo/queries/__generated__/AdminInfo"

/**
 * Section: Get contract data
 */
const route = useRoute()
const { data } = await useAsyncQuery<AdminInfo>(GET_INFO, {
  filter: {id: route.params.id}
})
const contract = computed(() => toRaw(data.value?.adminInfo))
</script>

<style scoped></style>
