<template>
  <div class="detail">
    <div class="container">
      <Chart :symbol="symbol" :hasRsi="symbol === 'btc'" interval="1d" />
      <img src="https://alternative.me/crypto/fear-and-greed-index.png" v-if="symbol === 'btc'" alt="Latest Crypto Fear & Greed Index" class="img-fluid" />
    </div>
    
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