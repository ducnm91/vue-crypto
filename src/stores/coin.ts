import { defineStore } from "pinia";

import { stableCoins, binanceCoins, binanceLoanCoins, unFollowCoins, getByList, orderByList } from '@/config/coins';
import RepositoryFactory from '@/repositories/RepositoryFactory';

const CoingeckoRepository = RepositoryFactory.get('coingecko');

// export interface CoinState {
//   status: 'idle' | 'loading' | 'failed'
//   coins: any[]
//   baseToken: {
//     id: string
//     symbol: string
//   }
// }

export const useCoinStore = defineStore({
  id: "coin",
  state: () => ({
    coins: [],
    optionFilter: {
      getBy: getByList[0],
      orderBy: null,
      platform: null,
      baseToken: null,
      volumeRange: [0, 0],
      isSupportLoan: false
    },
    status: 'idle',
    baseToken: {
      id: 'bitcoin',
      symbol: 'btc'
    }
  }),
  actions: {
    updateOptionFilter(val: any) {
      this.optionFilter = val
    },
    async getCoinsWidthRelatedDataAsync({getBy, platform}:{getBy: any, platform: any}) {
      const getByValue = (typeof getBy === 'object' && getBy !== null) ? getBy.value : getBy
      const getPlatformValue = (typeof platform === 'object' && platform !== null) ? platform.value : platform

      const response = await CoingeckoRepository.getCoinsWidthRelatedData(getByValue, getPlatformValue);
      // The value we return becomes the `fulfilled` action payload
      this.status = 'idle'
      const binanceCoinsData = response.data.filter((coin:any) => {
        return coin.market_cap_rank && 
                stableCoins.indexOf(coin.symbol) < 0 && 
                binanceCoins.indexOf(coin.symbol) >= 0 &&
                unFollowCoins.indexOf(coin.symbol) < 0
      });

      this.coins = binanceCoinsData.map((coin: any) =>{
        return {
          ...coin,
          minedSupply: coin.max_supply ? (coin.circulating_supply / coin.max_supply) : 0,
          isSupportLoan: binanceLoanCoins.includes(coin.symbol)
        }
      })
    },
  },
});
