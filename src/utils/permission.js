/**
 * 權限函式庫
 */

// 常用函式庫
import { includes } from "lodash";

/**
 * 路由是否有造訪權限
 *
 * @param {Array} accessPerms - 操作權限
 * @param {object} route - 單一路由
 * @returns {boolean}
 */
function _hasRoutePerm(accessPerms, route) {
  // admin 可以進入任一路由
  if (accessPerms === "admin") return true;
  // 路由是否有配置操作權限
  return route.meta?.access ? includes(route.meta.access, accessPerms) : true;
}

/**
 * 篩選可造訪路由
 *
 * @param {Array} routes - 巢狀路由
 * @param {Array} accessPerms - 操作權限
 * @returns {Array}
 */
export function filterRoutes(routes, accessPerms) {
  const routesResult = [];

  routes.forEach((route) => {
    const routesSpread = { ...route };

    // 路由是否有配置操作權限
    if (_hasRoutePerm(accessPerms, routesSpread)) {
      // 子路由遞迴篩選
      routesSpread.children = routesSpread.children
        ? filterRoutes(routesSpread.children, accessPerms)
        : [];

      routesResult.push(routesSpread);
    }
  });

  return routesResult;
}
