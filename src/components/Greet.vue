<template>
  <div class="lyc-greet">
    <p>According to Vuex...</p>
    <transition name="slide-fade" mode="out-in">
      <div :key="showJson">
        <div class="lyc-greet__dialog" v-show="!showJson">
          <p v-if="formInfo.Name && formInfo.Name != ''">
            Hello,
            <span :style="setColor">{{ formInfo.Name }}</span>
            !
          </p>
          <p v-if="formInfo.Email && formInfo.Email != ''">
            Your e-mail is <span :style="setColor">{{ formInfo.Email }}</span
            >.
          </p>
          <p v-if="formInfo.Color && formInfo.Color != ''">
            Your color is <span :style="setColor">{{ formInfo.Color }}</span
            >.
          </p>
        </div>
        <div class="lyc-greet__json" v-show="showJson">
          <pre
            >{{ formInfo }}
        </pre
          >
        </div>
      </div>
    </transition>
    <v-btn @click="toggleJson" small> {{ btnText }} JSON</v-btn>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import setColor from "@/mixins/setColor";
export default {
  name: "Greet",
  mixins: [setColor],
  computed: {
    ...mapGetters(["showJson", "formInfo"]),
  },
  data() {
    return {
      text: null,
      btnText: "Show",
    };
  },
  methods: {
    /**
     * 顯示/隱藏 JSON
     */
    toggleJson() {
      this.$store.dispatch("greet/setShowJson", this.showJson);
      this.btnText = this.showJson ? "Hide" : "Show";
    },
  },
};
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
  max-height: 230px;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
  max-height: 230px;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
  max-height: 0px;
}
.lyc-greet {
  position: relative;
  background: $color-white;
  padding: 15px;
  border-radius: 10px;
  min-width: 100px;
  width: 100%;
  @include setShadow(5px, 5px);
  &__json,
  &__dialog {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    margin-bottom: 10px;
  }
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
  & span {
    padding: 0px 5px;
  }
}
</style>
