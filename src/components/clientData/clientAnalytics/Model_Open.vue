<template>
  <div>
    <div v-if="loaded" class="d-flex flex-column mb-6">
      <div class="ml-2 mb-1 mt-2">
        <h4 class="mt-3" v-if="this.van_opts.length === 0">
          THERE ARE NO OPEN VANILLA POSITIONS FOR {{ cross }}
        </h4>
        <h4 v-if="this.exo_opts.length === 0">
          THERE ARE NO OPEN EXOTIC POSITIONS FOR {{ cross }}
        </h4>
      </div>

      <h4
        v-if="selected_account !== 'ALL' && cross_delta !== undefined"
        class="ml-3 font-weight-bold text-uppercase blue--text text--darken-3"
      >
        OPEN DELTA: {{ cross_delta }}
      </h4>
      <div v-if="this.van_opts.length > 0">
        <DataTable
          :apidata="strike_pivot"
          :headerData="`${cross} - VANILLAS - OPEN POSITION STRIKES`"
          :key="componentKey"
          :colwidths="strike_col_widths"
          class="ml-1 mt-3"
        />
        <DataTable
          :apidata="this.van_opts"
          :headerData="`${cross} - VANILLAS -OPEN POSITION `"
          :key="componentKey"
          :colwidths="van_col_widths"
          class="ml-1"
          @emit_booking_ref="setBookingRef"
        />
      </div>
      <DataTable
        v-if="this.exo_opts.length > 0"
        :apidata="this.exo_opts"
        :headerData="`${cross} - EXOTICS - OPEN POSITION`"
        :key="componentKey"
        class="ml-1 mt-3"
        :colwidths="exo_col_widths"
        @emit_booking_ref="setBookingRef"
      />
    </div>
    <div v-else>
      <h4 class="font-weight-medium text-center blue--text text--darken-3 ml-1">
        {{ no_data_message }}
      </h4>
    </div>
  </div>
</template>

<script>
import Api from "@/apis/default/ClientApi.js";
import DataTable from "@/components/clientData/clientAnalytics/DataTable.vue";
import { mapState } from "vuex";

export default {
  name: "client_model",
  components: {
    DataTable,
  },
  props: {
    cross: { type: String },
    account: { type: Array },
  },

  data() {
    return {
      van_opts: [],
      exo_opts: [],
      strike_pivot: [],
      loaded: false,
      componentKey: 0,
      no_data_message: "",
      van_col_widths: [
        400, 80, 80, 100, 100, 150, 100, 100, 100, 100, 100, 100, 100, 100, 400,
      ],
      exo_col_widths: [
        400, 80, 300, 700, 100, 150, 150, 100, 100, 100, 100, 100, 100, 150,
        100, 400,
      ],
    };
  },
  async created() {
    await this.handleApiRequest();
  },
  computed: {
    ...mapState({
      selected_account: (state) => state.active_account,
      selected_account_for_api: (state) => state.active_account_for_api,
      position_deltas: (state) => state.position_deltas,
      active_cross: (state) => state.active_cross,
    }),
    cross_delta() {
      return this.position_deltas[0][this.active_cross];
    },
    strike_col_widths() {
      let cols = [];
      if (this.selected_account === "ALL") {
        cols.push(150, 100, 500);
      } else {
        cols = [150, 100];
      }
      for (let index = 0; index < this.strike_pivot.length; index++) {
        cols.push(60);
      }
      return cols;
    },
  },
  methods: {
    dev() {},

    async handleApiRequest() {
      try {
        let response = await Api.get_open_positions(
          this.cross,
          this.selected_account_for_api
        );

        this.updateDataTable(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    setBookingRef(val) {
      this.$emit("emit_booking_ref", val);
    },

    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },

    updateDataTable(api_response) {
      this.no_data_message = "";

      this.van_opts = JSON.parse(api_response.van);
      this.exo_opts = JSON.parse(api_response.exo);
      this.strike_pivot = JSON.parse(api_response.strike_pivot);
      this.loaded = true;
      this.componentKey += 1;
      this.$emit("alert_child_data_loaded", true);
    },
  },
  watch: {},
};
</script>


