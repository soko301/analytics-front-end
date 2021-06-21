<template>
  <div id="app">
    <h4 class="ml-5 mb-2">VANILLA OPEN POSITIONS</h4>
    <canvas id="van_opts" width="1200" height="300"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
import { mapState } from "vuex";

export default {
  props: {
    chart_data: { type: Object },
  },
  data() {
    return {
      ChartData: {
        type: "line",

        data: {
          labels: this.chart_data.labels,
          datasets: this.chart_data.scatter_data,
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  callback: function (label) {
                    if (label === 1) return "1D";
                    if (label === 2) return "1W";
                    if (label === 3) return "2W";
                    if (label === 4) return "1M";
                    if (label === 5) return "2M";
                    if (label === 6) return "3M";
                    if (label === 7) return "6M";
                    if (label === 8) return "9M";
                    if (label === 9) return "1Y";
                    if (label === 10) return "2Y";
                  },

                  beginAtZero: true,
                },
                scaleLabel: {
                  display: true,
                  labelString: "TERMS",
                },
              },
            ],
          },
          elements: {
            point: {
              radius: 6,
            },
          },
          responsive: true,
          legend: {
            display: false,
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem) {
                return tooltipItem.yLabel;
              },
            },
          },
        },
      },
    };
  },
  computed: {
    ...mapState({
      window: (state) => state.window,
    }),
  },

  methods: {
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
    this.createChart("van_opts", this.ChartData);
  },
};
</script>
