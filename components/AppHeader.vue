<script setup>
const client = useSupabaseClient()
const user = useSupabaseUser()
const colorMode = useColorMode()

const toggleDark = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const colorModeIcon = computed(() =>
  colorMode.preference === 'dark' ? 'i-heroicons-outline-moon' : 'i-heroicons-outline-sun',
)
const logout = async () => {
  await client.auth.signOut()
  navigateTo('/')
}

const links = [
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/transactions',
  },
  {
    label: 'Chart view',
    icon: 'i-heroicons-chart-bar',
    to: `/chart`,
  },
]
</script>

<template>
  <div>
    <Title>Budgeting app</Title>
    <div
      v-if="user"
      class="flex items-center md:justify-between justify-center border-b border-gray-200 dark:border-gray-800"
    >
      <div class="flex items-center m-5">
        <h1 class="mr-5">Hi,{{ user.user_metadata.full_name }}</h1>
        <UAvatar :src="user.user_metadata.avatar_url" :alt="user.user_metadata.full_name" />
      </div>
      <UHorizontalNavigation :links="links" />
      <div class="flex items-center">
        <UButton variant="transparent" :icon="colorModeIcon" @click="toggleDark" />
        <UButton class="u-text-white" variant="transparent" @click="logout">Logout</UButton>
      </div>
    </div>
  </div>
</template>
