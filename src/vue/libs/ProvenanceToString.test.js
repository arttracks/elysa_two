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
  });
});
