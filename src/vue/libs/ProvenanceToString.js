const str = `Possibly purchased by Bob Buyer? [1910-1980], Pittsburgh, PA for Bob Buyer's son, Owen Owner [1920-1990?], Boise, ID, from "Sale of Sales", Gallery G, New York, NY?, in Miami, FL, sometime between Jan 5, 1982 and February 1982 until between 1999? and the 21st Century (lot no. 1, for $100,000)[a][1].`;

const sampleData = {
  period_certainty: false,
  acquisition_method: "acq:sale",
  purchasing_agent: {
    name: {
      token: "$AUTHORITY_TOKEN_1",
      string: "Bob Buyer",
      uri: "http://example.org/bob",
      certainty: false
    },
    birth: "1910-uu-uu",
    death: "1980-uu-uu",
    place: {
      token: "$AUTHORITY_TOKEN_3",
      string: "Pittsburgh, PA",
      uri: "http://example.org/pgh",
      certainty: true
    }
  },
  owner: {
    relationship: {
      name: {
        token: "$AUTHORITY_TOKEN_1",
        string: "Bob Buyer",
        uri: "http://example.org/bob",
        certainty: true
      },
      type: "son"
    },
    name: {
      token: "$AUTHORITY_TOKEN_2",
      string: "Owen Owner",
      uri: "http://example.org/owen",
      certainty: true
    },
    birth: "1920-uu-uu",
    death: "1990-uu-uu?",
    place: {
      token: "$AUTHORITY_TOKEN_4",
      string: "Boise, ID",
      uri: "http://example.org/boise",
      certainty: true
    }
  },
  event: {
    token: "$AUTHORITY_TOKEN_5",
    string: "Sale of Sales",
    uri: "http://example.org/sale",
    certainty: true
  },
  sellers_agent: {
    name: {
      token: "$AUTHORITY_TOKEN_6",
      string: "Gallery G",
      uri: "http://example.org/gallery",
      certainty: true
    },
    place: {
      token: "$AUTHORITY_TOKEN_7",
      string: "New York, NY",
      uri: "http://example.org/nyc",
      certainty: false
    }
  },
  transfer_location: {
    place: {
      token: "$AUTHORITY_TOKEN_8",
      string: "Miami, FL",
      uri: "http://example.org/miami",
      certainty: true
    }
  },
  timespan: {
    botb: "1982-01-05",
    eotb: "1982-02-uu",
    bote: "1999-uu-uu?",
    eote: "20uu-uu-uu"
  },
  stock_number: "lot no. 1",
  purchase: {
    value: "100000",
    currency_symbol: "$"
  },
  citations: ["Book of Books"],
  footnote: "Note a note.",
  direct_transfer: false,
  text:
    'Possibly purchased by Bob Buyer? [1910-1980], Pittsburgh, PA for Bob Buyer\'s son, Owen Owner [1920-1990?], Boise, ID, from "Sale of Sales", Gallery G, New York, NY?, in Miami, FL, sometime between Jan 5, 1982 and February 1982 until between 1999? and the 21st Century (lot no. 1, for $100,000)[a][1].'
};

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
    // Relationshiop type
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
