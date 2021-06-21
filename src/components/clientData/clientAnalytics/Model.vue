<template>
  <div>
    <div v-if="loaded" class="d-flex flex-column mb-6">
      <div class="ml-2 mb-1 mt-2">
        <h4 class="mt-3" v-if="this.van_opts.length === 0">
          THERE ARE NO VANILLA TRADES FOR {{ cross }}
        </h4>
        <h4 v-if="this.exo_opts.length === 0">
          THERE ARE NO EXOTIC TRADES FOR {{ cross }}
        </h4>
      </div>
      <DataTable
        :apidata="this.van_opts"
        :headerData="`${cross} - VANILLAS - ALL TRADES`"
        :key="componentKey"
        :colwidths="colwidths"
        class="ml-1"
        @emit_booking_ref="setBookingRef"
      />
      <DataTable
        :apidata="this.exo_opts"
        :headerData="`${cross} - EXOTICS - ALL TRADES`"
        :key="componentKey"
        class="ml-1 mt-3"
        :colwidths="colwidths"
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
      loaded: false,
      componentKey: 0,
      no_data_message: "",
      colwidths: [],
    };
  },
  async created() {
    await this.handleApiRequest();
  },
  computed: {
    ...mapState({
      selected_account: (state) => state.active_account,
      selected_account_for_api: (state) => state.active_account_for_api,
    }),
  },
  methods: {
    async handleApiRequest() {
      try {
        let response = await Api.get_data_van_exo(
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

    updateDataTable(api_response) {
      this.no_data_message = "";

      this.van_opts = JSON.parse(api_response.van);
      this.exo_opts = JSON.parse(api_response.exo);
      this.loaded = true;
      this.componentKey += 1;
      this.$emit("alert_child_data_loaded", true);
    },
  },
  watch: {},
};
</script>


