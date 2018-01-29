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
  langSearch(obj, key, langs) {
    let arr = [];
    if (Object.prototype.toString.call(obj) !== "[object Object]") {
      return arr;
    } else if (!obj[key]) {
      return arr;
    }

    langs = langs || this.options.langs;
    if (typeof langs === "string") {
      langs = [langs];
    }

    for (const lang of langs) {
      if (obj[key][lang]) {
        arr.push(obj[key][lang]);
        continue;
      }
    }

    if (!arr.length && langs.includes("any")) {
      if (Object.keys(obj[key]).length) {
        let firstLang = Object.keys(obj[key])[0];
        arr.push(obj[key][firstLang]);
      }
    }
    return arr;
  }

  // ----------------------------------------------------------------------------
  getList(langs) {
    let results = [];
    for (const obj of this.aggregation.aggregates) {
      let tempObj = { id: obj.id };
      tempObj.prefLabel = this.langSearch(obj, "prefLabel", langs)[0];
      results.push(tempObj);
    }
    return results;
  }
}
