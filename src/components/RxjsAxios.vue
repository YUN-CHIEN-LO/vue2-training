<template>
  <div class="lyc-rxjs-axios">
    <v-btn v-stream:click="get$"> Click me to send API </v-btn>
  </div>
</template>

<script>
import api from "@/api/index";
import { debounceTime, map } from "rxjs/operators";
export default {
  name: "RxjsAxios",
  domStreams: ["get$"],
  subscriptions() {
    const _ = this;
    return {
      response: _.get$.pipe(debounceTime(500), map(_.getApi)),
    };
  },
  methods: {
    getApi() {
      const _ = this;
      api.rxjs
        .getRxjs()
        .then((res) => {
          console.log(res.data.text);
          _.$toast.success(res.data.text);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.lyc-rxjs-axios {
  margin: 20px 0px;
}
</style>
