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

export const ranges = [
  { label: 'Last 1 W', duration: { days: 7 } },
  { label: 'Last 2 W', duration: { days: 14 } },
  { label: 'Last 1 M', duration: { days: 30 } },
  { label: 'Last 3 M', duration: { months: 3 } },
  { label: 'Last 6 M', duration: { months: 6 } },
  { label: 'Last 1 Y', duration: { years: 1 } },
]
