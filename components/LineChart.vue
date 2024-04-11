<template>
  <div>
    <canvas ref="lineChart"></canvas>
  </div>
</template>

<script>
import { Line, mixins } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['data'],
  mixins: [mixins.reactiveProp],
  mounted() {
    this.renderChart(
      {
        labels: this.data.map(item => item.created_at),
        datasets: [
          {
            label: 'Amount',
            borderColor: 'rgb(75, 192, 192)',
            data: this.data.map(item => item.amount),
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false },
    )
  },
}
</script>
