<template>
  <v-footer color="blue-grey lighten-1" app>
    <span class="white--text">Jamie Sokolsky &copy; 2021</span>
    <v-spacer />
    <span class="white--text">User: {{ userName }}</span>
  </v-footer>
</template>

<script>
export default {
  name: "TheFooter",
  data() {
    return {
      userName: "USERNAME",
    };
  },
};
</script>
