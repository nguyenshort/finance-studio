<template>
  <Teleport v-if="show" :to="to">
    <slot></slot>
  </Teleport>
</template>

<script lang="ts" setup>
defineProps<{
  to: string
}>()

const [show, toggleShow] = useToggle(false)
onMounted(() => nextTick(() => toggleShow()))
</script>

<style scoped></style>
