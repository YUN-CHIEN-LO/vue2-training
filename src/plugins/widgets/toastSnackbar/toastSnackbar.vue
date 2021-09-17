<template>
  <v-snackbar
    app
    class="lyc-toast-snackbar"
    content-class="lyc-toast-snackbar__content"
    bottom
    :timeout="timeout"
    v-model="snackbar"
    role="alert"
  >
    <!-- 狀態圖示 -->
    <v-icon :color="iconColor">{{ icon }}</v-icon>

    <!-- 訊息內容 -->
    <span class="erp-toast-snackbar__content--text pl-1">
      {{ text }}
    </span>

    <!-- 關閉按鈕 -->
    <template v-slot:action="{ attrs }">
      <v-btn color="#ffffff" icon text v-bind="attrs" @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "ToastSnackbar",
  props: {
    // 訊息內容
    text: {
      type: String,
      default: "Success",
    },
    // 自動隱藏時間
    timeout: {
      type: Number,
      default: 3000,
    },
    // 狀態圖示
    icon: {
      type: String,
      default: "mdi-information",
    },
    // 圖示顏色
    iconColor: {
      type: String,
      default: "#FFFFFF",
    },
  },
  data() {
    return {
      // snackbar 顯示/隱藏狀態值
      snackbar: false,
    };
  },
  mounted() {
    // DOM 掛載完成後，顯示 Snackbar
    this.$nextTick(() => this.show());
  },
  methods: {
    /**
     * 顯示 Snackbar
     */
    show() {
      this.snackbar = true;
    },
    /**
     * 隱藏 Snackbar
     */
    close() {
      this.snackbar = false;
    },
  },
  watch: {
    /**
     * 監聽 snackbar 顯示/隱藏狀態的 Callback
     *
     * @param {boolean} isActive - 當前狀態
     * @param {boolean} wasActive - 已變更狀態
     */
    snackbar: function (isActive, wasActive) {
      this.$emit("statusChange", isActive, wasActive);
    },
  },
};
</script>

<style lang="scss">
.lyc-toast-snackbar {
  .v-sheet {
    &.v-snack {
      &__wrapper {
        &:not(.v-sheet--outlined) {
          box-shadow: none !important;
        }
      }
    }
  }

  &__content {
    &--text {
      display: inline-block;
      vertical-align: middle;
      line-height: 24px;

      color: map-get($shades, "white");
    }
  }
}
</style>
