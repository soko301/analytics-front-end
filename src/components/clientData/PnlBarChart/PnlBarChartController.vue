<template>
  <div class="ml-5">
    <!-- <v-btn color="red" @click="dev">dev</v-btn> -->
    <div v-if="loaded">
      <div class="d-flex flex-row">
        <div class="d-flex flex-column mr-1">
          <div>
            <HistogramChart
              :key="componentKey"
              :inputLabels="bins"
              :inputSeries="frequency"
              :chartTitle="`Total PNL BY CROSS`"
              id_name="hist"
              data_label="TOTAL PNL USD"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/apis/default/ClientApi.js";
import HistogramChart from "@/components/clientData/PnlBarChart/BarChart.vue";
import { mapState } from "vuex";

export default {
  name: "pnl_bar_chart",
  components: {
    HistogramChart,
  },
  props: {
    cross: { type: String },
  },
  data() {
    return {
      apiData: { all: [], open: [] },
      loaded: false,
      componentKey: 0,
      refreshingData: false,
      averaging_period: 100,
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

    bins() {
      const cross_all = this.apiData["all"].map((x) => {
        return x["CCY Pair"];
      });

      return cross_all;
    },
    frequency() {
      const all = this.apiData["all"].map((x) => {
        return x["Trade PNL USD"];
      });
      const open = this.apiData["open"].map((x) => {
        return x["Trade PNL USD"];
      });

      return {
        all: all,
        open: open,
      };
    },
  },
  methods: {
    dev() {
      console.log(this.frequency);
    },
    find_missing_cross_in_open() {
      const cross_all = this.apiData["all"].map((x) => {
        return x["CCY Pair"];
      });

      const cross_open = this.apiData["open"].map((x) => {
        return x["CCY Pair"];
      });

      var currentSet = new Set(cross_open);
      return cross_all.filter((x) => !currentSet.has(x));
    },

    async getApiData() {
      try {
        let response = await Api.get_pnl_cross(this.selected_account_for_api);

        this.apiData["all"] = JSON.parse(response.data.all);
        this.apiData["open"] = JSON.parse(response.data.open);

        let missing_crosses = this.find_missing_cross_in_open();
        missing_crosses.forEach((element) => {
          this.apiData["open"].push({
            "CCY Pair": element,
            "Trade PNL USD": 0,
          });
        });

        this.apiData["all"].sort((a, b) =>
          a["CCY Pair"] > b["CCY Pair"] ? 1 : -1
        );
        this.apiData["open"].sort((a, b) =>
          a["CCY Pair"] > b["CCY Pair"] ? 1 : -1
        );

        console.log(this.apiData);

        this.loaded = true;
        this.$emit("alert_child_data_loaded", true);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
div.tfRolling {
  width: 600px;
}
div.dt_rolling {
  margin-top: 10px;
  margin-left: 30px;
  margin-right: 30px;
}
</style>
