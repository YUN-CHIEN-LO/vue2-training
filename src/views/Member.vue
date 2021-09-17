<template>
  <v-container class="lyc-page-member">
    <v-row justify="center">
      <lyc-header :type="'sm'"
        >You can access both Member and User pages.</lyc-header
      >
    </v-row>
    <v-row justify="center">
      <monster
        :role="'member'"
        :color="$store.getters.formInfo.Color"
      ></monster>
    </v-row>
  </v-container>
</template>

<script>
import LycHeader from "@/components/LycHeader.vue";
import Monster from "@/components/Monster.vue";
export default {
  name: "Member",
  components: {
    LycHeader,
    Monster,
  },
};
</script>
