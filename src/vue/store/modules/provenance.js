import * as types from "../mutation-types.js";
import ProvenanceToString from "../../libs/ProvenanceToString";
import Vue from "vue";

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
    },
    {
      period_certainty: false,
      acquisition_method: "acq:sale",
      purchasing_agent: {
        name: {
          token: "$AUTHORITY_TOKEN_1",
          string: "Bob Buyer",
          uri: "http://example.org/bob",
          certainty: false
        },
        birth: "1910-uu-uu",
        death: "1980-uu-uu",
        place: {
          token: "$AUTHORITY_TOKEN_3",
          string: "Pittsburgh, PA",
          uri: "http://example.org/pgh",
          certainty: true
        }
      },
      owner: {
        relationship: {
          name: {
            token: "$AUTHORITY_TOKEN_1",
            string: "Bob Buyer",
            uri: "http://example.org/bob",
            certainty: true
          },
          type: "son"
        },
        name: {
          token: "$AUTHORITY_TOKEN_2",
          string: "Owen Owner",
          uri: "http://example.org/owen",
          certainty: true
        },
        birth: "1920-uu-uu",
        death: "1990-uu-uu",
        place: {
          token: "$AUTHORITY_TOKEN_4",
          string: "Boise, ID",
          uri: "http://example.org/boise",
          certainty: true
        }
      },
      event: {
        token: "$AUTHORITY_TOKEN_5",
        string: "Sale of Sales",
        uri: "http://example.org/sale",
        certainty: true
      },
      sellers_agent: {
        name: {
          token: "$AUTHORITY_TOKEN_6",
          string: "Gallery G",
          uri: "http://example.org/gallery",
          certainty: true
        },
        place: {
          token: "$AUTHORITY_TOKEN_7",
          string: "New York, NY",
          uri: "http://example.org/nyc",
          certainty: false
        }
      },
      transfer_location: {
        place: {
          token: "$AUTHORITY_TOKEN_8",
          string: "Miami, FL",
          uri: "http://example.org/miami",
          certainty: true
        }
      },
      timespan: {
        botb: "1982-01-05",
        eotb: "1982-02-uu",
        bote: "1999-uu-uu",
        eote: "20uu-uu-uu"
      },
      stock_number: "lot no. 1",
      purchase: {
        value: "100000",
        currency_symbol: "$"
      },
      citations: ["Book of Books"],
      footnote: "Note a note.",
      direct_transfer: false
    }
  ]
};

function generateAuthorities(authorityList) {
  let maxLength = 0;
  authorityList.forEach(a => {
    if (a.text.length > maxLength) {
      maxLength = a.text.length;
    }
  });
  const names = authorityList.map(
    a =>
      `${a.text}:`.padEnd(maxLength + 2) + (a.uri ? a.uri : "no records found.")
  );
  return `\n\nAuthorities:\n\n${names.join("\n")}`;
}

export const getters = {
  datum: state => (id, property) => {
    if (state.periods.length <= id) {
      throw new Error(
        `Requested a property for a period out of bounds! You requested ${id}, but I only know about ${
          state.periods.length
        } periods`
      );
    }
    return state.periods[id][property];
  },
  periodsList(state) {
    return state.periods.map((p, i) => {
      return {
        value: p.owner.name.string,
        direct: p.direct_transfer,
        index: i
      };
    });
  },

  footnotes(state) {
    let results = [];
    state.periods.forEach((period, i) => {
      const prov = ProvenanceToString(period);
      if (prov.footnote) {
        const num = results.length + 1;
        results.push({ text: `[${num}]. ${prov.footnote}`, periodIndex: i });
      }
    });
    return results;
  },

  citations(state) {
    let results = [];
    state.periods.forEach((period, i) => {
      const prov = ProvenanceToString(period);
      if (prov.citations) {
        for (const citation of prov.citations) {
          const num = String.fromCharCode(96 + results.length + 1);
          results.push({ text: `[${num}]. ${citation}`, periodIndex: i });
        }
      }
    });
    return results;
  },

  authorities(state) {
    let results = [];
    state.periods.forEach((period, i) => {
      const prov = ProvenanceToString(period);
      if (prov.authorities) {
        for (const authority of prov.authorities) {
          results.push({
            text: authority.text,
            uri: authority.uri,
            periodIndex: i
          });
        }
      }
    });
    return results;
  },

  periodsAsText(state) {
    let results = [];
    let footnotes = 0;
    let citations = 0;
    let prevEnding = null;
    if (!state.periods) {
      return results;
    }
    for (const period of state.periods) {
      let prov = ProvenanceToString(period);

      // handle uppercasing lines preceded by a period.
      if (prevEnding === "." || prevEnding === null) {
        let firstLetter = prov.text.slice(0, 1);
        let rest = prov.text.slice(1);
        prov.text = firstLetter.toUpperCase() + rest;
      }
      prevEnding = prov.text.slice(-1);

      // Handle writing endnotes
      let endnotes = [];
      if (prov.footnote) {
        footnotes++;
        endnotes.push(`[${footnotes}]`);
      }
      if (prov.citations) {
        prov.citations.forEach(() => {
          citations++;
          endnotes.push(`[${String.fromCharCode(96 + citations)}]`);
        });
      }
      if (endnotes.length) {
        let lastLetter = prov.text.slice(-1);
        let rest = prov.text.slice(0, -1);
        prov.text = rest + " " + endnotes.join("") + lastLetter;
      }

      results.push(prov.text);
    }

    // Make sure it ends in a period.
    if (prevEnding === ";") {
      let text = results[results.length - 1];
      let rest = text.slice(0, -1);
      text = rest + ".";
      results[results.length - 1] = text;
    }
    return results;
  },
  fullText(state, getters) {
    let str = getters.periodsAsText.join(" ");
    if (getters.footnotes.length) {
      str += `\n\nNotes:\n\n${getters.footnotes.map(f => f.text).join("\n")}`;
    }
    if (getters.authorities.length) {
      str += generateAuthorities(getters.authorities);
    }
    if (getters.citations.length) {
      str += `\n\nCitations:\n\n${getters.citations
        .map(c => c.text)
        .join("\n")}`;
    }
    return str;
  }
};
export const actions = {};

export const mutations = {
  [types.ADD_NEW_PERIOD](state) {
    state.periods.push(blankPeriod);
  },
  [types.REPLACE_PROVENANCE](state, data) {
    state.periods = data.periods;
  },
  [types.DELETE_PERIOD](state, index) {
    if (index >= state.periods.length || index < 0) {
      throw new Error("Cannot delete a nonexistent period!");
    }
    state.periods.splice(index, 1);
  },
  [types.SET_PERIOD_PROPERTY](state, payload) {
    let obj = state.periods[payload.period];
    let arr = payload.property.split(".");
    while (arr.length > 1) {
      let prop = arr.shift();
      if (obj[prop] === undefined) {
        Vue.set(obj, prop, {});
      }
      obj = obj[prop];
    }
    Vue.set(obj, arr[0], payload.value);
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
