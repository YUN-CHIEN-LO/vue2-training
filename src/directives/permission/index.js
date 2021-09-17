// 常用函式庫
import { includes, find, isArray } from "lodash";
// vuex
import store from "@/store";
// 權限權重
import { permList } from "./priority";

/**
 * 擴充權限陣列
 *
 * @param {Array} array - 原始權限陣列
 * @param {string} perm - 欲擴充的權限
 * @returns {Array} - 擴充後的權限陣列
 */
function pushPerm(array, perm) {
  if (!includes(array, perm)) {
    array.push(perm);
  }
  return array;
}

/**
 * 繼承擴充權限
 *
 * @param {Array} perms - 原始權限陣列
 * @returns {Array} - 擴充後的權限陣列
 */
function setInherit(perms) {
  let newPerms = [];
  perms.forEach((e) => {
    if (!includes(newPerms, e)) {
      newPerms.push(e);

      // 尋找權重
      const priority = find(permList, (x) => {
        return x.perm === e;
      }).priority;

      // 依照權重大小，擴充權限
      permList.forEach((x) => {
        if (x.priority > priority) {
          newPerms = pushPerm(newPerms, x.perm);
        }
      });
    }
  });
  return newPerms;
}

/**
 * 判斷是否用有權限
 *
 * @param {Array} value - 標籤值
 * @param {object} modifiers - 標籤修飾符
 * @returns {boolean} 是否擁有權限
 */
function isUserGranted(value, modifiers) {
  const role = store.getters.formInfo.Role;
  const inherit = modifiers.inherit;
  let perms = value;

  // 若含有 "inherit" 修飾符，則執行擴充權限
  if (inherit) {
    perms = setInherit(perms);
  }

  return includes(perms, role);
}

/**
 * 依照權限決定是否移除DOM
 *
 * @param {Element} el - element
 * @param {object} binding - 綁定值
 */
const permission = (el, binding) => {
  const { value, modifiers } = binding;

  if (isArray(value) && value?.length) {
    if (!isUserGranted(value, modifiers)) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  } else {
    throw new Error(`[INVALID ACCESS] !!!`);
  }
};

export default {
  // 綁定元素插入父節點時使用
  inserted(el, binding) {
    permission(el, binding);
  },
  // 綁定元素在模版更新時使用
  update(el, binding) {
    permission(el, binding);
  },
};
