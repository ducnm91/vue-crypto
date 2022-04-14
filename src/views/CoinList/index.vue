<template>
  <div>
    <Filter />
    <h3>All coin</h3>
    <p v-if="coinsStore.status === 'loading'">Loading...</p>
    <table class="table table-striped table-bordered table-hover" v-else>
      <thead>
        <tr>
          <th>Coin</th>
          <th>Price</th>
          <th>Ath</th>
          <th>Ath change(%)</th>
          <th>1h</th>
          <th>24h</th>
          <th>7d</th>
          <th>24h Volume</th>
          <th>Mined supply</th>
          <th>Support Loan</th>
          <th>Mkt Cap rank</th>
        </tr>
      </thead>
      <tbody>
        <ItemList v-for="coin in coinsStore.coins" :key="coin.id" v-bind="coin" />
      </tbody>
    </table>
  </div>
  
</template>
<script lang="ts">
import _ from 'lodash';
import { getByList, orderByList } from '@/config/coins';
import {useCoinStore} from '@/stores/coin'

import Filter from './Filter.vue';
import ItemList from './ItemList.vue';

export default {
  components: {
    Filter,
    ItemList
  },
  setup() {
    const coinsStore = useCoinStore()

    return {
      // you can return the whole store instance to use it in the template
      coinsStore,
    }
  },
  data() {
    return {
      sortedCoins: [],
      optionFilter: {
        platform: '',
        orderBy: '',
        getBy: getByList[0].value,
        idToken: '',
        volume: '',
        isSupportLoan: false
      }
    }
  },
  computed: {
    coins() {
      return this.counterStore.coins
    },
    sortedCoins() {
      let newSortedCoins = [...this.coins]
      if (this.optionFilter.idToken) {
        newSortedCoins  = _.filter(newSortedCoins, { 'id': this.optionFilter.idToken })
      }

      if(this.optionFilter.volume && this.optionFilter.volume.min) {
        newSortedCoins  = _.filter(newSortedCoins, function(o) { return o.total_volume >= this.optionFilter.volume.min && o.total_volume <= this.optionFilter.volume.max })
      }

      if (this.optionFilter.orderBy) {
        newSortedCoins = _.orderBy(newSortedCoins, [this.optionFilter.orderBy], ['desc'])
      }

      if(this.optionFilter.isSupportLoan) {
        newSortedCoins = _.filter(newSortedCoins, { 'isSupportLoan': this.optionFilter.isSupportLoan })
      }

      return newSortedCoins
    }
  },
  methods: {
    getCoin() {
      this.coinsStore.status = 'loading'
      this.coinsStore.getCoinsWidthRelatedDataAsync(this.optionFilter)
    },
    setFilter(val) {
      this.optionFilter = val
    }
  },
  created() {
    this.getCoin()
  },
  watch: {
    'optionFilter.getBy'() {
      this.getCoin()
    },
    'optionFilter.platform'() {
      this.getCoin()
    }
  }
}
</script>