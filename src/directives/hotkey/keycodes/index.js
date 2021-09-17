import codes from "./codes";
import { splitCombination, returnCharCode } from "../helpers";

const noop = () => {};

const defaultModifiers = {
  ctrlKey: false,
  altKey: false,
  shiftKey: false,
  metaKey: false,
};

const alternativeKeyNames = {
  option: "alt",
  command: "meta",
  return: "enter",
  escape: "esc",
  plus: "+",
  mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl",
};

/**
 * 取得 key map，包括：
 *  - key code
 *  - 修飾 key
 *  - 回呼函式
 *
 * @param {object} combinations - 鍵盤指令與其對應的回呼函示
 * @param {object} alias - alias
 * @returns {object}
 */
export const getKeyMap = (combinations, alias) => {
  const result = [];

  Object.keys(combinations).forEach((combination) => {
    // 取得 keyup 和 keydown 的回呼函示
    const { keyup, keydown } = combinations[combination];
    const callback = {
      // 如果沒有指定 keyup/keydown，預設將回呼函式掛在 keydown 的動作上
      keydown: keydown || (keyup ? noop : combinations[combination]),
      keyup: keyup || noop,
    };

    // 分離後的鍵盤指令，為一字串陣列
    const keys = splitCombination(combination);
    // 從 keys 中，進一步分離 key code 和 修飾 key
    const { code, modifiers } = resolveCodesAndModifiers(keys, alias);

    result.push({
      code,
      modifiers,
      callback,
    });
  });

  return result;
};

/**
 * 分解 key code 和 修飾 key
 *
 * @param {Array} keys - 鍵盤符號
 * @param {object} alias - alias
 * @returns {object} 分解後的 key code 和 修飾 key
 */
const resolveCodesAndModifiers = (keys, alias) => {
  let modifiers = { ...defaultModifiers };
  if (keys.length > 1) {
    return keys.reduce(
      (acc, key) => {
        key = alternativeKeyNames[key] || key;
        if (
          Object.prototype.hasOwnProperty.call(defaultModifiers, `${key}Key`)
        ) {
          acc.modifiers = { ...acc.modifiers, [`${key}Key`]: true };
        } else {
          acc.code = alias[key] || searchKeyCode(key);
        }
        return acc;
      },
      { modifiers }
    );
  }

  const key = alternativeKeyNames[keys[0]] || keys[0];
  if (Object.prototype.hasOwnProperty.call(defaultModifiers, `${key}Key`)) {
    modifiers = { ...modifiers, [`${key}Key`]: true };
  }
  const code = alias[key] || searchKeyCode(key);

  return {
    modifiers,
    code,
  };
};

/**
 * 尋找對應 key code
 *
 * @param {string} key - 鍵盤符號
 * @returns {number} key code
 */
const searchKeyCode = (key) => codes[key.toLowerCase()] || returnCharCode(key);
