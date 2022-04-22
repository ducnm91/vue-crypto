<template>
  <div class="ticker">
    <div class="row">
      <div class="col-lg-2">{{ symbol }}</div>
      <div class="col-lg-10">
        <div class="d-flex flex-column">
          <div class="label">Price</div>
          <div class="value">
            {{ formatPrice(ticker.c) }}
          </div>
        </div>
        <div class="d-flex flex-column ms-4">
          <div class="label">24h high</div>
          <div class="value">
            {{ formatPrice(ticker.h) }}
          </div>
        </div>
        <div class="d-flex flex-column ms-4">
          <div class="label">24h low</div>
          <div class="value">
            {{ formatPrice(ticker.l) }}
          </div>
        </div>
        <div class="d-flex flex-column ms-4">
          <div class="label">24h average</div>
          <div class="value">
            {{ formatPrice(ticker.w) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import numeral from "numeral";
import { getZeroDecimal } from "../../utils/formatNumber";
import conf from "@/config/env"
// {
//   "e": "24hrTicker",  // Event type
//   "E": 123456789,     // Event time
//   "s": "BNBBTC",      // Symbol
//   "p": "0.0015",      // Price change
//   "P": "250.00",      // Price change percent
//   "w": "0.0018",      // Weighted average price
//   "x": "0.0009",      // First trade(F)-1 price (first trade before the 24hr rolling window)
//   "c": "0.0025",      // Last price
//   "Q": "10",          // Last quantity
//   "b": "0.0024",      // Best bid price
//   "B": "10",          // Best bid quantity
//   "a": "0.0026",      // Best ask price
//   "A": "100",         // Best ask quantity
//   "o": "0.0010",      // Open price
//   "h": "0.0025",      // High price
//   "l": "0.0010",      // Low price
//   "v": "10000",       // Total traded base asset volume
//   "q": "18",          // Total traded quote asset volume
//   "O": 0,             // Statistics open time
//   "C": 86400000,      // Statistics close time
//   "F": 0,             // First trade ID
//   "L": 18150,         // Last trade Id
//   "n": 18151          // Total number of trades
// }
export default {
  props: ['symbol'],
  data() {
    return {
      ticker: {},
      socket: null
    }
  },
  methods: {
    initSocket(symbol) {
      const s = symbol.replace("-", "").toLowerCase()
      console.log(s)
      this.socket = new WebSocket(`${conf.socket_binance}/ws/${s}@ticker`)

      this.socket.addEventListener('message', event => {
        this.ticker = JSON.parse(event.data)
      });
    },
    formatPrice(val) {
      if(val) {
        return numeral(val).format(`0,0[.]${getZeroDecimal(val)}`)
      }
    }
  },
  watch: {
    symbol(val) {
      if(val) {
        this.initSocket(val)
      }
    }
  },
  mounted() {
    
  },
  beforeDestroy() {
    this.socket.close()
  }
};
</script>
