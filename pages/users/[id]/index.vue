<template>
  <div>
    <client-only>
      <user-wrapper />
    </client-only>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['user']
})
</script>

<style scoped></style>
