/**
 * Notifies Vue about internal value change
 *
 * @see https://github.com/vuejs/Discussion/issues/157#issuecomment-273301588
 * @param {HTMLInputElement} el - input Element
 * @param {string}           type - 事件名稱
 */
export const trigger = (el, type) => {
  const e = document.createEvent("HTMLEvents");
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
};

/**
 * Extracts first input element inside given html element (if any)
 *
 * @param {HTMLElement} el - element
 * @returns {HTMLElement|HTMLInputElement} - input element
 */
export const queryInputElementInside = (el) =>
  el instanceof HTMLInputElement ? el : el.querySelector("input") || el;

/**
 * Determines whether the passed value is a function
 *
 * @param {*} val - 判斷對象
 * @returns {boolean} - 是否為 Function
 */
export const isFunction = (val) => typeof val === "function";

/**
 * Determines whether the passed value is a string
 *
 * @param {*} val - 判斷對象
 * @returns {boolean} - 是否為 String
 */
export const isString = (val) => typeof val === "string";

/**
 * Determines whether the passed value is a string
 *
 * @param {*} val - 判斷對象
 * @returns {boolean} - 是否為正規式
 */
export const isRegexp = (val) => val instanceof RegExp;
