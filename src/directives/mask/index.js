/* eslint-disable no-param-reassign */
import conformToMask from "text-mask-core/src/conformToMask";
import {
  stringMaskToRegExpMask,
  arrayMaskToRegExpMask,
} from "./maskToRegExpMask";
import {
  trigger,
  queryInputElementInside,
  isFunction,
  isString,
  isRegexp,
} from "./utils";
import createOptions from "./createOptions";
import { defaultMaskReplacers } from "./constants";

const options = createOptions();

/**
 * Convenience wrapper for `trigger(el, 'input')`, which raises
 * an event for Vue to detect a value change.
 *
 * @param {HTMLInputElement} el - input element
 */
function triggerInputUpdate(el) {
  trigger(el, "input");
}

/**
 * Event handler
 *
 * @param {HTMLInputElement} el - input element
 * @param {boolean}          force - 是否強制
 */
function updateValue(el, force = false) {
  const { value } = el;
  const { previousValue, mask } = options.get(el);

  const isValueChanged = value !== previousValue;
  const isLengthIncreased = value.length > previousValue.length;
  const isUpdateNeeded = value && isValueChanged && isLengthIncreased;

  if ((force || isUpdateNeeded) && mask) {
    const { conformedValue } = conformToMask(value, mask, { guide: false });
    el.value = conformedValue;
    triggerInputUpdate(el);
  }

  options.partiallyUpdate(el, { previousValue: value });
}

/**
 * Fires on handler update
 *
 * @param {HTMLInputElement} el - input element
 * @param {string|Array.<string|RegExp>|Function|null} inputMask - mask
 * @param {*} maskReplacers - 正規對照表
 */
function updateMask(el, inputMask, maskReplacers) {
  let mask;

  if (Array.isArray(inputMask)) {
    mask = arrayMaskToRegExpMask(inputMask, maskReplacers);
  } else if (isFunction(inputMask)) {
    mask = inputMask;
  } else if (isString(inputMask) && inputMask.length > 0) {
    mask = stringMaskToRegExpMask(inputMask, maskReplacers);
  } else {
    mask = inputMask;
  }

  options.partiallyUpdate(el, { mask });
}

/**
 * Merge custom mask replacers with default mask replacers
 *
 * @param {object<string, RegExp>} maskReplacers - 正規對照表
 * @param {object<string, RegExp>} baseMaskReplacers - default正規對照表
 * @returns {object} The extended mask replacers
 */
function extendMaskReplacers(
  maskReplacers,
  baseMaskReplacers = defaultMaskReplacers
) {
  if (
    maskReplacers === null ||
    Array.isArray(maskReplacers) ||
    typeof maskReplacers !== "object"
  ) {
    return baseMaskReplacers;
  }

  return Object.keys(maskReplacers).reduce((extendedMaskReplacers, key) => {
    const value = maskReplacers[key];

    if (value !== null && !(value instanceof RegExp)) {
      return extendedMaskReplacers;
    }

    return { ...extendedMaskReplacers, [key]: value };
  }, baseMaskReplacers);
}

/**
 * Convert a mask into a string for comparison
 *
 * @param {string|Array.<string|RegExp>} mask - mask
 * @returns {string} masked string
 */
function maskToString(mask) {
  const maskArray = Array.isArray(mask) ? mask : [mask];
  const filteredMaskArray = maskArray.filter(
    (part) => isString(part) || isRegexp(part)
  );
  return filteredMaskArray.toString();
}

/**
 * Create the Vue directive
 *
 * @param {object}                  directiveOptions - options
 * @param {object.<string, RegExp>} directiveOptions.placeholders - options.placeholders
 * @returns {object} The Vue directive
 */
export function createDirective(directiveOptions = {}) {
  const instanceMaskReplacers = extendMaskReplacers(
    directiveOptions && directiveOptions.placeholders
  );

  /**
   * Vue directive definition
   */
  return {
    /**
     * Called only once, when the directive is first bound to the element.
     * This is where you can do one-time setup work.
     *
     * @param {(HTMLInputElement|HTMLElement)} el - element
     * @param {?string}                        value - value
     */
    bind(el, { value }) {
      el = queryInputElementInside(el);

      updateMask(el, value, instanceMaskReplacers);
      updateValue(el);
    },

    /**
     * Called after the containing component has updated,
     * but possibly before its children have updated.
     * The directive’s value may or may not have changed,
     * but you can skip unnecessary updates by comparing the
     * binding’s current and old values.
     *
     * @param {(HTMLInputElement|HTMLElement)} el - element
     * @param {object}                        params - params
     */
    componentUpdated(el, params) {
      const { value, oldValue } = params;
      el = queryInputElementInside(el);

      const isMaskChanged =
        isFunction(value) || maskToString(oldValue) !== maskToString(value);

      if (isMaskChanged) {
        updateMask(el, value, instanceMaskReplacers);
      }

      updateValue(el, isMaskChanged);
    },

    unbind(el) {
      el = queryInputElementInside(el);
      options.remove(el);
    },
  };
}

/**
 * Default directive definition
 */
export default createDirective();
