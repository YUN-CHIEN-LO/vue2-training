<template>
  <div class="lyc-drag-drop" v-stream:mousemove="mouseMove$" ref="container">
    <div
      class="lyc-drag-drop__box"
      v-stream:mouseup="mouseUp$"
      v-stream:mousedown="mouseDown$"
      ref="box"
      :style="styles"
    ></div>
  </div>
</template>

<script>
import { takeUntil, concatMap, withLatestFrom } from "rxjs/operators";
export default {
  name: "DragDrop",
  domStreams: ["mouseDown$", "mouseUp$", "mouseMove$"],
  subscriptions() {
    let _ = this;
    return {
      pos: _.mouseDown$.pipe(
        concatMap((e) => _.mouseMove$.pipe(takeUntil(_.mouseUp$))),
        withLatestFrom(_.mouseDown$, (move, down) => {
          const mouseX = move.event.clientX;
          const mouseY = move.event.clientY;
          const offsetX = down.event.offsetX;
          const offsetY = down.event.offsetY;
          const containerW = _.$refs.container.clientWidth;
          const containerH = _.$refs.container.clientHeight;
          const containerX = _.$refs.container.getBoundingClientRect().left;
          const containerY = _.$refs.container.getBoundingClientRect().top;
          const boxW = _.$refs.box.clientWidth;
          const boxH = _.$refs.box.clientHeight;
          return {
            x: _.validValue(
              mouseX - offsetX - containerX,
              containerW - boxW,
              0
            ),
            y: _.validValue(
              mouseY - offsetY - containerY,
              containerH - boxH,
              0
            ),
          };
        })
      ),
    };
  },
  computed: {
    styles() {
      let ret = {};
      if (!this.pos)
        return {
          top: 0,
          left: 0,
        };
      ret.top = this.pos["y"] ? this.pos["y"] + "px" : "0px";
      ret.left = this.pos["x"] ? this.pos["x"] + "px" : "0px";
      return ret;
    },
  },
  methods: {
    /**
     * 判斷方塊位置
     *
     * @param {number} value - 原始值
     * @param {number} max - 最大邊際
     * @param {number} min - 最小邊際
     * @returns {number} - 方塊位置
     */
    validValue(value, max, min) {
      return Math.min(Math.max(value, min), max);
    },
  },
};
</script>

<style lang="scss" scoped>
.lyc-drag-drop {
  height: 300px;
  position: relative;
  width: 100%;
  &__box {
    position: absolute;
    top: -100px;
    left: 0;
    width: 100px;
    height: 100px;
    @include setShadow(5px, 5px, 5px);
    background-color: $color-info;
    cursor: move;
  }
}
</style>
