export const categories = [
  { label: 'All', value: 'all' },
  { label: 'Food', value: 'food' },
  { label: 'Bills', value: 'bills' },
  { label: 'Entertaiment', value: 'entertaiment' },
]

export const columns = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'title',
    label: 'Title',
  },
  {
    key: 'amount',
    label: 'Amount',
  },
  {
    key: 'category',
    label: 'Category',
  },
  {
    key: 'is_deposit',
    label: 'Deposit',
  },
  {
    key: 'created_at',
    label: 'Date',
  },
  {
    key: 'actions',
  },
]

export const initialState = {
  id: undefined,
  category: undefined,
  amount: undefined,
  isDeposit: false,
  title: undefined,
}
