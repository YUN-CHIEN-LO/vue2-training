import Vue from "vue";
import vuetify from "@/plugins/vuetify";
import { assignIn } from "lodash";
import LycDialog from "./lycDialog.vue";

const DialogConstructor = Vue.extend(LycDialog);

const LYCDialog = {
  install(Vue, globalOptions = {}) {
    let dialogComp = null;
    const property = "$dialog";
    let _emitter = new Vue({});
    const events = [
      "dialog:open",
      "dialog:close",
      "dialog:destroy",
      "dialog:click:btn",
      "dialog:click:outside",
      "dialog:input",
      "dialog:keydown",
    ];

    /**
     * 實例化 LycDialog Component
     *
     * @param {object} options - 選項參數
     * @returns {object} 回傳元件物件
     */
    function createComponent(options) {
      // 實例化 LycDialog
      const component = new DialogConstructor();
      // 配置 Vuetify 原型鏈物件，以利 Dialog 功能正常
      component.$vuetify = vuetify.framework;
      // LycDialog 選項參數 (取得原型鏈全域選項 & 自定義傳入選項)
      const componentOptions = {
        ...Vue.prototype[property].globalOptions,
        ...options,
      };

      // 合併元件所有選項參數
      assignIn(component, componentOptions);

      // 產生元件實體
      try {
        const mainEle = document.querySelector("#app");
        mainEle.appendChild(component.$mount().$el);
      } catch (error) {
        console.log(error);
      }

      return component;
    }

    /**
     * 移除實體
     */
    function removeComp() {
      if (dialogComp) {
        // 註銷所有事件綁定與方法
        dialogComp.$destroy();
        // 移除 Dialog 樣板
        dialogComp.$el.parentNode.removeChild(dialogComp.$el);
        // 註銷 Dialog 實體
        dialogComp = null;
      }
    }

    /**
     * 建立 LycDialog 狀態方法
     *
     * @param {object} options - 選項參數
     * @returns {object} LycDialog Methods
     */
    function dialogMethods(options = {}) {
      return {
        /**
         * 創建dialog
         *
         * @param {string} title - 標題
         * @param {object} context - 插入的原件
         * - el :  元件
         * - params : {object} 元件的 options
         * @param {object} options - dialog 設定
         * @returns {object} Dialog 實體
         */
        create: (title, context, options = {}) => {
          create(title, context, options);
          return getComp();
        },

        /**
         * 開啟 dialog
         */
        open: () => {
          dialogComp.open();
        },

        /**
         * 關閉 dialog
         */
        close: () => {
          dialogComp.close();
        },

        /**
         * 註銷 dialog
         */
        destroy: () => {
          dialogComp.destroy();
        },
      };
    }

    /**
     * 取得元件實體
     *
     * @returns {object}
     */
    function getComp() {
      return dialogComp;
    }

    /**
     * 顯示 LycDialog
     *
     * @param {string} title - 標題文字
     * @param {object} context - 插入元件
     * @param {object} options - 選項參數
     */
    function create(title, context, options = {}) {
      options.title = title;
      options.el = context && context.el ? context.el : null;
      options.elProps = context && context.params ? context.params : {};

      // 建立 Dialog 實體
      dialogComp = createComponent(options);

      // 繼承事件
      events.forEach((event) => {
        dialogComp.$on(event, (value = null) => {
          _emitter.$emit(event, value);
        });
      });

      // 當dialog被移除，註銷元件實體
      dialogComp.$on("dialog:destroy", () => {
        dialogComp.$nextTick(() => {
          removeComp();
          return getComp();
        });
      });
    }

    Vue.prototype[property] = assignIn(create, {
      globalOptions,
      getComp,
      ...dialogMethods(globalOptions),
    });
  },
};

export default LYCDialog;
