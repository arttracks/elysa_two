import { langSearch } from "./LanguageHelpers.js";

export default class Aggregation {
  constructor(oreAggregation, options = {}) {
    // Sanity checking for the base object
    if (Object.prototype.toString.call(oreAggregation) !== "[object Object]") {
      throw Error("Aggregations must be initalized with an Object");
    } else if (oreAggregation.aggregates == undefined) {
      throw Error("Aggregations must have an `aggregates` property");
    } else if (!Array.isArray(oreAggregation.aggregates)) {
      throw Error("the `aggregates` property must be an Array");
    }

    // Sanity checking for the aggregates
    oreAggregation.aggregates.forEach(obj => {
      if (typeof obj === "string") {
      } else if (Object.prototype.toString.call(obj) !== "[object Object]") {
        throw Error("Aggregations must either be strings or objects.");
      } else if (!obj.id || !(typeof obj.id === "string")) {
        throw Error("Aggregations must have IDs.");
      }
    });

    // Setting up the default options
    const defaults = {
      langs: ["en", "@none", "any"]
    };
    this.options = Object.assign(defaults, options);

    // Saving the data
    this.aggregation = oreAggregation;
  }

  // ----------------------------------------------------------------------------
  getList(langs) {
    let results = [];
    for (const obj of this.aggregation.aggregates) {
      let tempObj = {
        id: obj.id,
        prefLabel: this.langSearch(obj, "prefLabel", langs)[0]
      };
      results.push(tempObj);
    }
    return results;
  }
}
