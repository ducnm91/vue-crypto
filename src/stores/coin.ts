import { defineStore } from "pinia";

import { stableCoins, binanceCoins, binanceLoanCoins, unFollowCoins, getByList, orderByList } from '@/config/coins';
import RepositoryFactory from '@/repositories/RepositoryFactory';

import { indicatorRelativeStrengthIndex } from '@d3fc/d3fc-technical-indicator';

const CoingeckoRepository = RepositoryFactory.get('coingecko');
const BinanceRepository = RepositoryFactory.get('binance')

const rsi = indicatorRelativeStrengthIndex()
    .period(14);
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
    async getCoinsWidthRelatedDataAsync({ getBy, platform }: { getBy: any, platform: any }) {
      const getByValue = (typeof getBy === 'object' && getBy !== null) ? getBy.value : getBy
      const getPlatformValue = (typeof platform === 'object' && platform !== null) ? platform.value : platform

      const response = await CoingeckoRepository.getCoinsWidthRelatedData(getByValue, getPlatformValue);
      // The value we return becomes the `fulfilled` action payload
      this.status = 'idle'
      const binanceCoinsData = response.data.filter((coin: any) => {
        return coin.market_cap_rank &&
          stableCoins.indexOf(coin.symbol) < 0 &&
          binanceCoins.indexOf(coin.symbol) >= 0 &&
          unFollowCoins.indexOf(coin.symbol) < 0
      });

      this.coins = await Promise.all(binanceCoinsData.map(async (coin: any) => {
        const symbol = `${coin.symbol}usdt`
        const lastCandles1h = await BinanceRepository.getCandlestickData(symbol.toUpperCase(), '1h', 15)
        const closePrices1h = lastCandles1h.data.map(item => item[4])
        const rsiLastValue1h = rsi(closePrices1h)

        const lastCandles24h = await BinanceRepository.getCandlestickData(symbol.toUpperCase(), '1h', 15)
        const closePrices24h = lastCandles24h.data.map(item => item[4])
        const rsiLastValue24h = rsi(closePrices24h)

        const lastCandles7d = await BinanceRepository.getCandlestickData(symbol.toUpperCase(), '1h', 15)
        const closePrices7d = lastCandles7d.data.map(item => item[4])
        const rsiLastValue7d = rsi(closePrices7d)

        return {
          ...coin,
          minedSupply: coin.max_supply ? (coin.circulating_supply / coin.max_supply) : 0,
          isSupportLoan: binanceLoanCoins.includes(coin.symbol),
          rsi_1h: rsiLastValue1h[rsiLastValue1h.length - 1],
          rsi_24h: rsiLastValue24h[rsiLastValue24h.length - 1],
          rsi_7d: rsiLastValue7d[rsiLastValue7d.length - 1]
        }
      }))
    },
  },
  getters: {
    compareAction: (state) => {
      if (state.coins.length) {
        const btc = state.coins.filter(token => token.symbol === 'btc')[0]
        if (btc) {
          const increase1h = state.coins.filter(token => token.price_change_percentage_1h_in_currency > btc.price_change_percentage_1h_in_currency)
          const decrease1h = state.coins.filter(token => token.price_change_percentage_1h_in_currency < btc.price_change_percentage_1h_in_currency)

          const increase24h = state.coins.filter(token => token.price_change_percentage_24h_in_currency > btc.price_change_percentage_24h_in_currency)
          const decrease24h = state.coins.filter(token => token.price_change_percentage_24h_in_currency < btc.price_change_percentage_24h_in_currency)

          const increase7d = state.coins.filter(token => token.price_change_percentage_7d_in_currency > btc.price_change_percentage_7d_in_currency)
          const decrease7d = state.coins.filter(token => token.price_change_percentage_7d_in_currency < btc.price_change_percentage_7d_in_currency)

          return {
            '1h': [
              {
                name: "Increase more than",
                y: increase1h.length,
                color: 'blue'
              },
              {
                name: "Decrease more than",
                y: decrease1h.length,
                color: 'red'
              }
            ],
            '24h': [
              {
                name: "Increase more than",
                y: increase24h.length,
                color: 'blue'
              },
              {
                name: "Decrease more than",
                y: decrease24h.length,
                color: 'red'
              }
            ],
            '7d': [
              {
                name: "Increase more than",
                y: increase7d.length,
                color: 'blue'
              },
              {
                name: "Decrease more than",
                y: decrease7d.length,
                color: 'red'
              }
            ]
          }
        }
      }
      return undefined
    }
  },
});
