<template>
  <div class="wrap">
    <Ticker :symbol="pairToken" />
    <div ref="chartRef" class="chart-wrapper"></div>
  </div>
</template>
<script>
import { indicatorRelativeStrengthIndex, indicatorBollingerBands } from '@d3fc/d3fc-technical-indicator';
import Highcharts from "highcharts/highstock";
import loadIndicatorsAll from "highcharts/indicators/indicators-all";
import { quoteTokenList, intervalList } from "@/config/coins";
import RepositoryFactory from "@/repositories/RepositoryFactory";
import moment from 'moment'
import conf from "@/config/env"
import Ticker from './Ticker.vue'

loadIndicatorsAll(Highcharts);
const BinanceRepository = RepositoryFactory.get("binance");

const rsi = indicatorRelativeStrengthIndex()
    .period(14);

export default {
  props: ["symbol", "interval", "hasRsi"],
  components: {
    Ticker
  },
  data() {
    return {
      quoteToken: "usdt",
      chartData: [],
      socket: null,
      chart: null
    };
  },
  methods: {
    initChart(parseData) {
      const that = this
      this.chart = Highcharts.stockChart(this.$refs.chartRef, {
        chart: {
          events: {
            load: function (e) {
              const series = this.series[0]

              that.initSocket(series)
            }
          },
          height: "600px",
        },

        scrollbar: {
          enabled: false,
        },
        navigator: {
          enabled: false,
        },
        rangeSelector: {
          enabled: false,
        },
        exporting: { enabled: false },

        xAxis: {
          minorTickLength: 0,
          tickLength: 0,
        },

        plotOptions: {
          candlestick: {
            color: "#de5f5f",
            lineColor: "#de5f5f",
            upColor: "#31baa0",
            upLineColor: "#31baa0",
          },
          // sma: {
          //   color: 'yellow'
          // },
          // ema: {
          //   color: 'pink'
          // },
          // wma: {
          //   color: 'purple'
          // }
        },

        yAxis: this.yAxisRsi,

        series: [
          {
            type: "candlestick",
            id: "aapl",
            name: `${this.pairToken}`,
            data: parseData,
          },
          ...this.seriesRsi,

          // {
          //   type: 'ema',
          //   linkedTo: 'aapl',
          //   params: {
          //       period: 7
          //   }
          // },
          // {
          //   type: 'ema',
          //   linkedTo: 'aapl',
          //   params: {
          //       period: 25
          //   }
          // },
          // {
          //   type: 'ema',
          //   linkedTo: 'aapl',
          //   params: {
          //       period: 99
          //   }
          // },
          // {
          //   type: 'wma',
          //   linkedTo: 'aapl',
          //   params: {
          //     period: 7
          //   }
          // },
          // {
          //   type: 'wma',
          //   linkedTo: 'aapl',
          //   params: {
          //     period: 25
          //   }
          // },
          // {
          //   type: 'wma',
          //   linkedTo: 'aapl',
          //   params: {
          //     period: 99
          //   }
          // }
        ],
      });
    },
    getDataChart() {
      BinanceRepository.getCandlestickData(
        this.pairToken.replace("-", ""),
        this.interval,
        90
      ).then((res) => {
        const parseData = res.data.map((item) => {
          const timeOpen = item[0]
          const openPrice = Number(item[1])
          const highPrice = Number(item[2])
          const lowPrice = Number(item[3])
          const closePrice = Number(item[4])
          return [timeOpen, openPrice, highPrice, lowPrice, closePrice]
        });

        this.initChart(parseData)
        const closePrices = parseData.map(item => item[4])
        
        console.log(rsi(closePrices))
      });
    },
    initSocket(series) {
      const symbol = this.pairToken.replace("-", "").toLowerCase()
      this.socket = new WebSocket(`${conf.socket_binance}/ws/${symbol}@kline_${this.interval}`)

      this.socket.addEventListener('message', function (event) {
        const lastPoint = series.data[series.data.length - 1];

        const rawData = JSON.parse(event.data)
        const timeOpen = rawData['k']['t']
        const openPrice = Number(rawData['k']['o'])
        const highPrice = Number(rawData['k']['h'])
        const lowPrice = Number(rawData['k']['l'])
        const closePrice = Number(rawData['k']['c'])
        const candleData = [timeOpen, openPrice, highPrice, lowPrice, closePrice]

        if (lastPoint.options.x !== timeOpen) {
          series.addPoint(candleData, true, true);
        } else {
          lastPoint.update(candleData, true);
        }
      });
    }
  },
  computed: {
    pairToken() {
      if (this.symbol && this.quoteToken) {
        let pair = `${this.symbol}-${this.quoteToken}`;

        if (pair.indexOf("eth") >= 0 && pair.indexOf("btc") >= 0) {
          pair = "eth-btc";
        }

        if (pair.indexOf("bnb") >= 0 && pair.indexOf("btc") >= 0) {
          pair = "bnb-btc";
        }

        if (pair.indexOf("bnb") >= 0 && pair.indexOf("eth") >= 0) {
          pair = "bnb-eth";
        }

        return pair.toUpperCase();
      }
      return null
    },
    yAxisRsi() {
      if (this.hasRsi) {
        return [
          {
            offset: 50,
            height: "48%",
          },
          {
            offset: 50,
            height: "48%",
            top: "52%",
          },
        ]
      }
      
      return {
        offset: 50,
      }
    },
    seriesRsi() {
      if (this.hasRsi) {
        return [
          {
            yAxis: 1,
            type: "rsi",
            linkedTo: "aapl",
            params: {
              period: 14
            }
          }
        ]
      }
      return []
    }
  },
  watch: {
    symbol() {
      // if (this.symbol !== quoteTokenList[0].value) {
      //   this.quoteToken = quoteTokenList[0].value;
      // } else {
      //   this.quoteToken = quoteTokenList[1].value;
      // }
    },
    pairToken(val) {
      if (val) {
        this.getDataChart()
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
<style lang="scss" scoped>
  .chart-wrapper {
    min-height: 600px;
  }
</style>
