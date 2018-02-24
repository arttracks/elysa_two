import ProvenanceToString from "./ProvenanceToString";

describe("ProvenanceToString", () => {
  let data = {};
  beforeEach(() => {
    data = {
      owner: {
        name: {
          string: "Mary Cassatt",
          certainty: true
        }
      },
      direct_transfer: false
    };
  });

  // ----------------------------------------------------------------------------
  describe("Authorities", () => {
    var testEntity;
    beforeEach(() => {
      testEntity = {
        string: "Testy Test",
        certainty: "true"
      };
    });
    it("has a authorities section", () => {
      const result = ProvenanceToString(data);
      expect(result.authorities).toBeDefined();
    });
    it("creates authorities for strings without URLS", () => {
      const result = ProvenanceToString(data);
      expect(result.authorities).toHaveLength(1);
      expect(result.authorities[0].text).toBe("Mary Cassatt");
      expect(result.authorities[0].url).not.toBeDefined();
    });
    it("creates authorities for strings with URLS", () => {
      data.owner.name.uri = "http://example.com";
      const result = ProvenanceToString(data);
      expect(result.authorities).toHaveLength(1);
      expect(result.authorities[0].text).toBe("Mary Cassatt");
      expect(result.authorities[0].uri).toBe("http://example.com");
    });
    it("creates authorities for places related to people", () => {
      data.owner.place = { string: "Null Island" };
      const result = ProvenanceToString(data);
      expect(result.authorities).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ text: "Null Island" })
        ])
      );
    });
    it("creates authorities for places related to people", () => {
      data.transfer_location = { place: { string: "Null Island" } };
      const result = ProvenanceToString(data);
      expect(result.authorities).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ text: "Null Island" })
        ])
      );
    });
    it("creates authorities for people related to people", () => {
      data.owner.relationship = { name: { string: "Friendy mcFriend" } };
      const result = ProvenanceToString(data);
      expect(result.authorities).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ text: "Friendy mcFriend" })
        ])
      );
    });
    it("detects nested places for relationships", () => {
      data.owner.relationship = {
        place: { string: "Friend's House" },
        name: { string: "Friendy mcFriend" }
      };
      const result = ProvenanceToString(data);
      expect(result.authorities).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ text: "Friend's House" })
        ])
      );
    });
    it("creates authorities for events", () => {
      data.event = { string: "Fun Event" };
      const result = ProvenanceToString(data);
      expect(result.authorities).toEqual(
        expect.arrayContaining([expect.objectContaining({ text: "Fun Event" })])
      );
    });
    it("creates authorities for purchasing_agents", () => {
      data.purchasing_agent = { name: testEntity };
      const result = ProvenanceToString(data);
      expect(result.authorities).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ text: "Testy Test" })
        ])
      );
    });
    it("creates authorities for purchasing_agents", () => {
      data.sellers_agent = { name: testEntity };
      const result = ProvenanceToString(data);
      expect(result.authorities).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ text: "Testy Test" })
        ])
      );
    });
  });

  // ----------------------------------------------------------------------------
  describe("Named Events", () => {
    beforeEach(() => {
      data.event = {
        string: "Sale of Sales",
        certainty: true
      };
    });
    it("handles named events", () => {
      const result = ProvenanceToString(data);
      expect(result.text).toContain('from "Sale of Sales"');
    });
    it("handles undertain named events", () => {
      data.event.certainty = false;
      const result = ProvenanceToString(data);
      expect(result.text).toContain('from "Sale of Sales"?');
    });
    it("handles named events with sellers agents", () => {
      data.sellers_agent = {
        name: {
          string: "Gallery G",
          certainty: true
        },
        place: {
          string: "New York, NY",
          certainty: false
        }
      };
      const result = ProvenanceToString(data);
      expect(result.text).toContain(
        'from "Sale of Sales", Gallery G, New York, NY?'
      );
    });

    it("handles named events with only sellers agents", () => {
      delete data.event;
      data.sellers_agent = {
        name: {
          string: "Gallery G",
          certainty: true
        },
        place: {
          string: "New York, NY",
          certainty: false
        }
      };
      const result = ProvenanceToString(data);
      expect(result.text).toContain("from Gallery G, New York, NY?");
    });

    it("handles false positives", () => {
      data.event = {};
      data.sellers_agent = {};
      const result = ProvenanceToString(data);
      expect(result.text).not.toContain("from");
    });
  });

  // ----------------------------------------------------------------------------
  describe("Purchasing Agents", () => {
    it("handles Purchasing Agents", () => {
      data.purchasing_agent = {
        name: {
          string: "Bob Buyer",
          certainty: true
        }
      };
      const result = ProvenanceToString(data);
      expect(result.text).toContain("Bob Buyer for Mary Cassatt");
    });
    it("handles uncertain transfer locations", () => {
      data.transfer_location = {
        place: {
          string: "London, England",
          certainty: false
        }
      };
      const result = ProvenanceToString(data);
      expect(result.text).toContain("in London, England?.");
    });
  });

  // ----------------------------------------------------------------------------
  describe("dates", () => {
    it("does nothing without date elements", () => {
      data.timespan = {};
      const result = ProvenanceToString(data);
      expect(result.text).toBe("Mary Cassatt.");
    });

    it("does nothing with blank date elements", () => {
      data.timespan = {
        botb: null,
        eotb: null,
        bote: null,
        eote: null
      };
      const result = ProvenanceToString(data);
      expect(result.text).toBe("Mary Cassatt.");
    });

    it("does nothing with invalid date elements", () => {
      data.timespan = {
        botb: "not a date",
        eotb: null,
        bote: null,
        eote: null
      };
      const result = ProvenanceToString(data);
      expect(result.text).toBe("Mary Cassatt.");
    });

    it("handles basic dates", () => {
      data.timespan = {
        botb: "1980-02-14",
        eotb: "1980-02-14",
        bote: null,
        eote: null
      };
      const result = ProvenanceToString(data);
      expect(result.text).toContain(", February 14, 1980");
    });
    it("handles basic dates BCE", () => {
      data.timespan = {
        botb: "-1980-02-14",
        eotb: "-1980-02-14",
        bote: null,
        eote: null
      };
      const result = ProvenanceToString(data);
      expect(result.text).toContain(", February 14, 1980 BCE");
    });
    it("handles basic dates", () => {
      data.timespan = {
        botb: "1980-02-14",
        eotb: "1980-02-14",
        bote: null,
        eote: null
      };
      const result = ProvenanceToString(data);
      expect(result.text).toContain(", February 14, 1980");
    });
    it("handles uncertain basic dates", () => {
      data.timespan = {
        botb: "-1980-02-14?",
        eotb: "-1980-02-14?",
        bote: null,
        eote: null
      };
      const result = ProvenanceToString(data);
      expect(result.text).toContain(", February 14, 1980?");
    });

    it("handles 'throughout 1980'", () => {
      data.timespan = {
        botb: null,
        eotb: "1980",
        bote: "1980",
        eote: null
      };
      const result = ProvenanceToString(data);
      expect(result.text).toContain("throughout 1980");
    });
    it("handles throughout, until case", () => {
      data.timespan = {
        botb: null,
        eotb: "1980",
        bote: "1980",
        eote: "1990"
      };
      const result = ProvenanceToString(data);
      expect(result.text).toContain(
        ", throughout 1980 until no later than 1990"
      );
    });
    it("handles 'on' case", () => {
      data.timespan = {
        botb: "1980-02-14",
        eotb: "1980-02-14",
        bote: "1980-02-14",
        eote: "1980-02-14"
      };
      const result = ProvenanceToString(data);
      expect(result.text).toContain(", on February 14, 1980");
    });

    it("handles basic until dates", () => {
      data.timespan = {
        botb: null,
        eotb: null,
        bote: "1980-02-14",
        eote: "1980-02-14"
      };
      const result = ProvenanceToString(data);
      expect(result.text).toContain(", until February 14, 1980");
    });
    it("handles botb dates", () => {
      data.timespan = {
        botb: "1980-02-14",
        eotb: null,
        bote: null,
        eote: null
      };
      const result = ProvenanceToString(data);
      expect(result.text).toContain(", after February 14, 1980");
    });
    it("handles eotb dates", () => {
      data.timespan = {
        botb: null,
        eotb: "1980-02-14",
        bote: null,
        eote: null
      };
      const result = ProvenanceToString(data);
      expect(result.text).toContain(", by February 14, 1980");
    });
    it("handles bote dates", () => {
      data.timespan = {
        botb: null,
        eotb: null,
        bote: "1980-02-14",
        eote: null
      };
      const result = ProvenanceToString(data);
      expect(result.text).toContain(", until at least February 14, 1980");
    });
    it("handles eote dates", () => {
      data.timespan = {
        botb: null,
        eotb: null,
        bote: null,
        eote: "1980-02-14"
      };
      const result = ProvenanceToString(data);
      expect(result.text).toContain(", until no later than February 14, 1980");
    });
    it("handles botb & eotb dates", () => {
      data.timespan = {
        botb: "1980-02-14",
        eotb: "1990",
        bote: null,
        eote: null
      };
      const result = ProvenanceToString(data);
      expect(result.text).toContain(
        ", sometime between February 14, 1980 and 1990"
      );
    });
    it("handles bote & eote dates", () => {
      data.timespan = {
        botb: null,
        eotb: null,
        bote: "1980-02-14",
        eote: "1990"
      };
      const result = ProvenanceToString(data);
      expect(result.text).toContain(
        ", until sometime between February 14, 1980 and 1990"
      );
    });
    it("handles decades", () => {
      data.timespan = {
        botb: "198",
        eotb: "198",
        bote: null,
        eote: null
      };
      const result = ProvenanceToString(data);
      expect(result.text).toContain(", the 1980s");
    });
    it("handles centuries", () => {
      data.timespan = {
        botb: "19",
        eotb: "19",
        bote: null,
        eote: null
      };
      const result = ProvenanceToString(data);
      expect(result.text).toContain(", the 20th Century");
    });
    it("handles centuries BCE", () => {
      data.timespan = {
        botb: "-01",
        eotb: "-01",
        bote: null,
        eote: null
      };
      const result = ProvenanceToString(data);
      expect(result.text).toContain(", the 1st Century BCE");
    });
    it("handles the zeroth Century", () => {
      data.timespan = {
        botb: "00",
        eotb: "00",
        bote: null,
        eote: null
      };
      const result = ProvenanceToString(data);
      expect(result.text).toContain(", the 1st Century");
    });
  });

  // ----------------------------------------------------------------------------
  describe("in PLACE", () => {
    it("handles transfer locations", () => {
      data.transfer_location = {
        place: {
          string: "London, England",
          certainty: true
        }
      };
      const result = ProvenanceToString(data);
      expect(result.text).toContain("in London, England.");
    });
    it("handles uncertain transfer locations", () => {
      data.transfer_location = {
        place: {
          string: "London, England",
          certainty: false
        }
      };
      const result = ProvenanceToString(data);
      expect(result.text).toContain("in London, England?.");
    });
  });
  describe("global uncertainty", () => {
    it("starts with possibly for uncertain", () => {
      data.period_certainty = false;
      const result = ProvenanceToString(data);
      expect(result.text).toMatch(/^possibly /);
    });
    it("it does not start with possibly for certain", () => {
      data.period_certainty = true;
      const result = ProvenanceToString(data);
      expect(result.text).not.toMatch(/^possibly /);
    });
  });
  describe("sales and lot numbers", () => {
    it("handles stock numbers", () => {
      data.stock_number = "stock no. 1";
      const result = ProvenanceToString(data);
      expect(result.text).toContain("(stock no. 1)");
    });
    it("handles purchase amoounts", () => {
      data.purchase = { value: 100000, currency_symbol: "$" };
      const result = ProvenanceToString(data);
      expect(result.text).toContain("(for $100,000)");
    });
    it("handles both", () => {
      data.stock_number = "stock no. 1";
      data.purchase = { value: 100000, currency_symbol: "$" };
      const result = ProvenanceToString(data);
      expect(result.text).toContain("(stock no. 1, for $100,000)");
    });
    it("does not display when there's a blank value", () => {
      data.stock_number = "stock no. 1";
      data.purchase = { value: "", currency_symbol: "$" };
      const result = ProvenanceToString(data);
      expect(result.text).toContain("(stock no. 1)");
    });
    it("does not display when there's only a currency_symbol", () => {
      data.stock_number = "stock no. 1";
      data.purchase = { currency_symbol: "$" };
      const result = ProvenanceToString(data);
      expect(result.text).toContain("(stock no. 1)");
    });
  });
});
