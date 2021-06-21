<template>
  <div>
    <div class="d-flex flex-row mb-5 flex-nowrap">
      <v-toolbar color="#385F73" min-width="800" collapse>
        <v-spacer></v-spacer>
        <div class="d-flex flex-column mr-10">
          <h4
            class="
              font-weight-medium
              text-center text-uppercase
              grey--text
              text--lighten-3
            "
          >
            Makor Analytics
          </h4>
          <div class="d-flex flex-row class ml-10">
            <h4
              class="
                font-weight-light
                text-center text-uppercase
                green--text
                text--lighten-3
              "
            >
              {{ selected_account }}
            </h4>
            <h4
              v-if="analytics_main_view !== 'SUMMARY'"
              class="
                ml-3
                font-weight-light
                text-center text-uppercase
                blue--text
                text--lighten-3
              "
            >
              {{ active_cross }}
            </h4>
          </div>
        </div>
        <v-spacer></v-spacer>
      </v-toolbar>
    </div>
    <div class="d-flex flex-row mb-5 flex-nowrap">
      <ClientMain />
    </div>
  </div>
</template>


<script>
import ClientMain from "@/components/clientData/clientAnalytics/Main.vue";

import { mapState } from "vuex";
export default {
  components: {
    ClientMain,
  },
  async created() {},
  data() {
    return {
      componentKey: 0,
    };
  },
  computed: {
    ...mapState({
      selected_account: (state) => state.active_account,
      active_cross: (state) => state.active_cross,
      analytics_main_view: (state) => state.analytics_main_view,
    }),
  },
  methods: {
    dev() {},
  },
};
</script>



<style lang="scss">
</style>
