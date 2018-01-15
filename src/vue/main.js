import Vue from "vue";
import App from "./App.vue";
import Vuex from 'vuex'

import store from './store'

// Initialize the Vue instance.
new Vue({
  components: { App },
  store,
  data: { entity: window.data },
  el: "#app",
  template: `<app id="app" v-cloak />`
});
