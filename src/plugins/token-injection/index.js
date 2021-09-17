import TokenInjection from "@nueip/cross-token-client";
import { assignIn} from "lodash";

const CrossTokenClient = {
  install(Vue, globalOptions = {}) {
    const property = "$token";
    let tokenInjection = new TokenInjection({
      SSO_URL: "/oauths2",
      COOKIE_DEFAULT_PREFIX: "lyc_",
    });

    // === Vue 全域使用方法 ===
    Vue["token"] = tokenInjection;

    // === Vue 區域使用方法 ===
    function tokenMethods(options = {}) {
      return {
        log() {
          console.log("=======");
        },
        /**
         * 登入頁面
         */
        loginIAM() {
          tokenInjection.loginIAM();
        },

        /**
         * 登出頁面
         */
        logoutIAM() {
          tokenInjection.logoutIAM();
        },

        /**
         * 同步
         *
         * @returns {Promise} Promise 方法
         */
        sync() {
          return tokenInjection.sync();
        },

        /**
         * 自動同步
         *
         * @param {number} interval - 多少個間隔，每個間為 500 毫秒
         */
        autoSync(interval) {
          console.log("auto sync")
          tokenInjection.autoSync(interval);
        },

        /**
         * 停止自動同步 Token 內容
         */
        autoSyncStop() {
          tokenInjection.autoSyncStop();
        },

        /**
         * 更新 token
         *
         * @returns {Promise} Promise 方法
         */
        refresh() {
          return tokenInjection.refresh();
        },

        /**
         * 自動更新 token
         * - 定期執行，向 oAuth Server 同步 Token 資訊
         *
         * @param {number} interval - 多少個間隔，每個間為 500 毫秒
         */
        autoRefresh(interval) {
          tokenInjection.autoRefresh(interval);
        },

        /**
         * 停止自動刷新 Token
         */
        autoRefreshStop() {
          tokenInjection.autoRefreshStop();
        },

        /**
         * 取得 Local Storage Token
         */
        getLocalStorageToken() {
          tokenInjection.getLocalStorageToken();
        },

        /**
         * 驗證
         *
         * @param {string} token - 本地端要被驗證的 Token
         * @returns {Promise} Promise 方法
         */
        validate(token) {
          return tokenInjection.validate(token);
        },
      };
    }

    function init() {
      console.log("init");
    }

    Vue.prototype[property] = assignIn(init, {
      globalOptions,
      ...tokenMethods(globalOptions),
    });
  },
};

export default CrossTokenClient;
