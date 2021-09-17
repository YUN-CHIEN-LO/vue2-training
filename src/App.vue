<template>
  <v-app>
    <side-bar />
    <v-main class="lyc-app-page">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
export default {
  name: "App",
  components: {
    SideBar,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss" scoped>
.lyc-app-page {
  background-color: $color-light;
}
</style>
