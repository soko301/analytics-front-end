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
    chartTitle: { type: String },
    inputLabels: { type: Array },
    inputSeries1: { type: Array },
    id_name: { type: String },
    data_label: { type: String },
    bar_color: { type: String },
  },
  data() {
    return {
      ChartData: {
        type: "bar",
        data: {
          labels: this.inputLabels,
          datasets: [
            {
              label: this.data_label,
              data: this.inputSeries1,
              borderColor: ["385F73"],
              backgroundColor: this.bar_color,
              barThickness: 39,
              minBarLength: 0,
            },
          ],
        },
        options: {
          title: {
            display: false,
            text: this.chartTitle,
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
