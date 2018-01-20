import edtf from "edtf";

function buildPlace(data) {
  return `${data.string}${data.certainty ? "" : "?"}`;
}

function buildSales(data) {
  let vals = [];
  if (data.stock_number) {
    vals.push(data.stock_number);
  }
  if (data.purchase) {
    const p = data.purchase;
    if (p.string) {
      vals.push(`for ${p.string}`);
    } else {
      const value = parseFloat(p.value).toLocaleString();
      vals.push(`for ${p.currency_symbol}${value}`);
    }
  }
  return `(${vals.join(", ")})`;
}

function buildPerson(data) {
  let str = [];
  if (data.relationship) {
    str.push(buildPerson(data.relationship));
  }
  if (data.name) {
    // Name itself
    let nameString = data.name.string;
    if (data.name.certainty === false) {
      nameString += "?";
    }
    // Life Dates
    if (data.birth || data.death) {
      // TODO:  update when EDTF.js supports `uu`
      const birth = data.birth ? edtf(data.birth.replace(/u/g, "X")).year : "";
      const death = data.death ? edtf(data.death.replace(/u/g, "X")).year : "";
      nameString += ` [${birth}-${death}]`;
    }
    // Location
    if (data.place) {
      nameString += `, ${buildPlace(data.place)}`;
    }
    // Relationship type
    if (data.type) {
      nameString += `'s ${data.type},`;
    }

    str.push(nameString);
  }
  return str.join(" ");
}

export default function(data) {
  let str = [];

  // acquisition
  if (data.purchasing_agent) {
    str.push(
      `${buildPerson(data.purchasing_agent)} for ${buildPerson(data.owner)}`
    );
  } else {
    str.push(buildPerson(data.owner));
  }
  //
  // location
  if (data.transfer_location) {
    str.push(`in ${buildPlace(data.transfer_location.place)}`);
  }

  str = str.join(", ");

  // Parts not added with a comma:
  //---
  // Global certainty
  if (data.period_certainty === false) {
    str = "possibly " + str;
  }
  // Sale info
  if (data.stock_number || data.purchase) {
    str += ` ${buildSales(data)}`;
  }
  // Closing punctuation
  str += data.direct_transfer ? ";" : ".";

  return { text: str, footnote: data.footnote, citations: data.citations };
}
