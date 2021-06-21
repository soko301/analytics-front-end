<template>
  <div>
    <v-dialog v-model="dialog" width="700">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          ACCOUNT
        </v-btn>
      </template>
      <v-card class="table">
        <v-card-title>
          Accounts
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
          @click:row="selectItem"
          dense
          :headers="headers"
          :items="client_list"
          :search="search"
          item-key="name"
          sort-by="values"
          sortDesc
          class="elevation-1"
          :footer-props="{ 'items-per-page-options': [-1] }"
        ></v-data-table>
      </v-card>
    </v-dialog>
  </div>
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
          text: "With",
          align: "start",
          value: "With",
          groupable: false,
        },
      ],
      client_list: ["ALL"],
      dialog: false,
      selected: [],
      singleSelect: true,
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
        let response = await Api.get_accounts();
        this.client_list = response.data.data;

        this.loaded = true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(val) {
      this.dialog = false;
      this.$emit("alert_account_change", val["With"]);
    },
  },
};
</script>

<style>
.table {
  cursor: pointer;
}
</style>
