<template>
  <div>
    <div>
      <div class="d-flex flex-row">
        <div class="d-flex flex-column mr-1">
          <v-card :height="window.height" min-width="250" max-width="250">
            <v-list dense>
              <v-subheader>Accounts</v-subheader>
              <v-list-item>
                <v-list-item-action>
                  <v-btn ripple small icon>
                    <v-icon @click="refresh_account_data()" color="#385F73"
                      >mdi-account-outline</v-icon
                    >
                  </v-btn>
                </v-list-item-action>
                <v-list-item-content>
                  <div v-if="progress">
                    Data is updating...
                    <v-progress-circular
                      indeterminate
                      color="primary"
                    ></v-progress-circular>
                  </div>
                  <AccountList v-else @alert_account_change="setAccount" />
                </v-list-item-content>
              </v-list-item>
              <v-subheader>Actions </v-subheader>
              <v-list-item @click="setView('SUMMARY')" ripple>
                <v-list-item-action>
                  <v-icon color="blue darken-3">mdi-dots-triangle</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>SUMMARY</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="setModelView()" ripple>
                <v-list-item-action>
                  <v-icon color="blue darken-3">mdi-dots-square</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ model_type }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="selectSearchView()" ripple>
                <v-list-item-action>
                  <v-icon color="blue darken-3">mdi-file-search-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>DEAL DETAILS</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="setView('CROSSBREAKDOWN')" ripple>
                <v-list-item-action>
                  <v-icon color="blue darken-3">mdi-hammer-screwdriver</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>CROSS BREAKDOWN</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="setView('ACCOUNTBYCROSS')" ripple>
                <v-list-item-action>
                  <v-icon color="blue darken-3">mdi-account-plus</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>ACCOUNT BY CROSS</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-subheader>Analytics </v-subheader>
              <v-list-item @click="updateTimeDxChartInput('Vol_DX')" ripple>
                <v-list-item-action>
                  <v-icon color="#385F73">mdi-chart-line</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>VOL DX VS TIME</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                @click="updateTimeDxChartInput('Trade PNL USD')"
                ripple
              >
                <v-list-item-action>
                  <v-icon color="#385F73">mdi-chart-line</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title> TRADE PNL VS TIME</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="updateTimeDxChartInput('Spot_DX')" ripple>
                <v-list-item-action>
                  <v-icon color="#385F73">mdi-chart-line</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>SPOT DX VS TIME</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="setView('PNLBARCHART')" ripple>
                <v-list-item-action>
                  <v-icon color="#385F73">mdi-chart-line</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>TOTAL PNL BY CROSS</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="setView('HISTOGRAMTRADETIME')" ripple>
                <v-list-item-action>
                  <v-icon color="#385F73">mdi-chart-line</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>TRADE TIME HISTOGRAM</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="setOpenPositionDeltaView()" ripple>
                <v-list-item-action>
                  <v-icon color="#385F73">mdi-google-analytics</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>OPEN POSITION DETLAS</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-subheader>Recently Viewed</v-subheader>
              <v-list-item
                @click="setAccount(item)"
                v-for="item in this.recently_viewed"
                :key="item"
                ripple
              >
                <v-list-item-action>
                  <v-icon color="green darken-3">mdi-dots-square</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Api from "@/apis/default/ClientApi.js";
import AccountList from "@/components/clientData/clientAnalytics/AccountList.vue";
import { mapState } from "vuex";
export default {
  components: {
    AccountList,
  },

  async created() {
    await this.getApiData();
  },
  data() {
    return {
      loaded: false,
      progress: false,
    };
  },
  computed: {
    ...mapState({
      window: (state) => state.window,
      field: (state) => state.time_dx_chart_input,
      analytics_main_view: (state) => state.analytics_main_view,
      analytics_history_view: (state) => state.analytics_history_view,
      active_cross: (state) => state.active_cross,
      recently_viewed: (state) => state.recently_viewed_accounts,
      selected_account: (state) => state.active_account,
      selected_account_for_api: (state) => state.active_account_for_api,
    }),
    sidebarHeight() {
      return this.window.height - 150;
    },
    model_type() {
      if (this.analytics_main_view === "MODELOPEN") {
        return "ALL TRADES";
      } else {
        return "OPEN POSITIONS";
      }
    },
  },
  methods: {
    dev() {},
    async getApiData() {
      try {
        let response = await Api.get_accounts();
        this.client_list = [...this.client_list, ...response.data];
        this.loaded = true;
      } catch (error) {
        console.log(error);
      }
    },
    async refresh_account_data() {
      try {
        this.progress = true;
        await Api.refresh_data();
        this.progress = false;

        this.$emit("alert_agile_updated");
      } catch (error) {
        console.log(error);
      }
    },
    setAccount(val) {
      this.$store.dispatch("setActiveAccount", val);
    },
    selectSearchView() {
      if (
        this.analytics_main_view === "MODEL" ||
        this.analytics_main_view === "MODELOPEN"
      ) {
        this.$store.dispatch("setAnalyticsMainView", "SEARCH");
        return;
      }

      if (this.analytics_main_view === "SEARCH") {
        this.$store.dispatch(
          "setAnalyticsMainView",
          this.analytics_history_view
        );
        return;
      }
    },
    setView(view) {
      this.$store.dispatch("setAnalyticsMainView", view);
    },
    setModelView() {
      if (this.active_cross === "") {
        alert("SELECT CROSS TO SEE POSITIONS");
        return;
      }
      if (this.model_type === "OPEN POSITIONS") {
        this.$store.dispatch("setAnalyticsMainView", "MODELOPEN");
      } else {
        this.$store.dispatch("setAnalyticsMainView", "MODEL");
      }
    },
    async setOpenPositionDeltaView() {
      this.$store.dispatch("setActiveAccount", "ALL");
      await this.$store.dispatch(
        "setPositionDeltas",
        this.selected_account_for_api
      );

      this.$store.dispatch("setAnalyticsMainView", "OPENPOSITIONDELTAS");
    },

    updateTimeDxChartInput(val) {
      if (val === this.field && this.analytics_main_view === "CHARTDXTIME") {
        return;
      }
      this.$store.dispatch("setTimeDxChartInput", val);
      this.$store.dispatch("setAnalyticsMainView", "CHARTDXTIME");
    },
  },
};
</script>




<style>
.card--flex-toolbar {
  margin-top: -62px;
}
.card-body {
  overflow-y: auto;
  max-height: 85vh;
}
</style>
