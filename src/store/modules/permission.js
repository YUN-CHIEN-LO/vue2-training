// 狀態管理模組
import { Store } from "vuex";
import { SET_ROUTES } from "@/store/mutation-types";

// 路由模組
import router, { systemRoutes, constantRoutes, menuRoutes } from "@/router";

// 公用函式庫
import { filterRoutes } from "@/utils";

export default {
  namespaced: true,
  state: {
    // 全部可造訪路由 (公用 + 當前權限控管)
    routes: [],
    // 當前權限控管的路由
    systemRoutes: [],
    // 當前權限控管的選單
    accessMenus: [],
  },
  mutations: {
    // 變更 state 可造訪的路由
    [SET_ROUTES](state, routes) {
      state.routes = constantRoutes.concat(routes.ansynRoutes);
      state.systemRoutes = routes.ansynRoutes;
      state.accessMenus = routes.accessMenus;
    },
  },
  actions: {
    /**
     * 產生可造訪路由
     *
     * @param {Store} context - 狀態倉儲
     * @param {Array} accessPerms - 操作權限
     */
    async generateRoutes({ commit }, accessPerms) {
      // 篩選需權限控管的路由
      const ansynRoutes = filterRoutes(systemRoutes, accessPerms);
      const accessMenus = filterRoutes(menuRoutes, accessPerms);

      /**
       * 新增當前權限控管路由
       * Vue Router 自 v3.5.0 以上棄用 router.addRoutes API
       * 依據官方建議改由 router.addRoute 代替
       *
       * @see https://router.vuejs.org/zh/api/#router-addroutes
       */
      ansynRoutes.forEach((route) => {
        router.addRoute(route);
      });

      commit(SET_ROUTES, {
        // 當前權限控管的路由
        ansynRoutes: ansynRoutes,
        // 當前權限控管的選單
        accessMenus: accessMenus,
      });
    },
  },
};
