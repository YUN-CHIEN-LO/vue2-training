<template>
  <div class="lyc-counter">
    <v-btn v-stream:click="minus$">Minus</v-btn>
    <div class="lyc-counter__text">{{ count }}</div>
    <v-btn v-stream:click="plus$">Plus</v-btn>
  </div>
</template>

<script>
import { merge } from "rxjs";
import { map, startWith, scan } from "rxjs/operators";
export default {
  name: "RxjsCounter",
  domStreams: ["plus$", "minus$"],
  subscriptions() {
    return {
      count: merge(
        this.plus$.pipe(map(() => 1)),
        this.minus$.pipe(map(() => -1))
      ).pipe(
        startWith(0),
        scan((total, change) => total + change)
      ),
    };
  },
};
</script>

<style lang="scss" scoped>
.lyc-counter {
  display: flex;
  justify-content: center;
  align-items: center;
  &__text {
    color: $color-white;
    font-size: 50px;
    font-weight: bolder;
    margin: 0px 20px;
    width: 50px;
    text-align: center;
    @include setShadow(5px, 5px, 5px);
  }
}
</style>
