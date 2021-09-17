import { isString, has } from "lodash";
import * as keymap from "@/plugins/webStorage/keymap";

// 錯誤訊息
const errorMsg = {
  typeVerify: (type) => `[Type Error]: Must be a '${type}'.`,
  keyRegister: (key) =>
    `[Key Error]: Register '${key}' at @/plugins/webStorage/keymap.js`,
};

/**
 * 檢查 storage key 是否註冊
 *
 * @see keymap
 * @param {string} key - storage key
 * @returns {boolean}
 */
const keyExisted = (key) => {
  return !(!has(keymap, key) && console.error(errorMsg.keyRegister(key)));
};

/**
 * 檢查 輸入值是否為字串格式
 *
 * @param {*} string - 字串
 * @returns {boolean}
 */
const stringTypeVerify = (string) => {
  return !(!isString(string) && console.error(errorMsg.typeVerify("string")));
};

/**
 * Storage Bridge
 */
export class BaseStorage {
  /**
   * 建構子
   *
   * @param {object} storage - 儲存載體
   */
  constructor(storage) {
    this.storage = storage;
  }

  /**
   * 設置 key|value
   *
   * @param {string} key - storage key
   * @param {*} value - 傳入值 (string or object)
   */
  set(key, value) {
    if (stringTypeVerify(key) && keyExisted(key)) {
      this.storage.setItem(key, JSON.stringify(value));
    }
  }

  /**
   * 取得指定 key 的值
   *
   * @param {string} key - storage key
   * @returns {*}
   */
  get(key) {
    if (stringTypeVerify(key) && keyExisted(key)) {
      return JSON.parse(this.storage.getItem(key));
    } else {
      return null;
    }
  }

  /**
   * 移除單一 key
   *
   * @param {string} key - storage key
   * @returns {*}
   */
  remove(key) {
    if (!stringTypeVerify(key)) {
      return;
    }

    return this.storage.removeItem(key);
  }

  /**
   * 清除所有 key
   */
  clear() {
    this.storage && this.storage.clear();
  }
}
