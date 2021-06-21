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
          <h4
            class="
              font-weight-light
              text-center text-uppercase
              green--text
              text--lighten-3
            "
            align="center"
            justify="center"
          >
            {{ selected_account }}
          </h4>
        </div>
        <v-spacer></v-spacer>
      </v-toolbar>
    </div>
    <div class="d-flex flex-row mb-5 flex-nowrap"></div>
  </div>
</template>


<script>
import { mapState } from "vuex";

export default {
  components: {},
  async created() {},
  data() {
    return {
      componentKey: 0,
    };
  },
  computed: {
    ...mapState({
      selected_account: (state) => state.active_account,
    }),
  },
  methods: {
    dev() {},
  },
};
</script>



<style lang="scss">
</style>
