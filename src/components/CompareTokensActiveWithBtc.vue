<template>
  <div ref="chart"></div>
</template>
<script>
import Highcharts from "highcharts";
import { useCoinStore } from "@/stores/coin";

export default {
  props: ['interval'],
  setup() {
    const coinsStore = useCoinStore();

    return {
      coinsStore,
    };
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
  },
  methods: {
    initChart(data, el) {
      const that = this
      this.chart = Highcharts.chart(el, {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
        },
        title: {
          text: `Tokens Active ${that.interval}`,
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        accessibility: {
          point: {
            valueSuffix: "%",
          },
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.percentage:.1f} %",
            },
          },
        },
        series: [
          {
            name: "Brands",
            colorByPoint: true,
            data: data,
          },
        ],
      });
    },
  },
  watch: {
    'coinsStore.compareAction': function(val) {
      if (val) {
        this.initChart(val[this.interval], this.$refs.chart)
      } else {
        this.chart.destroy()
      }
    }
  }
};
</script>
