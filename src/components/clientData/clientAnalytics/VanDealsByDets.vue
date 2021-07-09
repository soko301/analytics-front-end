<template>
  <div>
    <v-dialog v-model="dialog" :width="window.width">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="ml-2"
          x-small
          outlined
          color="blue darken-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Dets
        </v-btn>
      </template>
      <v-card v-if="loaded" class="table">
        <v-card-title>
          Deals
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table
          dense
          :headers="headers"
          :items="apiData"
          :search="search"
          class="elevation-1"
          :footer-props="{ 'items-per-page-options': [-1] }"
        >
          <!-- eslint-disable-next-line vue/valid-v-slot-->
          <template #item.With="{ item }">
            <div
              v-if="parseFloat(item.Amount) > 0"
              class="blue--text text--darken-4"
            >
              {{ item.With }}
            </div>
            <div v-else class="red--text text--darken-3">
              {{ item.With }}
            </div>
          </template>
          <!-- eslint-disable-next-line vue/valid-v-slot-->
          <template #item.Amount="{ item }">
            <div
              v-if="parseFloat(item.Amount) > 0"
              class="blue--text text--darken-4"
            >
              {{ item.Amount.toLocaleString() }}
            </div>
            <div v-else class="red--text text--darken-3">
              {{ item.Amount.toLocaleString() }}
            </div>
          </template></v-data-table
        >
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Api from "@/apis/default/ClientApi.js";
import { mapState } from "vuex";
export default {
  components: {},
  props: {
    detsObj: { type: Object },
  },

  data() {
    return {
      loaded: false,
      search: "",
      apiData: [],
      dialog: false,
    };
  },
  computed: {
    ...mapState({
      window: (state) => state.window,
    }),
    headers() {
      let headers = [];
      for (const key of Object.keys(this.apiData[0])) {
        headers.push({
          text: key,
          align: "start",
          value: key,
        });
      }
      return headers;
    },
  },
  methods: {
    dev() {},
    async getApiData() {
      try {
        console.log(this.detsObj);
        let response = await Api.search_van_deals_by_dets(
          this.detsObj["cross"],
          this.detsObj["maturity_date"],
          this.detsObj["strike"]
        );
        this.apiData = response.data;
        this.loaded = true;
      } catch (error) {
        console.log(error);
        alert("SELECT STRIKE TO SEE DETAILS");
      }
    },
  },
  watch: {
    dialog() {
      if (this.dialog === true) {
        this.getApiData();
      }
      if (this.dialog === false) {
        this.loaded = false;
      }
    },
  },
};
</script>

<style>
.table {
  cursor: pointer;
}
</style>
