import {
  langSearch,
  _buildLanguageList,
  langDefaults
} from "./LanguageHelpers.js";

describe("LanguageHelpers", () => {
  let data = {};
  beforeEach(() => {
    data = {
      identified_by: [
        {
          value: "John",
          language: "en"
        },
        {
          value: "Juan",
          language: "es"
        }
      ],
      prefLabel: {
        fr: "Sophie",
        es: "Sophia",
        en: "Sarah"
      }
    };
  });
  // ---------------------------------------------------------------------------

  describe("_buildLanguageList", () => {
    it("allows for just an object", () => {
      expect(_buildLanguageList({ langs: ["es"] })).toEqual(["es"]);
    });
    it("allows for just an object containing a string", () => {
      expect(_buildLanguageList({ langs: "es" })).toEqual(["es"]);
    });

    it("allows for just a string", () => {
      expect(_buildLanguageList("es")).toEqual(["es"]);
    });
    it("allows for just an array", () => {
      expect(_buildLanguageList(["es"])).toEqual(["es"]);
    });

    it("if both, add explicit language to the begining", () => {
      expect(_buildLanguageList("en", { langs: ["es"] })).toEqual(["en", "es"]);
    });
    it("if neither, get the defaults", () => {
      expect(_buildLanguageList()).toEqual(langDefaults.langs);
    });
  });

  // ---------------------------------------------------------------------------
  describe("LangSearch", () => {
    it("returns an empty array if called without and obj or array", () => {
      expect(langSearch("a string")).toEqual([]);
    });
  });

  describe("langMapSearch", () => {
    it("returns an array of names with the default language set", () => {
      expect(langSearch(data.prefLabel)).toEqual(["Sarah"]);
    });
    it("returns an array of names with a specified language", () => {
      expect(langSearch(data.prefLabel, "es")).toEqual(["Sophia"]);
    });
    it("returns an array of names with a an array of languages", () => {
      expect(langSearch(data.prefLabel, ["ck", "es"])).toEqual(["Sophia"]);
    });
    it("only returns the first match with a an array of languages", () => {
      expect(langSearch(data.prefLabel, ["es", "en"])).toEqual(["Sophia"]);
    });
    it("returns an empty array with no matches", () => {
      expect(langSearch(data.prefLabel, "ck")).toEqual([]);
    });
    it("returns an empty array with no data", () => {
      expect(langSearch({})).toEqual([]);
    });
    it("returns a the first value with @any", () => {
      expect(langSearch(data.prefLabel, "@any")).toEqual(["Sophie"]);
    });
  });

  // ---------------------------------------------------------------------------
  describe("linguisticObjectSearch", () => {
    it("returns an array of names with the default language set", () => {
      expect(langSearch(data.identified_by)).toEqual(["John"]);
    });
    it("returns an array of names with a specified language", () => {
      expect(langSearch(data.identified_by, "es")).toEqual(["Juan"]);
    });
    it("returns an array of names with a an array of languages", () => {
      expect(langSearch(data.identified_by, ["ck", "es"])).toEqual(["Juan"]);
    });
    it("only returns the first match with a an array of languages", () => {
      expect(langSearch(data.identified_by, ["es", "en"])).toEqual(["Juan"]);
    });
    it("returns an empty array with no matches", () => {
      expect(langSearch(data.identified_by, "ck")).toEqual([]);
    });
    it("returns an empty array with no data", () => {
      expect(langSearch([])).toEqual([]);
    });
    it("returns a the first value with @any", () => {
      expect(langSearch(data.identified_by, "@any")).toEqual(["John"]);
    });
    it("returns an empty array is the data is not an array of objects", () => {
      expect(langSearch(["not_a_Linguistic_Object"])).toEqual([]);
    });
    it("returns an empty array is the data has no values", () => {
      let tempData = {
        identified_by: [
          {
            language: "en"
          }
        ]
      };
      expect(langSearch(tempData.identified_by, "en")).toEqual([]);
    });
  });
});
