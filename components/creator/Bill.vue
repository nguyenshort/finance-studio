<template>
  <div class="relative _bill_creator">

    <div class="absolute top-[7px] text-[10px] left-[24px] _clock">
      {{ $dayjs().format('HH:mm') }}
    </div>

    <div
        class="absolute flex items-center"
        v-for="(item, key) in config"
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
</script>

<style scoped></style>
