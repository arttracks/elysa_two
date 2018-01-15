import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
import mmo from "./modules/mmo";
import editor_ui from "./modules/editor_ui";
import provenance from "./modules/provenance";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  actions,
  modules: {
    mmo,
    editor_ui,
    provenance
  },
  strict: debug
});
