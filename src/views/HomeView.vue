<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-4">
          <CompareTokensActiveWithBtc interval="1h" />
        </div>
        <div class="col-lg-4">
          <CompareTokensActiveWithBtc interval="24h" />
        </div>
        <div class="col-lg-4">
          <CompareTokensActiveWithBtc interval="7d" />
        </div>
      </div>
    </div>
    
    <CoinList />
  </main>
</template>
<script>
import CoinList from './CoinList/index.vue'
import CompareTokensActiveWithBtc  from '@/components/CompareTokensActiveWithBtc.vue'
import RepositoryFactory from '@/repositories/RepositoryFactory';
const BinanceRepository = RepositoryFactory.get('binance');

export default {
  components: {
    CoinList,
    CompareTokensActiveWithBtc
  },
  mounted() {
    BinanceRepository.getFutureTransactionHistory().then(res => {
      console.log(res)
    })
  },
}
</script>
