// ----------------------------------------------------------------------------
let langDefaults = {
  langs: ["en", "@none", "@any"]
};

// Setup options hash, and allow for:
//   buildLanguageList(),
//   buildLanguageList({langs: ["en", "es"]}),
//   buildLanguageList("es"),
//   buildLanguageList(["es", "en"]),
//   buildLanguageList("es", {langs:["en", "es"]})
// ----------------------------------------------------------------------------
function _buildLanguageList(langs = null, opts = {}) {
  // Handle only getting on options list
  if (Object.prototype.toString.call(langs) === "[object Object]") {
    opts = langs;
    langs = undefined;
  }

  // make sure strings are turned into arrays
  if (typeof langs === "string") {
    langs = [langs];
  }
  if (typeof opts.langs === "string") {
    opts.langs = [opts.langs];
  }

  // If both, merge them.
  if (langs && opts.langs) {
    opts.langs = langs.concat(opts.langs);
    langs = undefined;
  }

  // If nothing, get the defaults
  if (!langs && !opts.langs) {
    opts = langDefaults;
  }

  return langs || opts.langs;
}

// ----------------------------------------------------------------------------
function langSearch(data, langs, opts = {}) {
  langs = _buildLanguageList(langs, opts);

  // Search either for a Linguistic Object or a Langauge Map
  if (Object.prototype.toString.call(data) === "[object Object]") {
    return langMapSearch(data, langs);
  } else if (Array.isArray(data)) {
    return linguisticObjectSearch(data, "value", langs);
  }
  return [];
}

// ----------------------------------------------------------------------------
function linguisticObjectSearch(data, key, langs) {
  let arr = [];
  for (const lang of langs) {
    if (arr.length) {
      break;
    }
    data.forEach(datum => {
      // handle invalid data
      if (Object.prototype.toString.call(datum) !== "[object Object]") {
        return;
      } else if (!datum[key]) {
        return;
      }
      if (datum.language === lang) {
        arr.push(datum[key]);
      }
    });
  }

  // If there's an "@any" language, pull the first value
  if (!arr.length && data.length && langs.includes("@any")) {
    for (const datum of data) {
      let val = datum[key];
      if (val) {
        arr.push(val);
        break;
      }
    }
  }
  return arr;
}

// ----------------------------------------------------------------------------
function langMapSearch(obj, langs) {
  let arr = [];

  // Bail out if the object is empty
  if (Object.keys(obj).length === 0) {
    return arr;
  }

  // Scan each language in turn
  for (const lang of langs) {
    if (!arr.length && obj[lang]) {
      arr.push(obj[lang]);
      continue;
    }
  }

  // If there's an "@any" language, pull the first value
  if (!arr.length && langs.includes("@any")) {
    let firstLang = Object.keys(obj)[0];
    arr.push(obj[firstLang]);
  }
  return arr;
}

export { langSearch, _buildLanguageList, langDefaults };
