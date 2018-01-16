import { getters, mutations } from "../../store/modules/provenance.js";
import * as types from "../../store/mutation-types.js";

describe("Adding a new period", () => {
  it("adding a period works", () => {
    const state = { periods: [] };
    mutations[types.ADD_NEW_PERIOD](state);
    expect(state.periods).toHaveLength(1);
  });
  it("by default adds an owner name", () => {
    const state = { periods: [] };
    mutations[types.ADD_NEW_PERIOD](state);
    expect(state.periods[0].owner.name.string).toBeDefined();
  });
});

describe("Deleting a period", () => {
  it("can delete a period", () => {
    const state = { periods: ["first", "second", "third"] };
    mutations[types.DELETE_PERIOD](state, 1);
    expect(state.periods).toEqual(["first", "third"]);
  });
  it("throws on non-existent periods", () => {
    const state = { periods: ["first", "second", "third"] };
    expect(() => {
      mutations[types.DELETE_PERIOD](state, 4);
    }).toThrow();
    expect(() => {
      mutations[types.DELETE_PERIOD](state, -1);
    }).toThrow();
  });
});

describe("Provenance Getters", () => {
  it("can get a list of periods", () => {
    const state = {
      periods: [
        {
          owner: {
            name: {
              string: "Mary Cassatt",
              certainty: true
            }
          },
          direct_transfer: false
        },
        {
          direct_transfer: true,
          owner: {
            name: {
              string: "Galeries Durand-Ruel",
              certainty: true
            },
            place: {
              string: "Paris, France",
              certainty: true
            }
          }
        }
      ]
    };
    const result = getters.periodsList(state);
    expect(result).toHaveLength(2);
    expect(result[0].value).toBe("Mary Cassatt");
    expect(result[0].direct).toBe(false);
    expect(result[1].value).toBe("Galeries Durand-Ruel");
    expect(result[1].direct).toBe(true);
  });
});
