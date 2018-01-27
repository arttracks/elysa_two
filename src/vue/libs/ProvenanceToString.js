import edtf from "edtf";

function buildPlace(data) {
  return `${data.string}${data.certainty ? "" : "?"}`;
}

function buildEvent(data) {
  return `"${data.string}"${data.certainty ? "" : "?"}`;
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

function extractAuthorityFrom(data) {
  let found = [];
  if (data) {
    if (data.relationship) {
      let r = extractAuthorityFrom(data.relationship);
      for (const auth of r) {
        found.push(auth);
      }
    }
    if (data.name && data.name.string && data.name.string.length) {
      found.push({ text: data.name.string, uri: data.name.uri });
    }
    if (data.place && data.place.string && data.place.string.length) {
      found.push({ text: data.place.string, uri: data.place.uri });
    }
    if (data.string && data.string && data.string.length) {
      found.push({ text: data.string, uri: data.uri });
    }
  }
  return found;
}

function collectAuthorities(data) {
  let authorities = [];
  authorities.push(extractAuthorityFrom(data.owner));
  authorities.push(extractAuthorityFrom(data.purchasing_agent));
  authorities.push(extractAuthorityFrom(data.event));
  authorities.push(extractAuthorityFrom(data.sellers_agent));
  authorities.push(extractAuthorityFrom(data.transfer_location));

  const allAuth = authorities.reduce((acc, cur) => acc.concat(cur), []);
  return allAuth.length > 0 ? allAuth : null;
}

export default function(data) {
  let str = [];

  // acquisition: ex: "purchased by"
  // TODO: write me

  // owner and buyer agent: "Bob Buyer? [1910-1980], Pittsburgh, PA, for Bob Buyer's son, Owen Owner [1920-1990?], Boise, ID"
  if (
    data.purchasing_agent &&
    data.purchasing_agent.name &&
    data.purchasing_agent.name.string &&
    data.purchasing_agent.name.string.length
  ) {
    str.push(
      `${buildPerson(data.purchasing_agent)} for ${buildPerson(data.owner)}`
    );
  } else {
    str.push(buildPerson(data.owner));
  }
  // Named event: "from "Sale of Sales", Gallery G, New York, NY?"
  if (data.event || data.sellers_agent) {
    let substr = [];
    if (data.event && data.event.string && data.event.string.length) {
      substr.push(buildEvent(data.event));
    }
    if (
      data.sellers_agent &&
      data.sellers_agent.name &&
      data.sellers_agent.name.string &&
      data.sellers_agent.name.string.length
    ) {
      substr.push(buildPerson(data.sellers_agent));
    }

    if (substr.length) {
      str.push(`from ${substr.join(", ")}`);
    }
  }

  // location: "in Miami, FL"
  if (
    data.transfer_location &&
    data.transfer_location.place &&
    data.transfer_location.place.string &&
    data.transfer_location.place.string.length
  ) {
    str.push(`in ${buildPlace(data.transfer_location.place)}`);
  }

  // Date String: "sometime between Jan 5, 1982 and February 1982 until between 1999? and the 21st Century"
  // TODO: write me

  // Combine main clauses
  str = str.join(", ");

  // Parts not added with a comma:
  // ---
  // Global certainty: "Possibly"
  if (data.period_certainty === false) {
    str = "possibly " + str;
  }
  // Sale info: "(lot no. 1, for $100,000)"
  if (data.stock_number || data.purchase) {
    str += ` ${buildSales(data)}`;
  }
  // Closing punctuation: ";"
  str += data.direct_transfer ? ";" : ".";

  return {
    text: str,
    footnote: data.footnote,
    authorities: collectAuthorities(data),
    citations: data.citations
  };
}
