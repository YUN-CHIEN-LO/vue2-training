import { defaultMaskReplacers, NEXT_CHAR_OPTIONAL } from "./constants";
import { castToRegexp, makeRegexpOptional } from "./utils/regexp";

/**
 * 將 mask 轉換成 正規式
 *
 * @param {Array} mask - mask
 * @param {object<string, RegExp|NEXT_CHAR_OPTIONAL>} maskReplacers - 正規對照表
 * @returns {RegExp[]} - 正規式
 */
function maskToRegExpMask(mask, maskReplacers = defaultMaskReplacers) {
  return mask
    .map((char, index, array) => {
      const maskChar = maskReplacers[char] || char;
      const previousChar = array[index - 1];
      const previousMaskChar = maskReplacers[previousChar] || previousChar;
      if (maskChar === NEXT_CHAR_OPTIONAL) {
        return null;
      }
      if (previousMaskChar === NEXT_CHAR_OPTIONAL) {
        return makeRegexpOptional(castToRegexp(maskChar));
      }
      return maskChar;
    })
    .filter(Boolean);
}

/**
 * Converts mask from `v-mask` string format to `text-mask-core` format
 *
 * @param {string} stringMask - mask
 * @param {object<string, RegExp|NEXT_CHAR_OPTIONAL>} maskReplacers - 正規對照表
 * @returns {RegExp[]} - 正規式
 */
export function stringMaskToRegExpMask(
  stringMask,
  maskReplacers = defaultMaskReplacers
) {
  return maskToRegExpMask(stringMask.split(""), maskReplacers);
}

/**
 * Converts mask from `v-mask` array format to `text-mask-core` format
 *
 * @param {Array.<string|RegExp>} arrayMask - mask
 * @param {object<string, RegExp|NEXT_CHAR_OPTIONAL>} maskReplacers - 正規對照表
 * @returns {RegExp[]} - 正規式
 */
export function arrayMaskToRegExpMask(
  arrayMask,
  maskReplacers = defaultMaskReplacers
) {
  const flattenedMask = arrayMask
    .map((part) => {
      if (part instanceof RegExp) {
        return part;
      }
      if (typeof part === "string") {
        return part.split("");
      }
      return null;
    })
    .filter(Boolean)
    .reduce((mask, part) => mask.concat(part), []);

  return maskToRegExpMask(flattenedMask, maskReplacers);
}
