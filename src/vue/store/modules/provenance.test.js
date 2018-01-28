import { getters, mutations } from "./provenance.js";
import * as types from "../mutation-types.js";

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

    it("handles deleting the current delete a period", () => {
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

describe("modifying a provenance period", () => {
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
        }
      ]
    };
  });
  describe("footnotes", () => {
    it("can update a footnote", () => {
      mutations[types.SET_PERIOD_PROPERTY](state, {
        period: 0,
        property: "footnote",
        value: "I am a note"
      });
      expect(state.periods[0].footnote).toBe("I am a note");
    });
    it("can update nested properties", () => {
      mutations[types.SET_PERIOD_PROPERTY](state, {
        period: 0,
        property: "owner.name.string",
        value: "new name"
      });
      expect(state.periods[0].owner.name.string).toBe("new name");
    });
    it("can update nested properties with objects", () => {
      mutations[types.SET_PERIOD_PROPERTY](state, {
        period: 0,
        property: "owner.name",
        value: { string: "new name" }
      });
      expect(state.periods[0].owner.name.string).toBe("new name");
    });
    it("recursively creates new property chains", () => {
      mutations[types.SET_PERIOD_PROPERTY](state, {
        period: 0,
        property: "owner.new.property.chain",
        value: "new value"
      });
      expect(state.periods[0].owner.new.property.chain).toBe("new value");
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

  describe("generic property retreival", () => {
    it("can get a generic property", () => {
      const owner = getters.datum(state)(0, "owner");
      expect(owner).toEqual({
        name: expect.objectContaining({
          string: "Mary Cassatt"
        })
      });
    });
    it("gets undefined for missing properties", () => {
      const badProp = getters.datum(state)(0, "not_a_thing");
      expect(badProp).not.toBeDefined();
    });
    it("throws an error for unavailable indexes", () => {
      expect(() => {
        getters.datum(state)(99999, "owner");
      }).toThrow();
    });
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

  describe("fullText", () => {
    let fakeGetters = function(state, getters) {
      return {
        periodsAsText: getters.periodsAsText(state),
        footnotes: getters.footnotes(state),
        citations: getters.citations(state),
        authorities: getters.authorities(state)
      };
    };
    it("generates a full provenance text", () => {
      const result = getters.fullText(state, fakeGetters(state, getters));
      expect(result).toContain(
        "Mary Cassatt. Galeries Durand-Ruel, Paris, France."
      );
      expect(result).toContain("\n\nAuthorities:\n\n");

      expect(result).toContain("\nMary Cassatt:         no records found.");
      expect(result).toContain("\nGaleries Durand-Ruel: no records found.");
      expect(result).toContain("\nParis, France:        no records found.");

      expect(result).not.toContain("\nCitations:\n");
      expect(result).not.toContain("\nNotes:\n");
    });
    it("includes authority URLs", () => {
      state.periods[0].owner.name.uri = "http://example.com/mary";
      const result = getters.fullText(state, fakeGetters(state, getters));
      expect(result).toContain(
        "\nMary Cassatt:         http://example.com/mary"
      );
    });
    it("provides a blank string for no provenance", () => {
      state.periods = [];
      const result = getters.fullText(state, fakeGetters(state, getters));
      expect(result).toEqual("");
    });

    it("can include citations", () => {
      state.periods[0].citations = ["I'm citation 1", "I'm citation 2"];
      const result = getters.fullText(state, fakeGetters(state, getters));
      expect(result).toContain("\nCitations:\n");
      expect(result).toContain("\n[a]. I'm citation 1");
      expect(result).toContain("\n[b]. I'm citation 2");
    });
    it("can include footnotes", () => {
      state.periods[0].footnote = "I'm note 1";
      state.periods[1].footnote = "I'm note 2";
      const result = getters.fullText(state, fakeGetters(state, getters));
      expect(result).toContain("\nNotes:\n");
      expect(result).toContain("\n[1]. I'm note 1");
      expect(result).toContain("\n[2]. I'm note 2");
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
    it("uppercases the first line direct transfers", () => {
      state.periods[0].owner.name.string = "lowercase";
      const result = getters.periodsAsText(state);
      expect(result[0].startsWith("L")).toBeTruthy();
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
