// 狀態管理模組
import { Store } from "vuex";
import { SET_SHOW_JSON } from "@/store/mutation-types";

// 瀏覽器儲存模組
import { sStorage, IS_SHOW_JSON } from "@/plugins/webStorage";

export default {
  namespaced: true,
  state: {
    showJson:
      sStorage.get(IS_SHOW_JSON) !== null ? sStorage.get(IS_SHOW_JSON) : true,
    profileBarOpened: false,
  },
  mutations: {
    [SET_SHOW_JSON](state, isShow) {
      state.showJson = isShow;
      sStorage.set(IS_SHOW_JSON, isShow);
    },
  },
  actions: {
    /**
     * 切換 是否顯示Vuex JSON 格式
     *
     * @param {Store} context - 狀態倉儲
     */
    setShowJson({ commit, state }) {
      commit(SET_SHOW_JSON, !state.showJson);
    },
  },
};
