import Vue from "vue";
import App from "./App.vue";


// Initialize the Vue instance.
new Vue({
  components: { App },
  data: { entity: window.data },
  el: "#app",
  template: `<app id="app" :entity="entity" v-cloak />`
});
