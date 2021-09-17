<template>
  <div class="lyc-wiki-search">
    <h1>Type to search Wikipedia</h1>
    <v-text-field v-model="search"></v-text-field>
    <div v-if="results">
      <h1>{{ results.term }}</h1>
      <ul v-if="results.matches.length">
        <li v-for="match in results.matches" :key="match.url">
          <a :href="match.url" target="_blank">{{ match.title }}</a>
          <p>{{ match.description }}</p>
        </li>
      </ul>
      <p v-else>No matches found.</p>
    </div>
  </div>
</template>

<script>
import { ajax } from "rxjs/ajax";
import {
  pluck,
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
} from "rxjs/operators";

const baseUrl =
  "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*";

export default {
  name: "RxjsWikiSearch",
  data() {
    return {
      search: "",
    };
  },
  subscriptions() {
    const _ = this;
    return {
      // this is the example in RxJS's readme.
      results: _.$watchAsObservable("search").pipe(
        pluck("newValue"),
        filter((text) => text.length > 2),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(_.fetchTerm),
        map(_.formatResult)
      ),
    };
  },
  methods: {
    fetchTerm(term) {
      return ajax.getJSON(`${baseUrl}&search=${term}`);
    },
    formatResult(res) {
      return {
        term: res[0],
        matches: res[1].map((title, i) => ({
          title: title,
          description: res[2][i],
          url: res[3][i],
        })),
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.lyc-wiki-search {
  margin-top: 20px;
  & h1 {
    color: $color-primary;
  }
}
</style>
