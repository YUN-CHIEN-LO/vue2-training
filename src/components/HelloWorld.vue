<template>
  <div class="lyc-hello" :class="[isColor, isAnimationOnLoad]">
    <lyc-header class="lyc-hello__header"> {{ text }} </lyc-header>
    <div class="lyc-hello__hole">
      <div class="wrapper">
        <transition name="pop">
          <monster
            class="lyc-hello__hole__monster"
            :color="$store.getters.formInfo.Color"
            v-show="showMonster"
          ></monster>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import LycHeader from "@/components/LycHeader.vue";
import Monster from "./Monster.vue";
export default {
  name: "HelloWorld",
  components: {
    Monster,
    LycHeader,
  },
  props: {
    color: {
      type: String,
      default: "primary",
    },
    text: {
      type: String,
      default: "Title",
    },
    animationOnLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showMonster: false,
      timer: null,
      isColor: `is-${this.color}`,
      isAnimationOnLoad: this.animationOnLoad ? "animationOnLoad" : "",
    };
  },
  mounted() {
    if (this.animationOnLoad) {
      this.timer = setTimeout(() => {
        this.showMonster = true;
      }, 1500);
    } else {
      this.showMonster = true;
    }
  },
  destroyed() {
    clearTimeout(this.timer);
  },
};
</script>

<style lang="scss" scoped>
.lyc-hello {
  position: relative;
  width: 100%;
  height: 100vh;
  &__hole {
    @include setCenter();
    overflow: hidden !important;
    width: 300px;
    height: 300px;
    border-radius: 100%;
    @include setInsetShadow();
    &__monster {
      animation: bobbing 10s cubic-bezier(0, 1.5, 1, 1.2) infinite;
      @include setCenter();
      top: calc(50% + 100px);
    }
  }
  &__header {
    position: absolute;
    width: 100%;
    transform: translateX(calc(-50% - 20px));
    left: 50%;
  }
}
.animationOnLoad {
  & .lyc-hello__hole {
    animation: onloadAnimation 1s ease;
  }
  & .lyc-hello__header {
    animation: onloadAnimationText 2s cubic-bezier(0, 1.5, 1, 1.2);
  }
}
.is-primary {
  & .lyc-hello__header {
    color: $color-primary;
  }
  & .lyc-hello__hole {
    background-color: $color-primary;
  }
}
.is-dark {
  & .lyc-hello__header {
    color: $color-dark;
  }
  & .lyc-hello__hole {
    background-color: $color-dark;
  }
}
.is-info {
  & .lyc-hello__header {
    color: $color-info;
  }
  & .lyc-hello__hole {
    background-color: $color-info;
  }
}
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.pop-enter-active {
  animation: pop-in 0.5s cubic-bezier(0, 1.5, 1, 1.5);
}

@keyframes onloadAnimationText {
  0% {
    transform: translateX(calc(-50% - 20px)) translateY(50px);
    opacity: 0;
  }
  50% {
    transform: translateX(calc(-50% - 20px)) translateY(100px);
    opacity: 0;
  }
  75% {
    transform: translateX(calc(-50% - 20px)) translateY(-100px);
    opacity: 0;
  }
  100% {
    transform: translateX(calc(-50% - 20px)) translateY(0px);
    opacity: 1;
  }
}

@keyframes onloadAnimation {
  0% {
    transform: translate(-50%, -50%) scale(0, 0);
  }
  25% {
    transform: translate(-50%, -50%) scale(0.4, 0.4);
  }
  50% {
    transform: translate(-50%, -50%) scale(0.2, 0.18);
  }
  75% {
    transform: translate(-50%, -50%) scale(1, 0.67);
  }
  80% {
    transform: translate(-50%, -50%) scale(0.67, 1);
  }
  100% {
    transform: translate(-50%, -50%) scale(1, 1);
  }
}

@keyframes pop-in {
  0% {
    top: 100%;
  }
  50% {
    top: calc(50% + 50px);
  }
  100% {
    top: calc(50% + 100px);
  }
}

@keyframes bobbing {
  0% {
    top: calc(50% + 100px);
  }
  50% {
    top: calc(50% + 50px);
  }
  100% {
    top: calc(50% + 100px);
  }
}
</style>
