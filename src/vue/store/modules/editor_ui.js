import * as types from "../mutation-types.js";

const state = {
  helpShown: false,
  activePeriod: 0
};

// getters
const getters = {
  // allProducts: state => state.all
};

// actions
const actions = {
  // getAllProducts ({ commit }) {
  //   shop.getProducts(products => {
  //     commit(types.RECEIVE_PRODUCTS, { products })
  //   })
  // }
};

// mutations
export const mutations = {
  [types.TOGGLE_HELP](state) {
    state.helpShown = !state.helpShown;
  },
  [types.SET_ACTIVE_PERIOD](state, selectedIndex) {
    state.activePeriod = selectedIndex;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
