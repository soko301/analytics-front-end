<template>
  <div>
    <div v-if="loaded">
      <v-card class="mx-auto" min-width="900" tile>
        <v-list flat>
          <v-subheader>Details</v-subheader>

          <v-list-item>
            <v-list-item-content>
              <div v-for="item in apiData" :key="item" class="mb-5">
                <div v-for="(value, name) in item" :key="name">
                  <div class="d-flex no-wrap">
                    <div class="font-weight-medium blue--text text--darken-3">
                      {{ name }}:
                    </div>
                    <v-spacer />
                    <div>{{ value }}</div>
                  </div>
                </div>
                <v-divider class="my-2" />
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script>
import Api from "@/apis/default/ClientApi.js";

export default {
  name: "dtSearchController",
  components: {},
  props: {
    searchBookingRef: { type: Array },
  },

  data() {
    return {
      apiData: [],
      loaded: false,
      componentKey: 0,
    };
  },
  async created() {
    await this.getApiData();
  },
  computed: {
    data_table_data() {
      return this.apiData;
    },
  },
  methods: {
    dev() {
      console.log(this.apiData);
    },
    async getApiData() {
      try {
        let response = await Api.get_deal_details(this.searchBookingRef);
        this.apiData = response.data;
        console.log(this.apiData[0]);
        this.loaded = true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>


