<template>
  <div class="filters">
    <h3>Get by:</h3>
    <div class="row filter mb-4 align-items-center">
      <div class="col-lg-2">
        <vue-select :options="getByList" v-model="optionFilter.getBy"/>
      </div>
      <div class="col-lg-2">
        <vue-select :options="platforms" v-model="optionFilter.platform" />
      </div>
    </div>

    <h3>Filter By:</h3>
    <div class="row filter mb-4 align-items-center">
      <div class="col-lg-2">
        <vue-select :options="coinsToSearch" v-model="optionFilter.baseToken" />
      </div>
      <div class="col-lg-2">
        <vue-select :options="orderByList" v-model="optionFilter.orderBy" />
      </div>
      <div class="col-lg-2">
        <p className="d-flex justify-content-between" v-if="minVolume">
          <span>{{ formatRange(minVolume) }}</span>-
          <span>{{ formatRange(maxVolume) }}</span>
        </p>
        <vue-slider
          v-model="optionFilter.volumeRange"
          :min="minVolume"
          :max="maxVolume"
          :tooltip-formatter="formatTooltip"
          v-if="minVolume && optionFilter.volumeRange[0]"
        />
      </div>
      <div class="col-lg-2">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" v-model="optionFilter.isSupportLoan" :true-value="true" :false-value="false" id="flexCheckDefault">
          <label class="form-check-label" for="flexCheckDefault">
            Support loan Binance
          </label>
        </div>
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
      getByList: getByList,
      orderByList: orderByList,
      optionFilter: {
        getBy: getByList[0],
        orderBy: null,
        platform: null,
        baseToken: null,
        volumeRange: [0, 0],
        isSupportLoan: false
      }
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
    },
    minVolume(): any {
      if (this.coinStore.coins.length) {
        return _.minBy(this.coinStore.coins, "total_volume").total_volume
      }
      return 0
    },
    maxVolume(): any {
      if (this.coinStore.coins.length) {
        return _.maxBy(this.coinStore.coins, "total_volume").total_volume
      }
      return 0
    }
  },
  watch: {
    minVolume(min) {
      this.changeVolumeRange(min, this.optionFilter.volumeRange[1])
    },
    maxVolume(max) {
      this.changeVolumeRange(this.optionFilter.volumeRange[0], max)
    },
    optionFilter: {
      handler(val) {
        this.coinStore.updateOptionFilter(val)
      },
      deep: true
    }
  },
  methods: {
    getCategories() {
      CoingeckoRepository.getCategories().then((res: any) => {
        this.platforms = res.data.map((platform: any) => {
          return {
            value: platform.id,
            label: platform.name,
          };
        })
          
      });
    },
    formatTooltip(value: number) {
      return numeral(value).format('$0,0[.]00 a')
    },
    formatRange(val: number) {
      return numeral(val).format('$0,0[.]00 a')
    },
    changeVolumeRange(min: number, max: number) {
      this.optionFilter.volumeRange = [min, max]
    }
  },
  mounted() {
    this.getCategories()
  }
})
</script>