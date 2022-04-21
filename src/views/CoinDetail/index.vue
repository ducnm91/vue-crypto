<template>
  <div class="detail">
    <Chart :symbol="symbol" interval="1m" />
  </div>
</template>
<script>
import Chart from './Chart.vue'
export default {
  components: {
    Chart
  },
  data() {
    return {
      symbol: null
    }
  },
  mounted() {
    this.symbol = this.$route.params.symbol
  }
}
</script>