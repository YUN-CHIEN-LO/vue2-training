const FORBIDDEN_NODES = ["INPUT", "TEXTAREA", "SELECT"];
import { isEqual } from "lodash";

/**
 * 分解鍵盤指令字串
 *
 * @param {string} combination - 鍵盤指令字串
 * @returns {Array} 分離的鍵盤指令字串陣列
 */
export const splitCombination = (combination) => {
  combination = combination.replace(/\s/g, "");
  combination = combination.includes("numpad+")
    ? combination.replace("numpad+", "numpadadd")
    : combination;
  combination = combination.includes("++")
    ? combination.replace("++", "+=")
    : combination;
  return combination.split(/\+{1}/);
};

/**
 * 尋找對應的 字母 keycode
 *
 * @param {string} key - 鍵盤符號
 * @returns {string|undefined} - keycode
 */
export const returnCharCode = (key) =>
  key.length === 1 ? key.charCodeAt(0) : undefined;

/**
 * 若此key物件存在，回傳回呼函示
 *
 * @param {Array} keyMap - 鍵盤物件的陣列
 * @param {number} keyCode - key code
 * @param {object} eventKeyModifiers - 修飾 key
 * @returns {Function|boolean}
 */
const getHotkeyCallback = (keyMap, keyCode, eventKeyModifiers) => {
  const key = keyMap.find(
    ({ code, modifiers }) =>
      code === keyCode && isEqual(eventKeyModifiers, modifiers)
  );
  if (!key) return false;
  return key.callback;
};

/**
 * key handker
 *
 * @param {Event} e - 事件
 * @param {Array} keyMap - 鍵盤物件的陣列
 * @param {object} modifiers Vue event modifiers
 * @returns {Event | null}
 */
export const assignKeyHandler = (e, keyMap, modifiers) => {
  const { keyCode, ctrlKey, altKey, shiftKey, metaKey } = e;
  const eventKeyModifiers = { ctrlKey, altKey, shiftKey, metaKey };

  if (modifiers.prevent) {
    e.preventDefault();
  }

  if (modifiers.stop) {
    e.stopPropagation();
  }

  const { nodeName, isContentEditable } = document.activeElement;
  if (isContentEditable) return;
  if (FORBIDDEN_NODES.includes(nodeName)) return;

  const callback = getHotkeyCallback(keyMap, keyCode, eventKeyModifiers);
  if (!callback) return e;
  e.preventDefault();
  callback[e.type](e);
};
