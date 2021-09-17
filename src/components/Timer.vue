<template>
  <div class="lyc-timer">
    <h1>{{ count$ }}</h1>
  </div>
</template>

<script>
import { timer } from "rxjs";
import { map } from "rxjs/operators";
export default {
  name: "RxjsTimer",
  subscriptions() {
    const _ = this;

    return {
      count$: timer(0, 1000).pipe(map(_.toSeconds)),
    };
  },
  methods: {
    toSeconds(num) {
      const min = Math.floor(num / 60);
      const sec = num - min * 60;
      return `${min.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })} : ${sec.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.lyc-timer {
  color: $color-secondary;
  font-size: 50px;
  font-weight: bolder;
  @include setShadow(5px, 5px, 5px);
}
</style>
