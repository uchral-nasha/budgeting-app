<script setup>
const { auth } = useSupabaseClient()
const user = useSupabaseUser()
const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

watchEffect(() => {
  if (user.value) {
    navigateTo('/transactions')
  }
})
</script>

<template>
  <div>
    <UButton
      class="mt-3"
      icon="i-mdi-google"
      block
      label="Sign in with Google"
      @click="auth.signInWithOAuth({ provider: 'google', options: { redirectTo } })"
    />
  </div>
</template>
