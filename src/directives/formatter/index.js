/**
 * 價格格式化
 *
 * @returns {Function} handler 回呼
 */
function priceFormatter() {
  return function (e) {
    let formatValue = e.target.value
      .replace(/\D/g, "")
      .replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,");
    e.target.value = formatValue ? `$${formatValue}` : "";
  };
}

/**
 * 手機號碼格式化
 *
 * @returns {Function} handler 回呼
 */
function cellFormatter() {
  return function (e) {
    let formatValue = e.target.value.replace(/\D/g, "");
    if (formatValue.length >= 10) formatValue = formatValue.substring(0, 10);
    formatValue = formatValue.replace(/^(\d{4})(\d{3})(\d{3})$/, "($1)$2-$3");
    e.target.value = formatValue;
  };
}

/**
 * 格式化自定義標籤
 *
 * @param {Element} el - element
 * @param {object} binding - 綁定值
 * @param {vnode} vnode - 虛擬DOM
 */
function formatter(el, binding, vnode) {
  const { arg } = binding;

  let handler = () => {};
  switch (arg) {
    case "price":
      handler = priceFormatter();
      break;
    case "cell":
      handler = cellFormatter();
      break;
    default:
      break;
  }
  el.addEventListener("input", handler);
}

/**
 * 建立出口
 */
const buildDirective = {
  inserted(el, binding, vnode) {
    formatter(el, binding, vnode);
  },
  update(el, binding, vnode) {
    // formatter(el, binding, vnode);
  },
};

export default buildDirective;
