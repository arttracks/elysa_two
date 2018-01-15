import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import tombstone from './modules/tombstone'
import editor_ui from './modules/editor_ui'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  modules: {
    tombstone,
    editor_ui
  },
  strict: debug,
})