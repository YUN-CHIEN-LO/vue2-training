<template>
  <div class="lyc-ig-wall">
    <v-btn v-stream:click="generate$"> I'm bored ! </v-btn>
    <h1>{{ results }}</h1>
  </div>
</template>

<script>
import { ajax } from "rxjs/ajax";
import { debounceTime, switchMap, map } from "rxjs/operators";
const baseUrl = "https://www.boredapi.com/api";
export default {
  name: "RxjsBoredApi",
  domStreams: ["generate$"],
  subscriptions() {
    const _ = this;
    return {
      results: _.generate$.pipe(
        debounceTime(500),
        switchMap(_.fetchTerm),
        map(_.formatResult)
      ),
    };
  },
  data() {
    return {
      search: "",
    };
  },
  methods: {
    fetchTerm() {
      return ajax.getJSON(`${baseUrl}/activity`);
    },
    formatResult(res) {
      return res.activity;
    },
  },
};
</script>

<style lang="scss" scoped>
.lyc-ig-wall {
  padding: 20px 0px;
  text-align: center;
  & h1 {
    margin-top: 10px;
    color: $color-white;
    @include setShadow(5px, 5px, 5px);
  }
}
</style>
