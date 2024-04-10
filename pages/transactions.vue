<script setup>
import { initialState, columns, categories } from '@/constants/index'
import { useTransactionStore } from '~/stores/transaction'

const client = useSupabaseClient()
const user = useSupabaseUser()
const loading = ref(false)
const isModalOpen = useState('modal', () => false)
const onSubmit = ref(addTransaction)

const { pending, data: transactions } = await useAsyncData('transactions', async () => {
  const { data } = await client
    .from('transactions')
    .select('id, title, category, amount, is_deposit, created_at')
    .eq('user', user.value.id)
    .order('created_at')
  return data
})

const transactionStore = useTransactionStore()
const { setTransactions } = transactionStore

setTransactions(transactions.value)

const state = reactive({ ...initialState })

async function addTransaction(event) {
  loading.value = true
  const { data } = await client
    .from('transactions')
    .insert({
      user: user.value.id,
      title: event.data.title,
      amount: event.data.amount,
      is_deposit: event.data.isDeposit,
      category: event.data.category,
    })
    .select('*')
    .single()

  transactions.value?.push(data)
  Object.assign(state, initialState)
  isModalOpen.value = false
  loading.value = false
}

async function deleteTransaction(id) {
  transactions.value = transactions.value?.filter(tx => tx.id !== id)
  await client.from('transactions').delete().match({ id })
}

async function filterByCategory(category) {
  loading.value = true
  let query = client
    .from('transactions')
    .select('id, title, category, amount, is_deposit, created_at')
    .eq('user', user.value.id)
  if (category.target.value !== 'all') query.eq('category', category.target.value)

  const { data } = await query.order('created_at')
  transactions.value = data
  loading.value = false
}

async function editTransaction(event) {
  loading.value = true
  const { data } = await client
    .from('transactions')
    .update({
      user: user.value.id,
      title: event.data.title,
      amount: event.data.amount,
      is_deposit: event.data.isDeposit,
      category: event.data.category,
    })
    .eq('id', state.id)
    .select('*')
    .single()

  transactions.value = transactions.value?.filter(tx => tx.id !== state.id)
  transactions.value.push(data)
  Object.assign(state, initialState)
  isModalOpen.value = false
  loading.value = false
}
const items = row => [
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => {
        isModalOpen.value = true
        state.id = row.id
        state.amount = row.amount
        state.category = row.category
        state.isDeposit = row.is_deposit
        state.title = row.title
        onSubmit.value = editTransaction
      },
    },
    {
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
      click: () => deleteTransaction(row.id),
    },
  ],
]
const page = ref(1)
const pageCount = 5

const rows = computed(() => {
  return transactions.value.slice((page.value - 1) * pageCount, page.value * pageCount)
})
</script>
<template>
  <div>
    <div class="flex">
      <USelect
        icon="i-heroicons-magnifying-glass-20-solid"
        placeholder="filter by category..."
        :options="categories"
        class="w-full"
        @input="filterByCategory"
      />
    </div>
    <UTable
      :columns="columns"
      :rows="rows"
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
      :progress="{ color: 'primary', animation: 'carousel' }"
      :loading="pending"
    >
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
      <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
        <UPagination v-model="page" :page-count="pageCount" :total="transactions.length" />
      </div>
    </UTable>
    <UButton
      class="mt-6"
      label="Add transaction"
      @click="
        () => {
          isModalOpen = true
          onSubmit = addTransaction
        }
      "
    />
    <FormModal :state="state" :onSubmit="onSubmit" :loading="loading" />
  </div>
</template>
