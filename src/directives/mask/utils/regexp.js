/**
 * @example
 * '/abc/g' -> /abc/g
 * @param {string} str - stringified regexp
 * @returns {RegExp} - real regexp
 */
const stringToRegexp = (str) => {
  const lastSlash = str.lastIndexOf("/");
  return new RegExp(str.slice(1, lastSlash), str.slice(lastSlash + 1));
};

/**
 * Makes single-char regular express optional
 *
 * @example
 * /\d/ -> /\d?/
 * @param {RegExp} charRegexp - 正規字元
 * @returns {RegExp} - 正規式
 */
export const makeRegexpOptional = (charRegexp) =>
  stringToRegexp(
    charRegexp
      .toString()
      .replace(/.(\/)[gmiyus]{0,6}$/, (match) => match.replace("/", "?/"))
  );

/**
 * @param {string} char - mask 字元
 * @returns {string} - 前綴字元
 */
const escapeIfNeeded = (char) =>
  "[\\^$.|?*+()".indexOf(char) > -1 ? `\\${char}` : char;

/**
 * Wraps static character to RegExp
 *
 * @param {string} char - mmask 字元
 * @returns {RegExp} - 正規式
 */
const charRegexp = (char) => new RegExp(`/[${escapeIfNeeded(char)}]/`);

/**
 * Determines if value is regular expression
 *
 * @param {string|RegExp} entity - 判斷對象
 * @returns {boolean} - 是否為正規式
 */
const isRegexp = (entity) => entity instanceof RegExp;

/**
 * @param {string|RegExp} char - 原始 mask 字元
 * @returns {RegExp} - 正規式
 */
export const castToRegexp = (char) =>
  isRegexp(char) ? char : charRegexp(char);
