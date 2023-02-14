<template>
  <div>
    <user-loan-form v-if="loan" :init-data="loan" />
  </div>
</template>

<script lang="ts" setup>
import {AdminLoan} from "~/apollo/queries/__generated__/AdminLoan";

/**
 * Section: Get contract data
 */
const route = useRoute()
const { data } = await useAsyncQuery<AdminLoan>(GET_LOAN, {
  filter: {user: route.params.id}
})
const loan = computed(() => toRaw(data.value?.adminLoan))
</script>

<style scoped></style>
