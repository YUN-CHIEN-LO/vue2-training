import Vue from "vue";
import VueRouter from "vue-router";

// 狀態管理模組
import store from "@/store";
// 常用函示庫
import { includes } from "lodash";

// 基礎路由
import { constantRoutes } from "@/router";

import api from "@/api/index";

Vue.use(VueRouter);

/**
 * === [Patch] Vue Router Methods push/replace 升級問題 ===
 * Vue router v3.1.0 以上新增非同步(promise)捕獲異常(catch)機制
 * 雖不影響功能，但為解決 console.error 顯示的不美觀
 * 增加全域捕獲異常方法，以解決每次調用需加寫捕獲異常方法
 */
const orgPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return orgPush.call(this, location, onResolve, onReject);
  try {
    return orgPush.call(this, location).catch((error) => error);
  } catch (error) {
    console.log(error);
  }
};

const orgReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject)
    return orgReplace.call(this, location, onResolve, onReject);
  try {
    return orgReplace.call(this, location).catch((error) => error);
  } catch (error) {
    console.log(error);
  }
};

/**
 * 建立路由
 *
 * @returns {VueRouter}
 */
const createRouter = () =>
  new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes: constantRoutes,
    /**
     * 視窗捲動行為 - 回傳錨點，點擊上/下一頁按鈕，模擬瀏覽器的原生表現
     *
     * @see https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html
     * @inheritdoc
     */
    scrollBehavior(to, from, savedPosition) {
      return savedPosition ? savedPosition : { x: 0, y: 0 };
    },
  });

// 初始化 router
const router = createRouter();

// 建立不導轉白名單
const whiteList = ["/redirect", "/error"];

// 導轉機制
router.beforeEach(async (to, from, next) => {
  // 路由網址符合英文字母
  const toPath = to.fullPath.match(/\/\w*/).toString();
  // 包含白名單
  const inWhiteList = includes(whiteList, toPath);
  // 取得 token
  const hasToken = Boolean(store.getters.userToken);

  // 設定 Title 標籤
  if (to.meta.title) {
    const pageTitle = to.matched.map((o) => o.meta.title).join(" / ");
    document.title = `Chien Training - ${pageTitle}`;
  }

  // 檢查是否有 token，有即放行沒有就導轉至燈入頁
  if (hasToken || inWhiteList) {
    const hasAccess = store.getters.formInfo.Role?.length;
    if (hasAccess) {
      next();
    } else {
      // 網頁刷新時向後端請求流程
      try {
        // 取得使用者資訊
        await api.account
          .getInfo()
          .then((res) => {
            store.dispatch("form/setInfo", res.data);
          })
          .catch((error) => {
            console.log(error);
          });

        // 產生可造訪路由
        await store.dispatch(
          "permission/generateRoutes",
          store.getters.formInfo.Role
        );

        // 確保可造訪路由的資料完整，路由不留下歷史紀錄
        next({ ...to, replace: true });
      } catch (error) {
        // 重設 token
        await store.dispatch("user/resetToken");
      }
    }
  } else {
    location.replace(process.env.VUE_APP_OAUTH_URL);
    // router.push('redirect/cross');
  }
});

/**
 * 重置 router
 *
 * @see https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
 */
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;

export * from "@/router/access";
export * from "@/router/constant";
