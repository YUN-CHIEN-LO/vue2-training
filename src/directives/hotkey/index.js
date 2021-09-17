import { getKeyMap } from "./keycodes";
import { assignKeyHandler } from "./helpers";

/**
 * 綁定事件
 *
 * @param {Element} el - element
 * @param {object} bindings - 綁定值
 * @param {object} alias -alias
 */
function bindEvent(el, bindings, alias) {
  // bindings.value 為一個 物件，key為鍵盤指令，value為回呼函式
  el._keyMap = getKeyMap(bindings.value, alias);
  el._keyHandler = (e) => assignKeyHandler(e, el._keyMap, bindings.modifiers);

  document.addEventListener("keydown", el._keyHandler);
  document.addEventListener("keyup", el._keyHandler);
}

/**
 * 移除事件綁定
 *
 * @param {Element} el - element
 */
function unbindEvent(el) {
  document.removeEventListener("keydown", el._keyHandler);
  document.removeEventListener("keyup", el._keyHandler);
}

/**
 * 建立出口
 *
 * @param {object} alias - alias
 * @returns {Function} 出口函式
 */
const buildDirective = function (alias = {}) {
  return {
    bind(el, binding) {
      bindEvent(el, binding, alias);
    },
    inserted(el, binding) {
      if (binding.value !== binding.oldValue) {
        unbindEvent(el);
        bindEvent(el, binding, alias);
      }
    },
    unbind: unbindEvent,
  };
};

export default buildDirective;
