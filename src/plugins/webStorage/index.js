import { BaseStorage } from "@/plugins/webStorage/storage";

const _global = typeof window !== "undefined" ? window : global || {};

// 引用所有註冊鍵值
export * from "@/plugins/webStorage/keymap";

// JS File 引用
export const lStorage = new BaseStorage(_global.localStorage);
export const sStorage = new BaseStorage(_global.sessionStorage);

/**
 * BI 專用 Storage
 */
const TrainStorage = {
  install(Vue) {
    // === Vue 全域使用方法 ===
    Vue["LStorage"] = lStorage;
    Vue["SStorage"] = sStorage;

    // === Vue 區域使用方法 ===
    Object.defineProperty(Vue.prototype, "$LStorage", {
      /**
       * Define $LStorage property
       *
       * @returns {BaseStorage}
       */
      get() {
        return lStorage;
      },
    });

    Object.defineProperty(Vue.prototype, "$SStorage", {
      /**
       * Define $SStorage property
       *
       * @returns {BaseStorage}
       */
      get() {
        return sStorage;
      },
    });
  },
};

// Window 全域註冊
_global.BIStorage = TrainStorage;

export default TrainStorage;
