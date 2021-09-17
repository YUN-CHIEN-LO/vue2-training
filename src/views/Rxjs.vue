<template>
  <v-container class="lyc-page-rxjs">
    <v-row justify="center">
      <lyc-header>RxJS Demo</lyc-header>
    </v-row>
    <v-row justify="center" class="lyc-page-rxjs__row">
      <rxjs-timer></rxjs-timer>
    </v-row>
    <v-row justify="center" class="lyc-page-rxjs__row lyc-page-rxjs__odd">
      <rxjs-counter></rxjs-counter>
    </v-row>
    <v-row justify="center" class="lyc-page-rxjs__row">
      <rxjs-double-click></rxjs-double-click>
    </v-row>
    <v-row justify="center" class="lyc-page-rxjs__row lyc-page-rxjs__odd">
      <rxjs-drag-drop></rxjs-drag-drop>
    </v-row>
    <v-row justify="center" class="lyc-page-rxjs__row">
      <rxjs-wiki-search></rxjs-wiki-search>
    </v-row>
    <v-row justify="center" class="lyc-page-rxjs__row lyc-page-rxjs__odd">
      <rxjs-bored-api></rxjs-bored-api>
    </v-row>
    <v-row justify="center" class="lyc-page-rxjs__row">
      <rxjs-axios></rxjs-axios>
    </v-row>
  </v-container>
</template>

<script>
import LycHeader from "@/components/LycHeader.vue";
import RxjsCounter from "@/components/Counter.vue";
import RxjsDoubleClick from "@/components/DoubleClick.vue";
import RxjsDragDrop from "@/components/DragDrop.vue";
import RxjsWikiSearch from "@/components/WikiSearch.vue";
import RxjsBoredApi from "@/components/BoredApi.vue";
import RxjsAxios from "@/components/RxjsAxios.vue";
import RxjsTimer from "@/components/Timer.vue";

export default {
  name: "Rxjs",
  components: {
    LycHeader,
    RxjsCounter,
    RxjsDoubleClick,
    RxjsDragDrop,
    RxjsWikiSearch,
    RxjsBoredApi,
    RxjsAxios,
    RxjsTimer,
  },
};
</script>

<style lang="scss" scoped>
.lyc-page-rxjs {
  padding: 50px;
  &__row {
    padding: 20px;
    overflow: hidden;
  }
  &__odd {
    @include setInsetShadow(10px, 10px, 10px);
    background-color: $color-secondary;
    border-radius: 20px;
  }
  padding-bottom: 50px;
}
</style>
