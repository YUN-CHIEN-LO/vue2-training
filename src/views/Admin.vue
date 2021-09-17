<template>
  <v-container class="lyc-page-admin">
    <v-row justify="center">
      <lyc-header :type="'sm'">You have access to EVERYTHING !</lyc-header>
    </v-row>
    <v-row justify="center">
      <monster :role="'admin'" :color="$store.getters.formInfo.Color"></monster>
    </v-row>
  </v-container>
</template>

<script>
import LycHeader from "@/components/LycHeader.vue";
import Monster from "@/components/Monster.vue";
export default {
  name: "Admin",
  components: {
    LycHeader,
    Monster,
  },
};
</script>
