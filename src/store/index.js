import Vue from "vue";
import Vuex from "vuex";
import Api from "@/apis/default/ClientApi.js";

Vue.use(Vuex);

const state = {
  appLoaded: false,
  window: {
    width: 0,
    height: 0
  },
  snackbars: [],
  sidebarMinified: true,
  active_account: "ALL",
  active_account_for_api: "ALL",
  recently_viewed_accounts: ['ALL', 'AAM LP Block',
    'Cargill Financial Services Intl Inc (OSG)',
    'Give Up - Capula Global Rel Value Master Fund Ltd to Barclays (OSG)',
    'Give Up - Cirera Capital to J.P. Morgan (OSG)',
    'Give up - Discovery Capital Management LLC to JPM bank NA (OSG)',
    'Give Up - Eisler Capital Master Fund Ltd to Deutsche Bank AG (MKR)',
    'Give Up - ExodusPoint Partners Master Fund to Citibank NA (RGU) OSG',
    'Give up - MODULAR ASIAN MACRO - to Barc (OSG)',
    'Give up - Symmetry Investments LP to Barclays (OSG)'],
  time_dx_chart_input: "",
  analytics_main_view: "SUMMARY",
  analytics_history_view: "",
  active_cross: "",
  position_deltas: []
};

const mutations = {
  SET_APP_LOADED(state) {
    setTimeout(() => {
      state.appLoaded = true;
    }, 2000);
  },
  SET_WINDOW_DIMENSIONS(state, data) {
    state.window.width = data.width;
    state.window.height = data.height - 150;
  },
  SET_SIDEBARMINIFIED(state) {
    state.sidebarMinified = !state.sidebarMinified;
  },
  SET_SNACKBAR(state, snackbar) {
    state.snackbars = state.snackbars.concat(snackbar);
  },
  SET_ACTIVE_ACCOUNT(state, data) {
    state.active_account = data;
    state.active_account_for_api = data
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "");
    if (state.recently_viewed_accounts.indexOf(data) === -1) {
      state.recently_viewed_accounts.push(data);
    }
  },
  SET_TIME_DX_CHART_INPUT(state, data) {
    state.time_dx_chart_input = data;
  },
  SET_ANALYTICS_MAIN_VIEW(state, data) {
    state.analytics_history_view = state.analytics_main_view;
    state.analytics_main_view = data;
  },
  SET_ACTIVE_CROSS(state, data) {
    state.active_cross = data;
  },
  SET_POSITION_DELTAS(state, data) {
    state.position_deltas = data;
  }
};

const actions = {
  setWindowDimensions({ commit }, data) {
    commit("SET_WINDOW_DIMENSIONS", data);
  },
  alertMainAppLoaded({ commit }) {
    commit("SET_APP_LOADED");
  },
  setSidebarMinified({ commit }) {
    commit("SET_SIDEBARMINIFIED");
  },
  setSnackbar({ commit }, snackbar) {
    snackbar.showing = true;
    snackbar.color = snackbar.color || "dark";

    commit("SET_SNACKBAR", snackbar);
  },
  setActiveAccount({ commit }, data) {
    commit("SET_ACTIVE_ACCOUNT", data);
  },
  setTimeDxChartInput({ commit }, data) {
    commit("SET_TIME_DX_CHART_INPUT", data);
  },
  setAnalyticsMainView({ commit }, data) {
    commit("SET_ANALYTICS_MAIN_VIEW", data);
  },
  setActiveCross({ commit }, data) {
    commit("SET_ACTIVE_CROSS", data);
  },
  async setPositionDeltas({ commit }, selected_account_for_api) {
    try {
      let response = await Api.get_delta_position_all_cross(
        selected_account_for_api
      );
      commit("SET_POSITION_DELTAS", response.data);
    } catch (error) {
      console.log(error);
    }
  }
};

const getters = {};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
});
