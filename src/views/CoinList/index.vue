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
        <ItemList v-for="coin in sortedCoins" :key="coin.id" v-bind="coin" />
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import _ from "lodash";
import { getByList, orderByList } from "@/config/coins";
import { useCoinStore } from "@/stores/coin";

import Filter from "./Filter.vue";
import ItemList from "./ItemList.vue";

export default {
  components: {
    Filter,
    ItemList,
  },
  setup() {
    const coinsStore = useCoinStore();

    return {
      // you can return the whole store instance to use it in the template
      coinsStore,
    };
  },
  data() {
    return {
    };
  },
  computed: {
    coins() {
      return this.coinsStore.coins;
    },
    optionFilter() {
      return this.coinsStore.optionFilter
    },
    sortedCoins() {
      let newSortedCoins = [...this.coins];
      if (this.optionFilter.baseToken) {
        newSortedCoins = _.filter(newSortedCoins, {
          id: this.optionFilter.baseToken.value,
        });
      }

      if (this.optionFilter.volumeRange && this.optionFilter.volumeRange[0]) {
        newSortedCoins = _.filter(newSortedCoins, (o) => {
          return (
            o.total_volume >= this.optionFilter.volumeRange[0] &&
            o.total_volume <= this.optionFilter.volumeRange[1]
          );
        });
      }

      if (this.optionFilter.orderBy) {
        newSortedCoins = _.orderBy(
          newSortedCoins,
          [this.optionFilter.orderBy.value],
          ["desc"]
        );
      }

      if (this.optionFilter.isSupportLoan) {
        newSortedCoins = _.filter(newSortedCoins, {
          isSupportLoan: this.optionFilter.isSupportLoan,
        });
      }

      return newSortedCoins;
    },
  },
  methods: {
    getCoin() {
      this.coinsStore.status = "loading";
      this.coinsStore.getCoinsWidthRelatedDataAsync(this.optionFilter);
    }
  },
  created() {
    this.getCoin();
  },
  watch: {
    'optionFilter.getBy': function (newVal, oldVal) {
      this.getCoin();
    },
    'optionFilter.platform': function (newVal, oldVal) {
      this.getCoin();
    }
  }
};
</script>
