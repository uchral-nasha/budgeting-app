<script setup>
const user = useSupabaseUser()

watch(
  user,
  () => {
    if (user.value) {
      return navigateTo('transactions')
    }
  },
  { immediate: true },
)
</script>
<template>
  <h1>confirming..</h1>
</template>
