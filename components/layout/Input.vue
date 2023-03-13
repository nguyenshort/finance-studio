<template>
  <input
      v-model="_value"
      :placeholder="placeholder"
      type="text"
      class="focus:outline-0 w-full border border-gray-300 rounded-md py-1 px-2"
  />
</template>

<script lang="ts" setup>
// props all attrs of input text
const props = defineProps<{
  value: string
  placeholder: string
}>()

// create _value from props.value and binding two ways
const _value = ref(props.value)
const emits = defineEmits<{
  (event: 'update:value', value: string): void
}>()

watch(_value, (value) => emits('update:value', value))

watch(() => props.value, (value) => _value.value = value)
</script>

<style scoped></style>
