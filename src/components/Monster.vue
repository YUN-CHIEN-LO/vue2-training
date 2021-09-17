<template>
  <div class="lyc-monster" :class="[shadow ? 'is-shadow' : '']">
    <div class="lyc-monster__head" :style="setColor">
      <div class="lyc-monster__eyes">
        <div class="lyc-monster__eye">
          <div class="wrapper">
            <div class="lyc-monster__eye__pupil eye1" ref="eye1"></div>
          </div>
          <div class="lyc-monster__eye__lid" :style="setColor"></div>
        </div>
        <div class="lyc-monster__eye">
          <div class="wrapper">
            <div class="lyc-monster__eye__pupil eye2" ref="eye2"></div>
          </div>
          <div class="lyc-monster__eye__lid" :style="setColor"></div>
        </div>
      </div>
    </div>
    <div class="lyc-monster__body" :style="setColor"></div>
    <div
      class="lyc-monster__dialog"
      :style="setBorder"
      :class="[isSayHello ? 'dialog-animation' : '']"
    >
      Hello {{ name }}!
    </div>
    <img
      v-permission="['member']"
      class="is-member"
      :src="img.glasses"
      alt=""
    />
    <div v-permission="['user']" class="is-user">
      <img :src="img.lollipop" alt="" />
      <div class="is-user__mounth" :style="setColor"></div>
    </div>
    <img v-permission="['admin']" class="is-admin" :src="img.mustache" alt="" />
  </div>
</template>

<script>
import setColor from "@/mixins/setColor";
export default {
  name: "Monster",
  mixins: [setColor],
  data() {
    return {
      root: null,
      name: "",
      isSayHello: false,
      img: {
        mustache: "https://i.imgur.com/oaTTLNE.png",
        glasses: "https://i.imgur.com/ap2CNh5.png",
        lollipop:
          "https://hotemoji.com/images/dl/k/lollipop-emoji-by-twitter.png",
      },
    };
  },
  props: {
    color: {
      type: String,
      default: "Blue",
    },
    shadow: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.root = document.documentElement;
    document.addEventListener("mousemove", (evt) => {
      const mousex = -(innerWidth / 2 - evt.pageX);
      const mousey = -(innerHeight / 2 - evt.pageY);

      const pupilWidth = 30;
      const eye1y = this.$refs.eye1
        ? -(innerHeight / 2 - this.$refs.eye1.getBoundingClientRect().top - 15)
        : mousey;
      let y = 0;
      if (Math.abs(eye1y - mousey) <= pupilWidth) y = mousey - eye1y;
      else {
        y = Math.sign(mousey - eye1y) * pupilWidth;
      }

      const eye1x = this.$refs.eye1
        ? -(innerWidth / 2 - this.$refs.eye1.getBoundingClientRect().left - 15)
        : mousex;

      let x1 = 0;
      if (Math.abs(eye1x - mousex) <= pupilWidth)
        x1 = Math.round(mousex - eye1x);
      else {
        x1 = Math.sign(mousex - eye1x) * pupilWidth;
      }

      const eye2x = this.$refs.eye2
        ? -(innerWidth / 2 - this.$refs.eye2.getBoundingClientRect().left - 15)
        : mousex;

      let x2 = 0;
      if (Math.abs(eye2x - mousex) <= pupilWidth)
        x2 = Math.round(mousex - eye2x);
      else {
        x2 = Math.sign(mousex - eye2x) * pupilWidth;
      }

      if (this.root) {
        this.root.style.setProperty("--eye-y", y);
        this.root.style.setProperty("--eye-x1", x1);
        this.root.style.setProperty("--eye-x2", x2);
      }
    });
  },
  destroyed() {
    document.removeEventListener("mousemove", (evt) => {
      console.log("kill monster");
    });
    if (this.root) {
      this.root.style.removeProperty("--eye-y");
      this.root.style.removeProperty("--eye-x1");
      this.root.style.removeProperty("--eye-x2");
    }
    this.root = null;
  },
  methods: {
    sayHello(name) {
      this.isSayHello = true;
      this.name = name;
      setTimeout(() => {
        this.isSayHello = false;
      }, 1000);
    },
  },
};
</script>

<style scoped lang="scss">
@mixin setCenter() {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}
.is-shadow {
  @include setShadow();
}
.lyc-monster {
  position: relative;
  @include setTopDome(100px);
  width: 200px;
  &__head {
    position: relative;
    @include setTopDome(100px);
    width: 100%;
    height: 200px;
  }
  &__body {
    top: 100%;
    width: 100%;
    height: 100px;
  }
  &__eyes {
    @include setCenter();
    display: flex;
  }
  &__eye {
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 100%;
    background-color: $color-white;
    overflow: hidden;
    margin: 10px;
    &__lid {
      position: absolute;
      top: 0;
      left: 0;
      @include setTopDome(40px);
      background-color: green;
      width: 100%;
      height: 0%;
      @include setInsetShadow(5px, 10px, 5px);
      animation: blink 3s linear -3s infinite alternate-reverse;
    }
    &__pupil {
      @include setCenter();
      width: 60px;
      height: 60px;
      border-radius: 100%;
      background-color: $color-dark;
      transition-duration: 0.1s;
      top: calc(50% + var(--eye-y, 0) * 1px);
    }
    & .eye1 {
      left: calc(50% + var(--eye-x1, 0) * 1px);
    }
    & .eye2 {
      left: calc(50% + var(--eye-x2, 0) * 1px);
    }
  }
  &__dialog {
    position: absolute;
    text-align: center;
    @include setCenter();
    border-width: 5px;
    border-style: solid;
    background-color: $color-white;
    border-radius: 100%;
    width: 80%;
    min-width: 100px;
    padding: 20px;
    opacity: 0;
    &::after {
      content: "";
      position: absolute;
      background-color: $color-white;
      width: 20px;
      height: 20px;
      transform: translate(-50%, 0%) rotate(45deg) skew(15deg, 15deg);
      top: calc(100% - 10px);
      left: 50%;
    }
  }
}
.dialog-animation {
  animation: popout 1s linear;
}
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.is-admin {
  @include setCenter();
  animation: mustache 1s linear infinite alternate-reverse;
}
.is-member {
  @include setCenter();
  transform: translate(-50%, -50%) scale(0.36);
  top: calc(50% - 50px);
}
.is-user {
  @include setCenter();
  top: calc(50% + 50px);
  & img {
    @include setCenter();
    transform: translate(calc(-50% + 10px), -50%) scale(0.2);
    animation: lollipop 1s linear infinite alternate-reverse;
  }
  &__mounth {
    @include setCenter();
    width: 50px;
    top: -50px;
    border-radius: 100%;
    animation: eat 1s linear infinite alternate-reverse;
  }
}
@keyframes mustache {
  0% {
    transform: translate(-50%, -50%) scale(0.3);
  }
  50% {
    transform: translate(-50%, -50%) scale(0.3);
  }
  90% {
    transform: translate(-50%, -50%) scale(0.3) rotate(-5deg);
  }
  95% {
    transform: translate(-50%, -50%) scale(0.3) rotate(5deg);
  }
  100% {
    transform: translate(-50%, -50%) scale(0.3) rotate(-5deg);
  }
}

@keyframes lollipop {
  0% {
    transform: translate(calc(-50% + 10px), -50%) scale(0.2);
  }
  50% {
    transform: translate(calc(-50% + 10px), -50%) scale(0.2);
  }
  90% {
    transform: translate(calc(-50% + 10px), -50%) scale(0.2) rotate(15deg);
  }
  100% {
    transform: translate(calc(-50% + 10px), -50%) scale(0.2);
  }
}
@keyframes eat {
  0% {
    height: 0px;
  }
  50% {
    height: 10px;
  }
  90% {
    height: 50px;
  }
  100% {
    height: 0px;
  }
}
@keyframes popout {
  0% {
    opacity: 0;
    top: 50%;
  }
  30% {
    opacity: 1;
    top: 0px;
  }
  90% {
    opacity: 1;
    top: -30px;
  }
  100% {
    opacity: 0;
    top: -100px;
  }
}

@keyframes blink {
  0% {
    height: 0%;
  }
  90% {
    height: 0%;
  }
  98% {
    height: 100%;
  }
  100% {
    height: 100%;
  }
}
</style>
