import { defineStore } from 'pinia'

export const useTxsStore = defineStore('txs', {
  state: () => ({ txs: [] }),

  actions: {
    setTxs(txs: []) {
      this.txs = txs
    },
  },
})
