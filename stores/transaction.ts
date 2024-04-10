import { defineStore } from 'pinia'

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref([])

  function setTransactions(txs: []) {
    transactions.value = txs
  }

  return { transactions, setTransactions }
})
