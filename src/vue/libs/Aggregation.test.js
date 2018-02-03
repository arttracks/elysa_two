import Aggregation from "./Aggregation.js";
describe("Aggregation", () => {
  let data = {};
  let agg = null;
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
    agg = new Aggregation(data);
  });

  // ----------------------------------------------------------------------------
  describe("initialization", () => {
    it("accepts an object", () => {
      expect(agg.aggregation).toEqual(data);
      expect(agg.proxies).toEqual(data.proxies);
      expect(agg.aggregates).toEqual(data.aggregates);
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
      expect(agg.getList()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: "http://vocab.getty.edu/aat/300188723"
          })
        ])
      );
    });
    it("merges the proxies in", () => {
      expect(agg.getList()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            has_ancestor: expect.arrayContaining([
              "http://vocab.getty.edu/aat/300154336"
            ])
          })
        ])
      );
    });
    it("prefers proxy data to aggregates data", () => {
      data.proxies[0].has_parent = "fake_parent";
      agg = new Aggregation(data);
      expect(agg.getList()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            has_parent: "fake_parent"
          })
        ])
      );
    });
    it("works without proxies", () => {
      delete data.proxies;
      agg = new Aggregation(data);
      expect(agg.getList()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: "Type"
          })
        ])
      );
    });
    it("works without matching proxies", () => {
      data.proxies[0].proxyFor = "not a match";
      agg = new Aggregation(data);
      expect(agg.getList()).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            has_ancestor: expect.arrayContaining([
              "http://vocab.getty.edu/aat/300154336"
            ])
          })
        ])
      );
    });
    it("does not include the Proxy keyword", () => {
      expect(agg.getList()).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: "Proxy"
          })
        ])
      );
    });
    it("does not include the proxyFor keyword", () => {
      expect(agg.getList()).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            proxyFor: "http://vocab.getty.edu/aat/300188723"
          })
        ])
      );
    });
  });

  // ----------------------------------------------------------------------------
  describe("internationalization", () => {
    it("allows for a language to be set", () => {
      expect(agg.getList("es")).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ prefLabel: "hermanos" })
        ])
      );
    });
    it("allows for a language to be set by default", () => {
      agg = new Aggregation(data, { langs: "es" });
      expect(agg.getList()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ prefLabel: "hermanos" })
        ])
      );
    });
    it("does not return a value if the language is missing.", () => {
      expect(agg.getList("ck")).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ prefLabel: undefined })
        ])
      );
    });
    it("still returns undefined with '@any' if there are no labels", () => {
      delete data.aggregates[0].identified_by;
      agg = new Aggregation(data);
      expect(agg.getList(["ck", "@any"])).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ prefLabel: undefined })
        ])
      );
    });
    it("still returns undefined with '@any' if labels are empty", () => {
      data.aggregates[0].identified_by = {};
      agg = new Aggregation(data);
      expect(agg.getList(["ck", "@any"])).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ prefLabel: undefined })
        ])
      );
    });
    it("explicit prefLabels override identified_by", () => {
      data.aggregates[0].prefLabel = "preferred label";
      agg = new Aggregation(data);
      expect(agg.getList(["ck", "@any"])).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ prefLabel: "preferred label" })
        ])
      );
    });
    it("explicit prefLabels in the proxy override identified_by", () => {
      data.proxies[0].prefLabel = "preferred label";
      agg = new Aggregation(data);
      expect(agg.getList(["ck", "@any"])).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ prefLabel: "preferred label" })
        ])
      );
    });
    it("explicit prefLabel language maps override identified_by", () => {
      data.aggregates[0].prefLabel = { en: "preferred label" };
      agg = new Aggregation(data);
      expect(agg.getList(["ck", "@any"])).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ prefLabel: "preferred label" })
        ])
      );
    });
    it("explicit prefLabels language maps in the proxy override identified_by", () => {
      data.proxies[0].prefLabel = { en: "preferred label" };
      agg = new Aggregation(data);
      expect(agg.getList(["ck", "@any"])).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ prefLabel: "preferred label" })
        ])
      );
    });
  });
});
