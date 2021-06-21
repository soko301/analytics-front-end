<template>
  <div id="app">
    <h4 class="ma-3">{{ chartTitle }} VS DAYS SINCE INCEPTION</h4>
    <canvas id="scatter" width="1050" height="800"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  props: {
    data: { type: Array },
    chartTitle: { type: String },
  },
  data() {
    return {
      ChartData: {
        type: "scatter",

        data: {
          datasets: this.data,
        },
        options: {
          scales: {
            x: {
              type: "linear",
              position: "bottom",
            },
          },
          responsive: true,
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label;
                return (
                  label +
                  "->DaysDX:" +
                  tooltipItem.xLabel +
                  "->Val:" +
                  tooltipItem.yLabel
                );
              },
            },
          },
        },
      },
    };
  },
  computed: {},
  methods: {
    dev() {
      console.log(this.data);
    },
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      });
    },
  },

  mounted() {
    this.createChart("scatter", this.ChartData);
  },
};
</script>




