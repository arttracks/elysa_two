import { langSearch, langDefaults } from "./LanguageHelpers.js";

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
      langs: langDefaults.langs
    };
    this.options = Object.assign(defaults, options);

    // Saving the data
    this.aggregation = oreAggregation;
    this.aggregates = this.aggregation.aggregates;
    this.proxies = this.aggregation.proxies;
  }

  // ----------------------------------------------------------------------------
  getList(opts) {
    opts = opts || this.options;
    let results = [];
    for (const obj of this.aggregates) {
      let clonedObj = JSON.parse(JSON.stringify(obj));

      // merge in the proxies
      let proxy = null;
      if (this.proxies) {
        proxy = this.proxies.find(proxy => proxy.proxyFor === clonedObj.id);
      }
      if (proxy) {
        delete proxy.type;
        delete proxy.proxyFor;
        clonedObj = Object.assign(clonedObj, proxy);
      }

      // calculate prefLabel
      let prefLabel = null;
      if (typeof clonedObj.prefLabel === "string") {
        prefLabel = clonedObj.prefLabel;
      } else if (clonedObj.prefLabel) {
        prefLabel = langSearch(clonedObj.prefLabel, opts)[0];
      }
      if (!prefLabel) prefLabel = langSearch(clonedObj.identified_by, opts)[0];

      clonedObj.prefLabel = prefLabel;

      results.push(clonedObj);
    }
    return results;
  }
}
