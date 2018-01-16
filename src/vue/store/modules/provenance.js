import * as types from "../mutation-types.js";

export const blankPeriod = {
  period_certainty: true,
  owner: {
    name: {
      string: "unknown person",
      certainty: false
    }
  },
  direct_transfer: false
};

const state = {
  periods: [
    {
      period_certainty: true,
      owner: {
        name: {
          string: "Mary Cassatt",
          certainty: true
        },
        birth: "1844-uu-uu",
        death: "1926-uu-uu"
      },
      timespan: null,
      direct_transfer: true
    },
    {
      period_certainty: true,
      owner: {
        name: {
          string: "Galeries Durand-Ruel",
          certainty: true
        },
        place: {
          string: "Paris, France",
          certainty: true
        }
      },
      timespan: {
        eotb: "1892-08-uu"
      },
      footnote: "Recorded in stock book in August 1892 ",
      direct_transfer: false
    },
    {
      period_certainty: true,
      owner: {
        name: {
          string: "Durand-Ruel Galleries",
          certainty: true
        },
        place: {
          string: "New York, NY",
          certainty: true
        }
      },
      timespan: {
        botb: "1895-uu-uu",
        eotb: "1895-uu-uu"
      },
      direct_transfer: true
    },
    {
      period_certainty: true,
      acquisition_method: "acq:sale",
      owner: {
        name: {
          string: "Museum",
          certainty: true
        }
      },
      timespan: {
        botb: "1922-10-uu",
        eotb: "1922-10-uu"
      },
      footnote: "Updated by CGK July 2012.",
      direct_transfer: false
    }
  ]
};

export const getters = {
  periodsList(state) {
    return state.periods.map((p, i) => {
      return {
        value: p.owner.name.string,
        direct: p.direct_transfer,
        index: i
      };
    });
  }
};
export const actions = {};
export const mutations = {
  [types.ADD_NEW_PERIOD](state) {
    state.periods.push(blankPeriod);
  },
  [types.DELETE_PERIOD](state, index) {
    if (index >= state.periods.length || index < 0) {
      throw "Cannot delete a nonexistent period!";
    }
    state.periods.splice(index, 1);
  },

  [types.REORDER_PERIODS](state, newOrder) {
    let newPeriods = [];
    for (const index of newOrder) {
      newPeriods.push(state.periods[index]);
    }
    state.periods = newPeriods;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
