<template>
  <div class="filters">
    <h3>Get by:</h3>
    <div class="row filter mb-4 align-items-center">
      <div class="col-lg-2">
        <vue-select :options="getByList" v-model="getBy"/>
      </div>
      <div class="col-lg-2">
        <vue-select :options="platforms" v-model="platform" />
      </div>
    </div>

    <h3>Filter By:</h3>
    <div class="row filter mb-4 align-items-center">
      <div class="col-lg-2">
        <vue-select :options="coinsToSearch" v-model="currentToken" />
      </div>
      <div class="col-lg-2">
        <vue-select :options="orderByList" v-model="orderBy" />
      </div>
      <div class="col-lg-2">
        <p className="d-flex justify-content-between" v-if="minVolume">
          <span>{{ volumeRange?.min ? numeral(volumeRange.min).format('$0,0[.]00 a') : numeral(minVolume).format('$0,0[.]00 a') }}</span>-
          <span>{{ volumeRange?.max ? numeral(volumeRange.max).format('$0,0[.]00 a') : numeral(maxVolume).format('$0,0[.]00 a') }}</span>
        </p>
        <vue-slider
          v-model="volumeRange"
          :tooltip-formatter="formatTooltip"
          v-if="maxVolume"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import _ from "lodash";
import numeral from "numeral";
import RepositoryFactory from "@/repositories/RepositoryFactory";
import { orderByList, getByList } from "@/config/coins";
import { useCoinStore } from "@/stores/coin";

const CoingeckoRepository = RepositoryFactory.get("coingecko");

export default ({
  props: {
    changeFilter: Function
  },
  setup() {
    const coinStore = useCoinStore()
    return {
      coinStore
    }
  },
  data() {
    return {
      platforms: [],
      platform: null,
      currentToken: null,
      getBy: getByList[0],
      orderBy: null,
      volumeRange: [0, 0],
      isSupportLoan: false
    }
  },
  computed: {
    coinsToSearch(): any {
      if (this.coinStore.coins.length) {
        return this.coinStore.coins.map((coin: any) => {
          return {
            value: coin.id,
            label: coin.symbol,
          };
        })
      }
      return []
    }
  },
  watch: {
    'coinStore.coins'(val) {
      if(val.length) {
        this.volumeRange= [_.minBy(this.coinStore.coins, "total_volume").total_volume, _.maxBy(this.coinStore.coins, "total_volume").total_volume]
      }
    }
  },
  methods: {
    getCategories() {
      CoingeckoRepository.getCategories().then((res) => {
        this.platforms = res.data.map((platform) => {
          return {
            value: platform.id,
            label: platform.name,
          };
        })
          
      });
    },
    formatTooltip(value) {
      return numeral(value).format('$0,0[.]00 a')
    },
    changeSupportLoan(event) {
      this.isSupportLoan = event.target.checked
    }
  },
  mounted() {
    this.getCategories()
    // this.$watch([this.platform, this.orderBy, this.getBy, this.currentToken, this.volumeRange, this.isSupportLoan], () => { 
    //   this.changeFilter({
    //     platform: this.platform?.value,
    //     orderBy: this.orderBy?.value,
    //     getBy: this.getBy?.value,
    //     idToken: this.currentToken?.value,
    //     volume: this.volumeRange,
    //     isSupportLoan
    //   });
    // });
  }
})
</script>