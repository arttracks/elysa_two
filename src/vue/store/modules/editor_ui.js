import * as types from '../mutation-types.js'


const state = {
  helpShown: true
}


// getters
const getters = {
  // allProducts: state => state.all
}

// actions
const actions = {
  // getAllProducts ({ commit }) {
  //   shop.getProducts(products => {
  //     commit(types.RECEIVE_PRODUCTS, { products })
  //   })
  // }
}

// mutations
export const mutations = {
  [types.TOGGLE_HELP] (state) {
    state.helpShown = !state.helpShown;
  },
}


export default {
  state,
  getters,
  actions,
  mutations
}