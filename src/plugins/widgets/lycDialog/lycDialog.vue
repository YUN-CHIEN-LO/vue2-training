<template>
  <v-dialog
    v-model="dialog"
    :persistent="persistent"
    :fullscreen="fullscreen"
    :hide-overlay="hideOverlay"
    :scrollable="scrollable"
    :max-width="maxWidth"
    :width="width"
    @click:outside="handClickOutside"
    @input="handInput"
    @keydown="handKeydown"
    class="lyc-dialog"
  >
    <v-card color="rgb(255, 255, 255, 0.2)">
      <!-- 標題 -->
      <v-card-title
        class="text-h5"
        style="background-color: #fff"
        :class="[centerTitle ? 'is-center' : '']"
      >
        {{ title }}
      </v-card-title>
      <!-- 內容 -->
      <v-card-text
        :class="[centerMessage ? 'is-center' : '']"
        style="padding: 20px 0px"
      >
        <span v-html="message"></span>
        <component :is="el" v-bind="elProps" ref="el">
          <slot />
        </component>
      </v-card-text>
      <!-- 按鈕 -->
      <v-card-actions style="background-color: #fff">
        <v-spacer></v-spacer>
        <v-btn
          v-for="btn in buttons"
          :key="btn.prop"
          :disabled="btn.disabled"
          :color="btn.color"
          :class="btn.cssClass"
          :text="btn.text ? btn.text : true"
          :ref="btn.prop"
          @click="handClick(btn.prop, btn.action)"
        >
          {{ btn.label }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "LycDialog",
  props: {
    el: {
      type: [String, Object],
      default: "div",
    },
    elProps: {
      type: Object,
      default: function () {
        return {};
      },
    },
    title: {
      type: String,
      default: "Default Title",
    },
    message: {
      type: [String, Function],
      default: "",
    },
    persistent: {
      type: Boolean,
      default: false,
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    hideOverlay: {
      type: Boolean,
      default: false,
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
    maxWidth: {
      type: [String, Number],
      default: 300,
    },
    width: {
      type: [String, Number],
      default: "auto",
    },
    centerTitle: {
      type: Boolean,
      default: false,
    },
    centerMessage: {
      type: Boolean,
      default: false,
    },
    buttons: {
      type: Array,
      default: function () {
        return [
          {
            prop: "agree",
            label: "不同意",
            action: function (dialog) {
              dialog.close();
            },
          },
          {
            prop: "disagree",
            label: "同意",
            action: function (dialog) {
              dialog.close();
            },
          },
        ];
      },
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    /**
     * 開啟彈窗
     */
    open() {
      this.dialog = true;
      this.$emit("dialog:open");
    },

    /**
     * 關閉彈窗
     *
     * @param {Event} pointerEvent - 點擊事件
     */
    close(pointerEvent = null) {
      this.dialog = false;
      this.$emit("dialog:close", pointerEvent);
    },

    /**
     * 註銷彈窗
     */
    destroy() {
      this.dialog = false;
      this.$emit("dialog:destroy");
    },

    /**
     * 點擊按鈕事件
     *
     * @param {string} prop - 按鈕標籤
     * @param {Function} action - 回呼函式
     */
    handClick(prop, action = () => {}) {
      this.$emit("dialog:click:btn", prop);
      action(this);
    },

    /**
     * 點擊彈窗外事件
     *
     * @param {Event} pointerEvent - 點擊事件
     */
    handClickOutside(pointerEvent) {
      this.close();
      this.$emit("dialog:click:outside", pointerEvent);
    },

    /**
     * input 事件
     */
    handInput() {
      this.$emit("dialog:input");
    },

    /**
     * 鍵盤事件
     *
     * @param {Event} keyEvent - 鍵盤事件
     */
    handKeydown(keyEvent) {
      if (keyEvent.key === "Escape") {
        this.close();
      }
      this.$emit("dialog:keydown", keyEvent);
    },
  },
};
</script>

<style lang="scss" scoped>
.is-center {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
