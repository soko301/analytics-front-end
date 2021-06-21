<template>
  <div v-if="loaded">
    <div class="d-flex flex-column">
      <ChartScatterVan
        v-if="this.van_opts.length > 0"
        :chart_data="scatter_data_van"
      />
      <ChartScatterExo
        v-if="this.exo_opts.length > 0"
        class="mt-5"
        :chart_data="scatter_data_exo"
      />
    </div>
  </div>
</template>


<script>
import Api from "@/apis/default/ClientApi.js";
import ChartScatterVan from "@/components/clientData/chartScatterDealsByTerm/ChartScatterVan.vue";
import ChartScatterExo from "@/components/clientData/chartScatterDealsByTerm/ChartScatterExo.vue";

import { mapState } from "vuex";

export default {
  name: "chartScatterController",
  components: {
    ChartScatterVan,
    ChartScatterExo,
  },
  props: {
    cross: { type: String },
  },
  data() {
    return {
      van_opts: [],
      exo_opts: [],
      loaded: false,
      componentKey: 0,
      terms_keys: {
        "1D": 1,
        "1W": 2,
        "2W": 3,
        "1M": 4,
        "2M": 5,
        "3M": 6,
        "6M": 7,
        "9M": 8,
        "1Y": 9,
        "2Y": 10,
      },
    };
  },
  async created() {
    await this.getApiData();
  },
  computed: {
    ...mapState({
      selected_account: (state) => state.active_account,
      selected_account_for_api: (state) => state.active_account_for_api,
    }),
    scatter_data_van() {
      return this.createScatterChartDataObject(this.van_opts, "van");
    },
    scatter_data_exo() {
      return this.createScatterChartDataObject(this.exo_opts, "exo");
    },
  },
  methods: {
    async getApiData() {
      try {
        this.loaded = false;
        let response = await Api.get_open_positions(
          "ALL",
          this.selected_account_for_api
        );
        this.van_opts = JSON.parse(response.data.van);
        this.exo_opts = JSON.parse(response.data.exo);
        this.loaded = true;

        this.$emit("alertLoaded", true);
      } catch (error) {
        console.log(error);
      }
    },
    createScatterChartDataObject(inputArray, chart_id) {
      let outputArr = [];
      let uniqueCrosses = [
        ...new Set(inputArray.map((item) => item["CCY Pair"])),
      ].sort();
      let scatter_len = uniqueCrosses.length;

      for (const row of inputArray) {
        let scatter = new Array(scatter_len);
        let cross = row["CCY Pair"];

        let index = uniqueCrosses.indexOf(cross);
        let mat_bucket = this.get_mat_bucket(row["Time To Maturity"]);
        scatter[index] = this.terms_keys[mat_bucket];

        let background_color = index % 2 == 0 ? "#4169e1" : "#7EC8E3";
        if (chart_id == "exo") {
          background_color = index % 2 == 0 ? "#ff0055" : "#ff99bb";
        }
        outputArr.push({
          data: scatter,
          borderColor: "#000C66",
          backgroundColor: background_color,
          borderWidth: 2,
        });
      }
      return {
        labels: uniqueCrosses,
        scatter_data: outputArr,
      };
    },

    get_mat_bucket(dayCount) {
      if (dayCount === 1) {
        return "1D";
      }
      if (dayCount > 1 && dayCount <= 7) {
        return "1W";
      }
      if (dayCount > 7 && dayCount <= 14) {
        return "2W";
      }
      if (dayCount > 14 && dayCount <= 30) {
        return "1M";
      }
      if (dayCount > 30 && dayCount <= 60) {
        return "2M";
      }
      if (dayCount > 60 && dayCount <= 90) {
        return "3M";
      }
      if (dayCount > 90 && dayCount <= 180) {
        return "6M";
      }
      if (dayCount > 180 && dayCount <= 270) {
        return "9M";
      }
      if (dayCount > 270 && dayCount <= 360) {
        return "1Y";
      }
      if (dayCount > 360) {
        return "2Y";
      }
    },
  },
  watch: {
    selected_account() {
      this.getApiData();
    },
  },
};
</script>


