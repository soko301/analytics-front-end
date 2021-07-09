<template>
  <div>
    <v-container class="center">
      <v-progress-linear
        v-if="!childDataLoaded"
        indeterminate
      ></v-progress-linear>
    </v-container>
    <div class="d-flex flex-row">
      <ChartScatter
        v-if="loaded"
        :key="componentKey"
        :data="this.build_chart_data(this.field)"
        :chartTitle="this.field"
      />
    </div>
  </div>
</template>



<script>
import Api from "@/apis/default/ClientApi.js";
import ChartScatter from "@/components/clientData/chartScatterDxTime/ChartDxTime.vue";

import { mapState } from "vuex";

export default {
  name: "spotdxcontroller",
  components: {
    ChartScatter,
  },

  data() {
    return {
      apiData: [],
      childDataLoaded: true,
      loaded: false,
      componentKey: 0,
    };
  },
  async created() {
    await this.getApiData();
  },
  computed: {
    ...mapState({
      selected_account: (state) => state.active_account,
      selected_account_for_api: (state) => state.active_account_for_api,
      field: (state) => state.time_dx_chart_input,
    }),
    uniqueCrosses() {
      return [...new Set(this.apiData.map((item) => item["CCY Pair"]))].sort();
    },
  },
  methods: {
    dev() {
      console.log(this.build_chart_data());
    },
    build_coords(cross_list, y_vals) {
      return cross_list.map((x) => {
        return {
          x: x["pnl_multiple"],
          y: parseFloat(x[y_vals]),
        };
      });
    },

    build_chart_data(y_vals) {
      let outputArr = [];

      for (const cross of this.uniqueCrosses) {
        let cross_data = this.apiData.filter((x) => x["CCY Pair"] == cross);
        let scatter = this.build_coords(cross_data, y_vals);
        outputArr.push({
          data: scatter,
          backgroundColor: this.generateRandomColor(),
          label: `${cross}`,
        });
      }

      return outputArr;
    },

    generateRandomColor() {
      var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      return randomColor;
    },
    async getApiData() {
      try {
        this.loaded = false;
        let response = await Api.get_digital_scanner(
          this.selected_account_for_api
        );
        this.apiData = response.data;
        console.log(this.apiData);
        this.loaded = true;
        this.$emit("alert_child_data_loaded", true);
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    selected_account() {
      this.getApiData();
    },
    field() {
      this.componentKey += 1;
      this.$emit("alert_child_data_loaded", true);
    },
  },
};
</script>

<style>
div.observations {
  width: 400px;
}
div.dt_volCone {
  margin-top: 10px;
  margin-left: 30px;
  margin-right: 30px;
}
</style>
