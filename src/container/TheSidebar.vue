<template>
  <v-navigation-drawer
    :mini-variant="minify"
    :color="sideBarColor"
    overlay-opacity="0.25"
    app
    dark
    permanent
    width="200"
  >
    <v-list dense>
      <v-list-item
        @click="() => $router.push({ name: 'Home' }).catch(() => {})"
      >
        <v-list-item-action>
          <v-icon color="blue lighten-3">mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        @click="() => $router.push({ name: 'Analytics' }).catch(() => {})"
      >
        <v-list-item-action>
          <v-icon color="blue lighten-3">mdi-google-analytics</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Account Analytics</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <v-list dense>
        <v-list-item justify-end class="float-right">
          <v-list-item-action>
            <v-icon
              @click="setSidebarMinified"
              color="green lighten-3"
              class="mt-4"
            >
              {{
                minify ? "mdi-chevron-double-right" : "mdi-chevron-double-left"
              }}
            </v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TheSidebar",
  data: () => ({
    sideBarColor: "#385F73",
  }),
  created() {},
  components: {},
  props: {
    showsidebar: { type: Boolean },
  },
  methods: {
    setSidebarMinified() {
      this.$store.dispatch("setSidebarMinified");
    },
  },
  computed: {
    ...mapState({
      minify: (state) => state.sidebarMinified,
    }),
  },
  watch: {
    showsidebar() {
      this.drawer = this.showsidebar;
    },
  },
};
</script>
