// 狀態管理模組
import { Store } from "vuex";
import { resetRouter } from "@/router";
import { SET_TOKEN, SET_USERINFO } from "@/store/mutation-types";

// 瀏覽器儲存模組
import { lStorage, JWT_TOKEN } from "@/plugins/webStorage";

// 常用函式庫
import { assignIn } from "lodash";

// 使用者 API
import apiUser from "@/api/modules/account";

export default {
  namespaced: true,
  state: {
    token: lStorage.get(JWT_TOKEN),
    userInfo: {
      id: "",
      access: [],
    },
  },
  mutations: {
    // 變更 state 身分令牌
    [SET_TOKEN](state, token) {
      state.token = token;
      // 設置 localStroage Token
      lStorage.set(JWT_TOKEN, token);
    },
    // 變更 state 使用者資訊
    [SET_USERINFO](state, info) {
      state.userInfo = assignIn({}, state.userInfo, info);
    },
  },
  actions: {
    /**
     * 登入驗證 取得身分令牌
     *
     * @param {Store} context - 狀態倉儲
     * @param {object} options - 參數
     * @returns {Promise}
     */
    login({ commit, state, rootState }, options) {
      return apiUser.getToken(options.code, options.state).then((res) => {
        const data = res.data || {};
        commit(SET_TOKEN, data.token || "");
      });
    },

    /**
     * 登出
     *
     * @param {Store} context - 狀態倉儲
     */
    async logout({ dispatch }) {
      // 重設身分令牌
      await dispatch("resetToken");
      // 重置 router
      resetRouter();
      // 開啟 SSO 登出頁面
      window.open("https://hrm-bi.wan.nueip.dev/logout", "_blank");
      location.replace("/");
    },

    /**
     * 重設身分令牌
     *
     * @param {Store} context - 狀態倉儲
     */
    async resetToken({ commit }) {
      // 清除登入資訊
      commit(SET_TOKEN, "");
    },

    /**
     * 取得使用者資訊
     *
     * @param {Store} context - 狀態倉儲
     * @param {string} id - 使用者序號
     * @returns {Promise}
     */
    getInfo({ commit }, id) {
      return apiUser.get(id).then((res) => {
        const data = res.data || {};
        commit(SET_USERINFO, data);
      });
    },
  },
};
