import { getters, mutations } from "../../store/modules/provenance.js";
import * as types from "../../store/mutation-types.js";

describe("Modifying provenance", () => {
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

  describe("Reordering periods", () => {
    it("Periods can be reordered", () => {
      const state = { periods: ["first", "second", "third"] };
      mutations[types.REORDER_PERIODS](state, [0, 2, 1]);
      expect(state.periods).toEqual(["first", "third", "second"]);
    });
  });

  describe("Replacing provenance", () => {
    it("all provenance can be replaced", () => {
      const state = { periods: "old data" };
      mutations[types.REPLACE_PROVENANCE](state, { periods: "new data" });
      expect(state.periods).toEqual("new data");
    });
  });
});

describe("Provenance Getters", () => {
  let state = null;
  beforeEach(() => {
    state = {
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
  });

  describe("authorities", () => {
    it("has an authority section", () => {
      expect(getters.authorities(state)).toBeDefined();
    });
    it("authority section is empty for blank provenances", () => {
      state.periods = [{ owner: {} }];
      const result = getters.authorities(state);
      expect(result).toHaveLength(0);
    });
    it("has an authority section", () => {
      const result = getters.authorities(state);
      expect(result).toHaveLength(3);
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            text: "Mary Cassatt",
            uri: undefined,
            periodIndex: 0
          }),
          expect.objectContaining({
            text: "Galeries Durand-Ruel",
            uri: undefined,
            periodIndex: 1
          }),
          expect.objectContaining({
            text: "Paris, France",
            uri: undefined,
            periodIndex: 1
          })
        ])
      );
    });
  });
  describe("footnotes", () => {
    beforeEach(() => {
      state.periods[0].footnote = "I'm note 1";
      state.periods[1].footnote = "I'm note 2";
    });
    it("returns an empty array if there are no notes", () => {
      delete state.periods[0].footnote;
      delete state.periods[1].footnote;
      const result = getters.footnotes(state);
      expect(result).toHaveLength(0);
    });
    it("can get a list of footnotes", () => {
      const result = getters.footnotes(state);
      expect(result).toHaveLength(2);
      expect(result[0].text).toContain("I'm note 1");
      expect(result[1].text).toContain("I'm note 2");
      expect(result[0].periodIndex).toBe(0);
      expect(result[1].periodIndex).toBe(1);
    });
    it("prepends the footnote note to the text", () => {
      const result = getters.footnotes(state);
      expect(result[0].text).toMatch(/^\[1\]\. /);
      expect(result[1].text).toMatch(/^\[2\]\. /);
    });
  });

  describe("citations", () => {
    beforeEach(() => {
      state.periods[0].citations = ["I'm citation 1", "I'm citation 2"];
      state.periods[1].citations = ["I'm citation 3"];
    });
    it("returns an empty array if there are no notes", () => {
      delete state.periods[0].citations;
      delete state.periods[1].citations;
      const result = getters.citations(state);
      expect(result).toHaveLength(0);
    });
    it("can get a list of citations", () => {
      const result = getters.citations(state);
      expect(result).toHaveLength(3);
      expect(result[0].text).toContain("I'm citation 1");
      expect(result[1].text).toContain("I'm citation 2");
      expect(result[2].text).toContain("I'm citation 3");
      expect(result[0].periodIndex).toBe(0);
      expect(result[1].periodIndex).toBe(0);
      expect(result[2].periodIndex).toBe(1);
    });
    it("prepends the citations note to the text", () => {
      const result = getters.citations(state);
      expect(result[0].text).toMatch(/^\[a\]\. /);
      expect(result[1].text).toMatch(/^\[b\]\. /);
      expect(result[2].text).toMatch(/^\[c\]\. /);
    });
  });

  describe("periodsAsText", () => {
    it("returns an empty array if there are no periods", () => {
      delete state.periods;
      const result = getters.periodsAsText(state);
      expect(result).toHaveLength(0);
    });
    it("can get the periods as text", () => {
      const result = getters.periodsAsText(state);
      expect(result).toHaveLength(2);
      expect(result[0]).toContain("Mary Cassatt.");
      expect(result[1]).toContain("Galeries Durand-Ruel, Paris, France.");
    });
    it("puts semicolons after direct transfers", () => {
      state.periods[0].direct_transfer = true;
      const result = getters.periodsAsText(state);
      expect(result[0].endsWith(";")).toBeTruthy();
    });
    it("puts periods after indirect transfers", () => {
      state.periods[0].direct_transfer = false;
      const result = getters.periodsAsText(state);
      expect(result[0].endsWith(".")).toBeTruthy();
    });
    it("enforces the last period's ends in '.' ", () => {
      state.periods[1].direct_transfer = true;
      const result = getters.periodsAsText(state);
      expect(result[1].endsWith(".")).toBeTruthy();
    });
    it("doesn't change indirect last period puctuation", () => {
      state.periods[1].direct_transfer = false;
      const result = getters.periodsAsText(state);
      expect(result[1].endsWith(".")).toBeTruthy();
    });

    it("uppercases lines following direct transfers", () => {
      state.periods[1].owner.name.string = "lowercase";
      const result = getters.periodsAsText(state);
      expect(result[1].startsWith("L")).toBeTruthy();
    });
    it("puts notes if there are footnotes", () => {
      state.periods[0].footnote = "I'm a note";
      const result = getters.periodsAsText(state);
      expect(result[0]).toContain("[1]");
    });
    it("puts citations if there are citations", () => {
      state.periods[0].citations = ["I'm a citation"];
      const result = getters.periodsAsText(state);
      expect(result[0]).toContain("[a]");
    });
  });
  it("can get a list of periods", () => {
    const result = getters.periodsList(state);
    expect(result).toHaveLength(2);
    expect(result[0].value).toBe("Mary Cassatt");
    expect(result[0].direct).toBe(false);
    expect(result[0].index).toBe(0);
    expect(result[1].value).toBe("Galeries Durand-Ruel");
    expect(result[1].direct).toBe(true);
    expect(result[1].index).toBe(1);
  });
});
