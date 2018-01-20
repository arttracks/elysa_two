import ProvenanceToString from "../../libs/ProvenanceToString";
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
