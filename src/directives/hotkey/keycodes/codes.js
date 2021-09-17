import aliases from "./aliases";
import functionKeys from "./functionkeys";
import lowercase from "./lowercase";
import numpad from "./numpad";

export default {
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  ctrl: 17,
  alt: 18,
  "pause/break": 19,
  capslock: 20,
  esc: 27,
  space: 32,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  insert: 45,
  delete: 46,
  command: 91,
  meta: 91,
  leftcommand: 91,
  rightcommand: 93,
  scrolllock: 145,
  mycomputer: 182,
  mycalculator: 183,
  ";": 186,
  "=": 187,
  ",": 188,
  "-": 189,
  ".": 190,
  "/": 191,
  "`": 192,
  "[": 219,
  "\\": 220,
  "]": 221,
  "'": 222,
  ":": 186,
  "+": 187,
  "<": 188,
  _: 189,
  ">": 190,
  "?": 191,
  "~": 192,
  "{": 219,
  "|": 220,
  "}": 221,
  '"': 222,
  ...lowercase,
  ...numpad,
  ...functionKeys,
  ...aliases,
};