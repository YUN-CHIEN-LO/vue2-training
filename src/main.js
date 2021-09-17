import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import TrainStorage from "@/plugins/webStorage";
import LYCSnackbar from "@/plugins/widgets/toastSnackbar";
import LYCDialog from "@/plugins/widgets/lycDialog";
import { mockXHR } from "../mock";
import vuetify from "./plugins/vuetify";

import directives from "@/directives/";

import VueRx from "vue-rx";

Vue.use(VueRx);

Vue.use(TrainStorage);
Vue.use(LYCSnackbar);
Vue.use(LYCDialog);

Vue.use(directives);

// API 模擬資料
mockXHR();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
