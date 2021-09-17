const HANDLERS_PROPERTY = "__v-click-outside";
const HAS_WINDOWS = typeof window !== "undefined";
const HAS_NAVIGATOR = typeof navigator !== "undefined";
const IS_TOUCH =
  HAS_WINDOWS &&
  ("ontouchstart" in window ||
    (HAS_NAVIGATOR && navigator.msMaxTouchPoints > 0));
const EVENTS = IS_TOUCH ? ["touchstart"] : ["click"];

/**
 * 處理 ele 物件
 *
 * @param {object} bindingValue - 綁定值
 * @returns {object} ele 物件
 */
function processDirectiveArguments(bindingValue) {
  const isFunction = typeof bindingValue === "function";
  if (!isFunction && typeof bindingValue !== "object") {
    throw new Error(
      "v-click-outside: Binding value must be a function or an object"
    );
  }

  return {
    handler: isFunction ? bindingValue : bindingValue.handler,
    middleware: bindingValue.middleware || ((item) => item),
    events: bindingValue.events || EVENTS,
    isActive: bindingValue.isActive !== false,
    detectIframe: bindingValue.detectIframe !== false,
    capture: !!bindingValue.capture,
  };
}

/**
 * 觸發 handler
 *
 * @param {object} ele - { event, handler, middleware }
 */
function execHandler(ele) {
  const { event, handler, middleware } = ele;
  if (middleware(event)) {
    handler(event);
  }
}

/**
 * 處理 Iframe
 *
 * @param {*} ele - { el, event, handler, middleware }
 */
function onFauxIframeClick(ele) {
  const { el, event, handler, middleware } = ele;
  setTimeout(() => {
    const { activeElement } = document;
    if (
      activeElement &&
      activeElement.tagName === "IFRAME" &&
      !el.contains(activeElement)
    ) {
      execHandler({ event, handler, middleware });
    }
  }, 0);
}

/**
 * 監聽事件
 *
 * @param {object} ele - { el, event, handler, middleware }
 */
function onEvent(ele) {
  const { el, event, handler, middleware } = ele;
  const path = event.path || (event.composedPath && event.composedPath());
  const isClickOutside = path
    ? path.indexOf(el) < 0
    : !el.contains(event.target);

  if (!isClickOutside) {
    return;
  }

  execHandler({ event, handler, middleware });
}

/**
 * 綁定監聽事件
 *
 * @param {Element} el element
 * @param {object} v value
 */
function bind(el, v) {
  const { events, handler, middleware, isActive, detectIframe, capture } =
    processDirectiveArguments(v.value);
  if (!isActive) {
    return;
  }

  el[HANDLERS_PROPERTY] = events.map((eventName) => ({
    event: eventName,
    srcTarget: document.documentElement,
    handler: (event) => onEvent({ el, event, handler, middleware }),
    capture,
  }));

  if (detectIframe) {
    const detectIframeEvent = {
      event: "blur",
      srcTarget: window,
      handler: (event) => onFauxIframeClick({ el, event, handler, middleware }),
      capture,
    };

    el[HANDLERS_PROPERTY] = [...el[HANDLERS_PROPERTY], detectIframeEvent];
  }

  el[HANDLERS_PROPERTY].forEach(({ event, srcTarget, handler }) =>
    setTimeout(() => {
      // Note: More info about this implementation can be found here:
      //       https://github.com/ndelvalle/v-click-outside/issues/137
      if (!el[HANDLERS_PROPERTY]) {
        return;
      }
      srcTarget.addEventListener(event, handler, capture);
    }, 0)
  );
}

/**
 * 移除事件
 *
 * @param {Element} el element
 */
function unbind(el) {
  const handlers = el[HANDLERS_PROPERTY] || [];
  handlers.forEach(({ event, srcTarget, handler, capture }) =>
    srcTarget.removeEventListener(event, handler, capture)
  );
  delete el[HANDLERS_PROPERTY];
}

/**
 * 更新
 *
 * @param {Element} el element
 * @param {object} updates updates
 */
function update(el, updates) {
  const { value, oldValue } = updates;
  if (JSON.stringify(value) === JSON.stringify(oldValue)) {
    return;
  }
  unbind(el);
  bind(el, { value });
}

/**
 * 建立出口
 */
const buildDirective = {
  bind,
  update,
  unbind,
};

export default HAS_WINDOWS ? buildDirective : {};
