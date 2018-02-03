// ----------------------------------------------------------------------------
function langSearch(data, lang, opts = {}) {
  if (Object.prototype.toString.call(data) !== "[object Object]") {
    return langMapSearch(data, "value", langs);
  }
}

function langMapSearch(obj, key, langs) {
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

export { langSearch };
