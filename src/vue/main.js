import Vue from "vue";
import App from "./App.vue";

import store from "./store";

// Initialize the Vue instance.
new Vue({
  components: { App },
  store,
  el: "#app",
  template: `<app id="app" v-cloak />`
});
