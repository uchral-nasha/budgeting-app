<script setup>
import { Line } from 'vue-chartjs'
import { sub, differenceInDays } from 'date-fns'

// Fetch Supabase client and user
const client = useSupabaseClient()
const user = useSupabaseUser()
const selectedRange = useState('selectedRange')

// Fetch transaction data
const { data: transactions } = await useAsyncData('transactions', async () => {
  const { data } = await client
    .from('transactions')
    .select('id, title, category, amount, is_deposit, created_at')
    .eq('user', user.value.id)
    .order('created_at')
  return data
})

watch(selectedRange, () => console.log('state changes'), { immediate: true })
const transformedTransactions = transactions.value.reduce((acc, txs) => {
  if (txs.is_deposit) {
    acc.push({ y: txs.amount, x: txs.created_at })
  }
  return acc
}, [])
console.log(transformedTransactions)
// Prepare data for chart
const chartData = ref({
  datasets: [
    {
      label: 'Deposits',
      borderColor: 'Green',
      backgroundColor: 'Green',
      data: transactions.value.reduce((acc, txs) => {
        if (txs.is_deposit) {
          acc.push({ y: txs.amount, x: txs.created_at })
        }
        return acc
      }, []),
    },
    {
      label: 'Withdraw',
      borderColor: 'Red',
      backgroundColor: 'red',
      data: transactions.value.reduce((acc, txs) => {
        if (!txs.is_deposit) {
          acc.push({ y: txs.amount, x: txs.created_at })
        }
        return acc
      }, []),
    },
  ],
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'time',
      time: { unit: 'day' },
      min: selectedRange.value?.start ?? new Date(),
      max: selectedRange.value?.end ?? sub(new Date(), { days: 7 }),
    },
    y: {
      min: 500,
    },
  },
})
</script>

<template>
  <div class="w-full">
    <div>
      <DateRange />
    </div>
    <div>
      <Line :data="chartData" :options="chartOptions"></Line>
    </div>
  </div>
</template>
