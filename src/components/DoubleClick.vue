<template>
  <div class="lyc-double-click">
    <v-btn v-stream:click="dclick$">Double Click Me !</v-btn>
    <div v-show="false">{{ dclick }}</div>
  </div>
</template>

<script>
import { bufferTime, filter } from "rxjs/operators";
export default {
  name: "RxjsDoubleClick",
  domStreams: ["dclick$"],
  subscriptions() {
    return {
      dclick: this.dclick$.pipe(
        bufferTime(500),
        filter((arr) => arr.length >= 2)
      ),
    };
  },
  updated() {
    if (this.dclick) {
      console.log("Double Click !");
      this.$toast.success("Double Click !");
    }
  },
};
</script>

<style lang="scss" scoped>
.lyc-double-click {
  margin: 20px 0px;
}
</style>
