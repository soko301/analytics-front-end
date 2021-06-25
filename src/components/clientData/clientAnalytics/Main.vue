<template>
  <div>
    <v-container class="center">
      <v-progress-linear
        v-if="!childDataLoaded"
        indeterminate
      ></v-progress-linear>
    </v-container>
    <div class="d-flex flex-row">
      <SideBar :showSideControl="true" />
      <Model
        v-if="view === 'MODEL'"
        :cross="active_cross"
        :account="account_arr"
        @alert_child_data_loaded="setChildDataStatus"
        @emit_booking_ref="setSelectedBookingRef"
        :key="componentKey"
      />
      <ModelOpen
        v-if="view === 'MODELOPEN'"
        :cross="active_cross"
        :account="account_arr"
        @alert_child_data_loaded="setChildDataStatus"
        @emit_booking_ref="setSelectedBookingRef"
        :key="componentKey"
      />
      <div v-if="view === 'SUMMARY'" class="d-flex flex-column mb-6">
        <Summary
          :account="account_arr"
          @alert_child_data_loaded="setChildDataStatus"
          :key="componentKey"
        />
        <OpenPositionDeltas
          v-if="selected_account !== 'ALL'"
          :key="componentKey"
        />
        <ScatterChartDealsByTerm class="mt-10" />
      </div>
      <CrossBreakDown
        v-if="view === 'CROSSBREAKDOWN'"
        :key="componentKey"
        @alert_child_data_loaded="setChildDataStatus"
      />
      <AccountByCross
        v-if="view === 'ACCOUNTBYCROSS'"
        :key="componentKey"
        @alert_child_data_loaded="setChildDataStatus"
      />
      <DataTableSearchController
        v-if="view === 'SEARCH'"
        :key="componentKey"
        :searchBookingRef="searchBookingRef"
      />
      <ChartDxTime
        v-if="view === 'CHARTDXTIME'"
        :key="componentKey"
        @alert_child_data_loaded="setChildDataStatus"
      />
      <HistogramTradeTime
        v-if="view === 'HISTOGRAMTRADETIME'"
        @alert_child_data_loaded="setChildDataStatus"
        :key="componentKey"
      />
      <TotalPnlCrossChart
        v-if="view === 'PNLBARCHART'"
        @alert_child_data_loaded="setChildDataStatus"
        :key="componentKey"
      />
      <OpenPositionDeltas
        v-if="view === 'OPENPOSITIONDELTAS'"
        :key="componentKey"
      />
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/clientData/clientAnalytics/SideBar.vue";
import Model from "@/components/clientData/clientAnalytics/Model.vue";
import ModelOpen from "@/components/clientData/clientAnalytics/Model_Open.vue";
import Summary from "@/components/clientData/sharedComponents/Summary.vue";
import DataTableSearchController from "@/components/clientData/sharedComponents/datatableSearch/dtSearchController.vue";
import ScatterChartDealsByTerm from "@/components/clientData/chartScatterDealsByTerm/ChartScatterController.vue";
import CrossBreakDown from "@/components/clientData/clientAnalytics/CrossBreakDown.vue";
import AccountByCross from "@/components/clientData/clientAnalytics/AccountByCross.vue";
import ChartDxTime from "@/components/clientData/chartScatterDxTime/DxTimeController.vue";
import HistogramTradeTime from "@/components/clientData/Histograms/HistogramTradeTimeController.vue";
import OpenPositionDeltas from "@/components/clientData/clientAnalytics/PositionDeltas.vue";
import TotalPnlCrossChart from "@/components/clientData/PnlBarChart/PnlBarChartController.vue";

import { mapState } from "vuex";

export default {
  name: "client_main",
  components: {
    SideBar,
    Model,
    ModelOpen,
    Summary,
    DataTableSearchController,
    ScatterChartDealsByTerm,
    CrossBreakDown,
    AccountByCross,
    ChartDxTime,
    HistogramTradeTime,
    OpenPositionDeltas,
    TotalPnlCrossChart,
  },
  data() {
    return {
      componentKey: 0,
      childDataLoaded: true,
      searchBookingRef: "",
    };
  },
  computed: {
    ...mapState({
      selected_account: (state) => state.active_account,
      selected_account_for_api: (state) => state.active_account_for_api,
      analytics_main_view: (state) => state.analytics_main_view,
      analytics_history_view: (state) => state.analytics_history_view,
      active_cross: (state) => state.active_cross,
    }),
    account_arr() {
      return [this.selected_account];
    },
    view: {
      get() {
        return this.analytics_main_view;
      },
      set(val) {
        this.$store.dispatch("setAnalyticsMainView", val);
      },
    },
  },
  methods: {
    setChildDataStatus() {
      this.childDataLoaded = true;
    },
    setSelectedBookingRef(val) {
      this.searchBookingRef = val;
    },
    async updatePositionDelta() {
      await this.$store.dispatch(
        "setPositionDeltas",
        this.selected_account_for_api
      );
      this.componentKey += 1;
    },
    resetSearchBookingRefs() {
      if (
        this.analytics_main_view === "MODELOPEN" ||
        this.analytics_main_view === "MODEL"
      ) {
        this.searchBookingRef = "";
      }
    },
    validateSearchBookingRef() {
      if (
        this.analytics_main_view === "SEARCH" &&
        this.searchBookingRef === ""
      ) {
        alert("SELECT DEAL TO VIEW DETAILS");
        this.$store.dispatch(
          "setAnalyticsMainView",
          this.analytics_history_view
        );
      }
    },
  },
  watch: {
    selected_account() {
      this.updatePositionDelta();
    },
    view() {
      this.resetSearchBookingRefs();
      this.validateSearchBookingRef();
      this.componentKey += 1;
    },
    active_cross() {
      this.componentKey += 1;
    },
  },
};
</script>

<style>
.center {
  margin: 0;
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
