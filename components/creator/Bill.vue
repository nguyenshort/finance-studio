<template>
  <div class="relative">

    <div class="absolute top-[7px] text-[10px] left-[24px]">
      {{ $dayjs().format('HH:mm') }}
    </div>

    <div
        class="absolute"
        v-for="(item, key) in els"
        :key="key"
        :style="item.style"
    >
      {{ item.value }}
    </div>
    <slot></slot>
    <img :src="image" alt="" />
  </div>
</template>

<script lang="ts" setup>
import {BankConfig} from "~/entities/creator.entity";

const props = defineProps<{
  image: string
  config: BankConfig
}>()

const els = ref(props.config)

watch(() => props.config, (val) => {
  els.value = val
}, { deep: true })
</script>

<style scoped></style>
