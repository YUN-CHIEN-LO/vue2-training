/**
 * A special object to identify next character as optional
 * For example `?`
 *
 * @type {object}
 */
export const NEXT_CHAR_OPTIONAL = {
  __nextCharOptional__: true,
};

/**
 * @type {object<string,RegExp|NEXT_CHAR_OPTIONAL>}
 */
export const defaultMaskReplacers = {
  "#": /\d/,
  "*": /\d*/i,
  A: /[a-z]/i,
  N: /[a-z0-9]/i,
  "?": NEXT_CHAR_OPTIONAL,
  X: /./,
};
