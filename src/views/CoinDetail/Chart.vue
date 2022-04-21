<template>
  <div>
    <p>{{ symbol }}</p>
    <div ref="chartRef"></div>
  </div>
</template>
<script>
import { quoteTokenList, intervalList } from "@/config/coins";
import Highcharts from "highcharts/highstock";
import loadIndicatorsAll from "highcharts/indicators/indicators-all";
import RepositoryFactory from "@/repositories/RepositoryFactory";

loadIndicatorsAll(Highcharts);
const BinanceRepository = RepositoryFactory.get("binance");

export default {
  props: ["symbol", "interval"],
  data() {
    return {
      quoteToken: "usdt",
      chartData: [],
      yAxisRsi: {
        offset: 50,
      },
      seriesRsi: [],
    };
  },
  methods: {
    initChart() {
      Highcharts.stockChart(this.$refs.chartRef, {
        chart: {
          events: {
            load: function (e) {
              // setChartInstance(e.target);
              // const series = this.series[0];
              // socket.addEventListener('message', function(event) {
              //   const rawData = JSON.parse(event.data)
              //   const candleData = [rawData['E'], Number(rawData['k']['o']), Number(rawData['k']['c']), Number(rawData['k']['h']), Number(rawData['k']['l'])]
              //   series.addPoint(candleData, true, true);
              // });
            },
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
            color: "rgb(222, 95, 95)",
            lineColor: "rgb(222, 95, 95)",
            upColor: "rgb(49, 186, 160)",
            upLineColor: "rgb(49, 186, 160)",
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
            data: this.chartData,
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
        144
      ).then((res) => {
        this.chartData = res.data.map((item) => {
          return item.map((i) => Number(i));
        });
        this.initChart()
      });
    }
  },
  computed: {
    pairToken() {
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
    },
  },
  mounted() {
    
  },
  watch: {
    symbol() {
      if (this.symbol !== quoteTokenList[0].value) {
        this.quoteToken = quoteTokenList[0].value;
      } else {
        this.quoteToken = quoteTokenList[1].value;
      }
    },
    pairToken() {
      this.getDataChart()
    }
  },
};
</script>
