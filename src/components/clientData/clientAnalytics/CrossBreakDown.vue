<template>
  <v-card>
    <v-card-title>
      Breakdown By Cross
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-if="loaded"
      dense
      :headers="headers"
      :items="cross_data"
      :search="search"
      item-key="name"
      sort-by="values"
      sortDesc
      group-by="CCY Pair"
      class="elevation-1"
      show-group-by
      :footer-props="{ 'items-per-page-options': [15, 30, 50, 100, -1] }"
    ></v-data-table>
  </v-card>
</template>

<script>
import Api from "@/apis/default/ClientApi.js";
import { mapState } from "vuex";
export default {
  components: {},

  async created() {
    await this.getApiData();
  },
  data() {
    return {
      loaded: false,
      search: "",

      headers: [
        {
          text: "CCY Pair",
          align: "start",
          value: "CCY Pair",
          groupable: true,
        },
        { text: "With", value: "With", align: "right", groupable: false },
        { text: "Count", value: "values", align: "right", groupable: false },
      ],
      cross_data: [],
    };
  },
  computed: {
    ...mapState({
      window: (state) => state.window,
    }),
  },
  methods: {
    dev() {},
    async getApiData() {
      try {
        let response = await Api.get_cross_count_by_account();
        this.cross_data = response.data.data;
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
