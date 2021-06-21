<template>
  <v-app class="main">
    <LoadingScreen :isLoading="isLoading" />
    <main v-if="!isLoading">
      <router-view :key="$route.fullPath"></router-view>
      <div class="text-center ma-2">
        <v-snackbar
          rounded="pill"
          :centered="snackbar.centered"
          :bottom="snackbar.bottom"
          :top="snackbar.top"
          elevation="20"
          v-for="snackbar in snackbars.filter((s) => s.showing)"
          :key="snackbar.text + Math.random()"
          v-model="snackbar.showing"
          timeout="2000"
          :color="snackbar.color"
        >
          {{ snackbar.text }}
          <template v-slot:action="{ attrs }">
            <v-btn
              color="pink"
              text
              v-bind="attrs"
              @click="snackbar.showing = false"
              >Close</v-btn
            >
          </template>
        </v-snackbar>
      </div>
    </main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

export default {
  name: "App",
  components: {
    LoadingScreen,
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("scroll", this.handleResize);
    this.handleResize();
  },
  computed: {
    ...mapState({
      snackbars: (state) => state.snackbars,
    }),
  },

  data: () => ({
    isLoading: true,
  }),
  methods: {
    handleResize() {
      let scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      this.$store.dispatch("setWindowDimensions", {
        width: window.innerWidth,
        height: scrollHeight - 50,
      });
    },
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
      this.$store.dispatch("alertMainAppLoaded");
    }, 1000);
  },
};
</script>

<style></style>
