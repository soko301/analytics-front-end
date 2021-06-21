<template>
  <div>
    <div v-if="this.postion_deltas.length > 0" class="d-flex flex-column my-6">
      <v-container>
        <DataTable
          :apidata="this.postion_deltas"
          :headerData="`OPEN POSITION DELTAS`"
          :colwidths="colwidths"
          class="ml-1"
        />
      </v-container>
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
  props: {},

  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapState({
      selected_account: (state) => state.active_account,
      selected_account_for_api: (state) => state.active_account_for_api,
      postion_deltas: (state) => state.position_deltas,
    }),
    colwidths() {
      let cols = [450];
      for (let index = 0; index < this.postion_deltas.length; index++) {
        cols.push(50);
      }
      return cols;
    },
    loaded() {
      this.postion_deltas.length > 0 ? true : false;
    },
  },
  methods: {},
};
</script>


