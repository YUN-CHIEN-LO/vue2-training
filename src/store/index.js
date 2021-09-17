import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import { getFileList } from "@/utils";

Vue.use(Vuex);

// webpack API: require.context()
// 將指定資料夾中的js檔自動導入模組
const modules = getFileList(require.context("./modules", true, /\.js$/));

export default new Vuex.Store({
  modules,
  getters,
});
