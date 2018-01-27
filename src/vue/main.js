import Vue from "vue";
import App from "./App.vue";

import store from "./store";

// Initialize the Vue instance.
export default new Vue({
  el: "#app",
  components: { App },
  store,
  template: `<app id="app" v-cloak />`
});
