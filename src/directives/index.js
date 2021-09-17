import permission from "./permission";
import formatter from "./formatter";
import buildDirective from "./hotkey";
import clickOutside from "./click-outside";
import mask from "./mask";
const install = function (Vue, alias = {}) {
  Vue.directive("permission", permission);
  Vue.directive("format", formatter);
  Vue.directive("hotkey", buildDirective(alias));
  Vue.directive("click-outside", clickOutside);
  Vue.directive("mask", mask);
};

export default install;
