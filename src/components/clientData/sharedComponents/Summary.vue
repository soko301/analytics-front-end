<template>
  <div>
    <!-- <v-btn @click="dev" /> -->
    <v-container v-if="loaded" class="d-flex flex-wrap">
      <v-card
        v-for="item in apiData"
        :key="item['CCY Pair']"
        outlined
        elevation="6"
        class="ma-3"
        min-width="150"
        max-width="150"
        color="#385F73"
        @click="select_cross(item)"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              class="
                subtitle-1
                mb-1
                font-weight-light
                green--text
                text--lighten-3
              "
            >
              {{ item["CCY Pair"] }}
            </v-list-item-title>
            <v-list-item-subtitle class="font-weight-light white--text">{{
              item["0"]
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Api from "@/apis/default/ClientApi.js";
import { mapState } from "vuex";

export default {
  name: "clientSummary",
  components: {},
  props: { date_str: { type: Array }, account: { type: Array } },
  data() {
    return {
      apiData: [],
      loaded: false,
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
  },
  methods: {
    dev() {},
    select_cross(item) {
      this.$store.dispatch("setActiveCross", item["CCY Pair"]);
      this.$store.dispatch("setAnalyticsMainView", "MODELOPEN");
      // this.$emit("cross_selected", item["CCY Pair"]);
    },
    async getApiData() {
      try {
        let response = await Api.get_summary(this.selected_account_for_api);
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
</style>
