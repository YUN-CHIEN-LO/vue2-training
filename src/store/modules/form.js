// 引入lodash
const assignIn = require("lodash/assignIn");
const isPlainObject = require("lodash/isPlainObject");

// 狀態管理模組
import { Store } from "vuex";
import { SET_INFO, SET_COLOR } from "@/store/mutation-types";

// 瀏覽器儲存模組
import { lStorage, COLOR } from "@/plugins/webStorage";

export default {
  namespaced: true,
  state: {
    formInfo: {},
  },
  mutations: {
    [SET_INFO](state, info) {
      state.formInfo = assignIn(
        {},
        state.formInfo,
        isPlainObject(info) && info
      );
    },
    [SET_COLOR](state, color) {
      state.color = color;
      lStorage.set(COLOR, color);
    },
  },
  actions: {
    /**
     * 設定 資訊
     *
     * @param {Store} context - 狀態倉儲
     * @param {string} info - 資訊
     */
    setInfo({ commit }, info) {
      commit(SET_INFO, info);
      commit(SET_COLOR, info.Color);
    },

    /**
     * 設定 顏色
     *
     * @param {Store} context - 狀態倉儲
     * @param {string} color - 顏色
     */
    setColor({ commit }, color) {
      commit(SET_COLOR, color);
    },
  },
};
