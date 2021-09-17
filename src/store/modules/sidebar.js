// 狀態管理模組
import { Store } from "vuex";
import { SET_SIDEBAR } from "@/store/mutation-types";

// 瀏覽器儲存模組
import { sStorage, SIDEBAR_OPENED } from "@/plugins/webStorage";

export default {
  namespaced: true,
  state: {
    sidebarOpened:
      sStorage.get(SIDEBAR_OPENED) !== null
        ? sStorage.get(SIDEBAR_OPENED)
        : true,
    profileBarOpened: false,
  },
  mutations: {
    [SET_SIDEBAR](state, isOpened) {
      state.sidebarOpened = isOpened;
      sStorage.set(SIDEBAR_OPENED, isOpened);
    },
  },
  actions: {
    /**
     * 切換 側邊欄狀態
     *
     * @param {Store} context - 狀態倉儲
     */
    toggleSideBar({ commit, state }) {
      commit(SET_SIDEBAR, !state.sidebarOpened);
    },
    /**
     * 設定 側邊欄狀態
     *
     * @param {Store} context - 狀態倉儲
     * @param {boolean} isOpened - 開關狀態
     */
    setSideBar({ commit }, isOpened) {
      commit(SET_SIDEBAR, isOpened);
    },
  },
};
