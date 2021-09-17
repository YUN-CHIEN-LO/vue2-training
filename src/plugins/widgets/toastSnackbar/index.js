import Vue from "vue";
import vuetify from "@/plugins/vuetify";
import { assignIn } from "lodash";
import ToastSnackbar from "./toastSnackbar.vue";

// 繼承客製化 Snackbar 元件
const ToastConstructor = Vue.extend(ToastSnackbar);

const LYCSnackbar = {
  /**
   * 註冊客製化 Snackbar 元件
   *
   * @param {Vue} Vue - Vue全域實例
   * @param {object} globalOptions - 全域選項參數
   */

  install(Vue, globalOptions = {}) {
    // 暫存 Snackbar 實體
    let toastComp = null;
    // Snackbar 序列化儲存槽
    const queueArray = [];
    // 自定義原型鏈屬性名稱
    const property = "$toast";

    /**
     * 實例化 ToastSnackbar Component
     *
     * @param {object} options - 選項參數
     * @returns {object} 回傳元件物件
     */
    function createComponent(options) {
      // 實例化 ToastSnackbar
      const component = new ToastConstructor();
      // 配置 Vuetify 原型鏈物件，以利 Snackbar 功能正常
      component.$vuetify = vuetify.framework;
      // ToastSnackbar 選項參數 (取得原型鏈全域選項 & 自定義傳入選項)
      const componentOptions = {
        ...Vue.prototype[property].globalOptions,
        ...options,
      };

      // 合併元件所有選項參數
      assignIn(component, componentOptions);

      // 產生元件實體
      const mainEle = document.querySelector("#app");
      mainEle.appendChild(component.$mount().$el);

      return component;
    }

    /**
     * 顯示 ToastSnackbar
     *
     * @param {string} text - 訊息文字
     * @param {object} options - 選項參數
     */
    function show(text, options = {}) {
      /**
       * 如果 Snackbar 實體存在
       * 先關閉已顯示的訊息
       * 再重新加入下一個訊息至序列中
       * 確保出現在最上層
       */
      if (toastComp) {
        toastComp.close();
        queueArray.unshift({ text, options });

        return;
      }

      // 設定訊息文字內容
      options.text = text;
      // 建立 Snackbar 實體
      toastComp = createComponent(options);

      // 監聽 snackbar 顯示/隱藏狀態
      toastComp.$on("statusChange", (isActive, wasActive) => {
        // 如果 Snackbar 為顯示狀態，在下個 DOM 掛載前註銷元件實體
        if (wasActive && !isActive) {
          toastComp.$nextTick(() => {
            // 移除 Snackbar
            removeComp();

            /**
             * 當序列儲存槽存在 Snackbar
             * 先移除第一個 Snackbar
             * 繼續顯示下一個顯示 Snackbar
             */
            if (queueArray.length) {
              const toast = queueArray.shift();
              show(toast.text, toast.options);
            }
          });
        }
      });
    }

    /**
     * 建立 ToastSnackbar 狀態方法
     *
     * @param {object} options - 選項參數
     * @returns {object} Snackbar Methods
     */
    function createStatusMethods(options = {}) {
      return {
        //成功
        success: (text) => {
          show(text, {
            icon: "mdi-check-circle",
            iconColor: "#75D284",
          });
        }, // 失敗
        error: (text) =>
          show(text, {
            icon: "mdi-alert-circle",
            iconColor: "#FF7474",
          }),
        // 警告
        warning: (text) =>
          show(text, {
            icon: "mdi-information",
            iconColor: "#FFE893",
          }),
        // 移除 Snackbar
        remove: () => removeComp(),
      };
    }

    /**
     * 移除元件實體
     */
    function removeComp() {
      if (toastComp) {
        // 註銷所有事件綁定與方法
        toastComp.$destroy();
        // 移除 Snackbar 樣板
        toastComp.$el.parentNode.removeChild(toastComp.$el);
        // 註銷 Snackbar 實體
        toastComp = null;
      }
    }

    /**
     * 取得元件實體
     *
     * @returns {object}
     */
    function getComp() {
      return toastComp;
    }

    // 合併 Snackbar 原型鏈所有選項與方法
    Vue.prototype[property] = assignIn(show, {
      globalOptions,
      getComp,
      ...createStatusMethods(globalOptions),
    });
  },
};

export default LYCSnackbar;
