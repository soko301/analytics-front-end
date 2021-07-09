<template>
  <div id="app">
    <!-- <v-btn color="orange" @click="dev">dev</v-btn> -->
    <canvas :id="id_name" width="1000" height="800"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  props: {
    inputLabels: { type: Array },
    inputSeries: { type: Object },
    id_name: { type: String },
  },
  data() {
    return {
      ChartData: {
        type: "bar",
        data: {
          labels: this.inputLabels,
          datasets: [
            {
              label: "ALL TRADES",
              data: this.inputSeries["all"],
              borderColor: ["385F73"],
              backgroundColor: "rgba(71, 183,132,.5)",
              barThickness: 39,
              minBarLength: 0,
            },
            {
              label: "OPEN POSITIONS",
              data: this.inputSeries["open"],
              borderColor: ["385F73"],
              backgroundColor: "#A9D3FF",
              barThickness: 39,
              minBarLength: 0,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "PNL USD",
          },

          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "PNL USD",
                },
                ticks: {
                  callback: function (label) {
                    return label.toLocaleString("en-US");
                  },
                  beginAtZero: true,
                  padding: 5,
                },
              },
            ],
          },
        },
      },
    };
  },
  computed: {},
  methods: {
    dev() {
      console.log(this.yValScatter);
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
    this.createChart(this.id_name, this.ChartData);
  },
};
</script>
