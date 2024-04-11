import {
  Chart,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
} from 'chart.js'
import 'chartjs-adapter-date-fns'
export default defineNuxtPlugin(() => {
  Chart.register(CategoryScale, LinearScale, LineElement, BarElement, Title, Tooltip, Legend, PointElement, TimeScale)
})
