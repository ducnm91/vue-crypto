<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-3">
        <vue-select :options="orderByList" v-model="orderBy" class="mb-3"/>
      </div>
    </div>
    
    <table class="table table-striped table-bordered table-hover" v-if="categories.length">
      <thead>
        <tr>
          <th>Category</th>
          <th>Top 3 coins</th>
          <th>Volume 24h</th>
          <th>Market cap</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="cat in categories" :key="cat.id">
            <td>{{ cat.name }}</td>
            <td>
              <img v-for="(coin, index) in cat.top_3_coins" :src="coin" alt="" :key="index" class="ms-1">
            </td>
            <td>{{ formatNumber(cat.volume_24h) }}</td>
            <td>{{ formatNumber(cat.market_cap) }}</td>
          </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import RepositoryFactory from '@/repositories/RepositoryFactory.js'
import numeral from "numeral"
import _ from "lodash"

const coingeckoRepository = RepositoryFactory.get('coingecko')

export default {
  data() {
    return {
      categories: [],
      orderByList: [
        { value: "volume_24h", label: "Volume 24h" },
        { value: "market_cap", label: "Market cap" }
      ],
      orderBy: { value: "market_cap", label: "Market cap" }
    }
  },
  mounted() {
    coingeckoRepository.getCategories().then(res => {
      console.log(res)
      this.categories = res.data
      
    })
  },
  methods: {
    formatNumber(val) {
      return numeral(val).format('$0,0[.]00 a')
    }
  },
  watch: {
    orderBy(val) {
      if(this.categories.length) {
        this.categories = _.orderBy(
          this.categories,
          [val.value],
          ["desc"]
        );
      }
    }
  }
}
</script>