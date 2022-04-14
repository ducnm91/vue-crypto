import { defineStore } from "pinia";

import { stableCoins, binanceCoins, binanceLoanCoins, unFollowCoins } from '@/config/coins';
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
    status: 'idle',
    baseToken: {
      id: 'bitcoin',
      symbol: 'btc'
    }
  }),
  actions: {
    async getCoinsWidthRelatedDataAsync({getBy, platform}:{getBy: string, platform: string}) {
      const response = await CoingeckoRepository.getCoinsWidthRelatedData(getBy, platform);
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
