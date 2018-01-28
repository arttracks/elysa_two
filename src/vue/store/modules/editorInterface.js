import * as types from "../mutation-types.js";

const state = {
  helpShown: false,
  activePeriod: 0,
  lastRefreshed: null
};

// getters
const getters = {};

// actions
const actions = {};

// mutations
export const mutations = {
  [types.TOGGLE_HELP](state) {
    state.helpShown = !state.helpShown;
  },
  [types.SET_ACTIVE_PERIOD](state, selectedIndex) {
    state.activePeriod = selectedIndex;
  },
  [types.UPDATE_REFRESHED_TIME](state) {
    /* istanbul ignore next */
    state.lastRefreshed = Date.now();
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
