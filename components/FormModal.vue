<script setup>
import { categories, initialState } from '~/constants'
const isModalOpen = useState('modal')
const props = defineProps({
  onSubmit: {
    type: Function,
    required: true,
  },
  state: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
})
</script>
<template>
  <UModal v-model="isModalOpen" prevent-close>
    <div class="flex items-center md:justify-between justify-center">
      <span />
      <UButton
        @click="
          () => {
            isModalOpen = false
            isEdit = false
            Object.assign(state, initialState)
          }
        "
        color="gray"
        variant="ghost"
        icon="i-heroicons-x-mark-20-solid"
      />
    </div>
    <UForm :state="state" class="m-5 space-y-4" @submit="onSubmit">
      <UFormGroup label="Title" name="title">
        <UInput v-model="state.title" />
      </UFormGroup>
      <UFormGroup label="Amount" name="amount">
        <UInput v-model="state.amount" />
      </UFormGroup>
      <UFormGroup name="isDeposit">
        <UCheckbox v-model="state.isDeposit" label="Is it deposit?" />
      </UFormGroup>
      <UFormGroup name="Category" label="category">
        <USelect v-model="state.category" placeholder="category..." :options="categories" />
      </UFormGroup>
      <UButton type="submit" :loading="loading">Submit</UButton>
    </UForm>
  </UModal>
</template>
