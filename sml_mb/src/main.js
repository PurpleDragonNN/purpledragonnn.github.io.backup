import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import 'lib-flexible'
Vue.config.productionTip = false;
import QuickworkMobile from '@do1/quickwork-mobile';
import "@do1/quickwork-mobile/lib/theme/index.css";

Vue.use(QuickworkMobile);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
