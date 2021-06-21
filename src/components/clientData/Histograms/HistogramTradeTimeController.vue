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
              :inputSeries1="frequency"
              :chartTitle="`Time of Trade Histogram`"
              id_name="hist"
              data_label="Hour"
              bar_color="rgba(71, 183,132,.5)"
              :yAxisYVal="yAxisYVal"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/apis/default/ClientApi.js";
import HistogramChart from "@/components/clientData/Histograms/HistogramChart.vue";
import { mapState } from "vuex";

export default {
  name: "histogram_trade_time",
  components: {
    HistogramChart,
  },
  props: {
    cross: { type: String },
  },
  data() {
    return {
      apiData: [],
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
      const arr = this.apiData.Bins.map((x) => {
        return parseFloat((x * 100).toFixed(2));
      });
      return arr;
    },
    frequency() {
      return this.apiData.Frequency;
    },

    yAxisYVal() {
      return (
        this.frequency.reduce((accumulator, element) => {
          return accumulator + element;
        }, 0) / 10
      );
    },
  },
  methods: {
    dev() {},

    async getApiData() {
      try {
        let response = await Api.get_histogram_trade_time(
          this.selected_account_for_api
        );

        this.apiData = response.data;
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
