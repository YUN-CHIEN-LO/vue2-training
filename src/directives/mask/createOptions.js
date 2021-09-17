/**
 * 封裝 options
 *
 * @returns {Array} options
 */
export default function createOptions() {
  const elementOptions = new Map();
  const defaultOptions = { previousValue: "", mask: [] };

  /**
   * 取得 element
   *
   * @param {Element} el - element
   * @returns {Array} options
   */
  function get(el) {
    return elementOptions.get(el) || { ...defaultOptions };
  }

  /**
   * 部分更新
   *
   * @param {Element} el -element
   * @param {Array} newOptions - new options
   */
  function partiallyUpdate(el, newOptions) {
    elementOptions.set(el, { ...get(el), ...newOptions });
  }

  /**
   * 移除 element
   *
   * @param {Element} el -element
   */
  function remove(el) {
    elementOptions.delete(el);
  }

  return {
    partiallyUpdate,
    remove,
    get,
  };
}
