import Aggregation from "./Aggregation.js";
describe("Aggregation", () => {
  let data = {};
  beforeEach(() => {
    data = {
      "@context": "https://linked.art/api/v1/thesaurus.json",
      id: "http://example.com/thesaurus",
      type: "Aggregation",
      name: {
        en: "Example Thesaurus",
        es: "Ejemplo de tesauro"
      },
      aggregates: [
        {
          id: "http://vocab.getty.edu/aat/300188723",
          type: "Type",
          has_parent: ["http://vocab.getty.edu/aat/300187624"],
          identified_by: [
            {
              type: "Name",
              value: "brothers",
              language: "en"
            },
            {
              type: "Name",
              value: "hermanos",
              language: "es"
            }
          ]
        }
      ],
      proxies: [
        {
          type: "Proxy",
          proxyFor: "http://vocab.getty.edu/aat/300188723",
          keyword: "brother",
          has_ancestor: [
            "http://vocab.getty.edu/aat/300154336",
            "http://vocab.getty.edu/aat/300187624"
          ]
        }
      ]
    };
  });

  // ----------------------------------------------------------------------------
  describe("initialization", () => {
    it("accepts an object", () => {
      const agg = new Aggregation(data);
      expect(agg.aggregation).toEqual(data);
    });

    it("throws if not an object", () => {
      expect(() => {
        new Aggregation("not an object");
      }).toThrow();
    });

    it("throws if aggregates is missing", () => {
      delete data.aggregates;
      expect(() => {
        new Aggregation(data);
      }).toThrow();
    });

    it("throws if aggregates is not an array", () => {
      data.aggregates = "not an array";
      expect(() => {
        new Aggregation(data);
      }).toThrow();
    });

    it("will accept strings as aggregate ids", () => {
      data.aggregates[0] = "just an id";
      expect(() => {
        new Aggregation(data);
      }).not.toThrow();
    });

    it("throws if an aggregate is not a string or object", () => {
      data.aggregates[0] = ["not an object"];
      expect(() => {
        new Aggregation(data);
      }).toThrow();
    });

    it("throws if an aggregate's id is missing", () => {
      delete data.aggregates[0].id;
      expect(() => {
        new Aggregation(data);
      }).toThrow();
    });
  });

  // ----------------------------------------------------------------------------
  describe("listing the objects", () => {
    it("has an id", () => {
      const agg = new Aggregation(data);
      expect(agg.getList()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: "aat:300188723" })
        ])
      );
    });
  });

  // ----------------------------------------------------------------------------
  describe("internationalization", () => {
    it("allows for a language to be set", () => {
      const agg = new Aggregation(data);
      expect(agg.getList("en")).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ prefLabel: "brothers" })
        ])
      );
      expect(agg.getList("es")).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ prefLabel: "hermanos" })
        ])
      );
    });
    it("allows for a language to be set by default", () => {
      const agg = new Aggregation(data, { langs: "es" });
      expect(agg.getList()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ prefLabel: "hermanos" })
        ])
      );
    });
    it("does not return a value if the language is missing.", () => {
      const agg = new Aggregation(data);
      expect(agg.getList("ck")).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ prefLabel: undefined })
        ])
      );
    });
    it("allows for fallback labels.", () => {
      const agg = new Aggregation(data);
      expect(agg.getList(["ck", "en"])).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ prefLabel: "brothers" })
        ])
      );
    });
    it("allows for the magic 'any' fallback.", () => {
      const agg = new Aggregation(data);
      expect(agg.getList(["ck", "any"])).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ prefLabel: "brothers" })
        ])
      );
    });
    it("still returns undefined with 'any' if there are no labels", () => {
      delete data.aggregates[0].prefLabel;
      const agg = new Aggregation(data);
      expect(agg.getList(["ck", "any"])).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ prefLabel: undefined })
        ])
      );
    });
    it("still returns undefined with 'any' if labels are empty", () => {
      data.aggregates[0].prefLabel = {};
      const agg = new Aggregation(data);
      expect(agg.getList(["ck", "any"])).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ prefLabel: undefined })
        ])
      );
    });
  });
});
