<template>
  <v-container class="lyc-page-user">
    <v-row justify="center">
      <lyc-header :type="'sm'">You have access to basic pages.</lyc-header>
    </v-row>
    <v-row justify="center">
      <monster :role="'user'" :color="$store.getters.formInfo.Color"></monster>
    </v-row>
  </v-container>
</template>

<script>
import LycHeader from "@/components/LycHeader.vue";
import Monster from "@/components/Monster.vue";
export default {
  name: "User",
  components: {
    LycHeader,
    Monster,
  },
};
</script>
