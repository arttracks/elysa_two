import { getters, mutations } from "./mmo.js";
import * as types from "../mutation-types.js";

describe("E22 Man-Made Objects", () => {
  let state = null;
  beforeEach(() => {
    state = {
      label: "Young Woman Picking Fruit",
      identified_by: [
        {
          type: "Name",
          value: "Young Woman Picking Fruit",
          classified_as: [
            { id: "aat:300404670", label: "preferred terms", type: "Type" }
          ]
        },
        {
          type: "Identifier",
          value: "22.8",
          classified_as: [
            { id: "aat:300312355", label: "accession numbers", type: "Type" }
          ]
        }
      ],
      produced_by: {
        type: "Production",
        label: "Production of Young Women Picking Fruit",
        carried_out_by: [
          {
            type: "Person",
            label: "Mary Cassatt"
          }
        ]
      },
      representation: [
        {
          type: "VisualItem",
          id:
            "http://collection.cmoa.org/CollectionImage.aspx?irn=148520&size=Large",
          label: "Young Women Picking Fruit",
          classified_as: [
            { id: "aat:300215302", label: "digital images", type: "Type" }
          ],
          format: "image/jpeg"
        }
      ]
    };
  });

  //----------------------------------------------------------------------------
  describe("Primary Image", () => {
    it("finds a primary image", () => {
      const image = getters.primaryImage(state);
      expect(image).toEqual(
        "http://collection.cmoa.org/CollectionImage.aspx?irn=148520&size=Large"
      );
    });

    it("returns null without a primary image", () => {
      state.representation.shift();
      const image = getters.primaryImage(state);
      expect(image).toBeNull();
    });
    it("returns the first if there are multiple primary images", () => {
      state.representation.unshift({
        type: "VisualItem",
        id: "http://example.com/image"
      });
      const image = getters.primaryImage(state);
      expect(image).toEqual("http://example.com/image");
    });
  });

  //----------------------------------------------------------------------------
  describe("Primary Title", () => {
    it("finds a primary title", () => {
      const title = getters.primaryTitle(state);
      expect(title).toEqual("Young Woman Picking Fruit");
    });

    it("returns null without a primary title", () => {
      state.identified_by.shift();
      const title = getters.primaryTitle(state);
      expect(title).toBeNull();
    });
    it("returns the first if there are multiple primary titles", () => {
      state.identified_by.unshift({
        type: "Name",
        value: "Fake Title",
        classified_as: [
          { id: "aat:300404670", label: "preferred terms", type: "Type" }
        ]
      });
      const title = getters.primaryTitle(state);
      expect(title).toEqual("Fake Title");
    });
  });

  //----------------------------------------------------------------------------
  describe("Artist Name", () => {
    it("finds artist names", () => {
      const names = getters.artistNames(state);
      expect(names).toEqual("Mary Cassatt");
    });

    it("returns null without a artist name", () => {
      state.produced_by.carried_out_by.shift();
      const names = getters.artistNames(state);
      expect(names).toBeNull();
    });
    it("returns artist names joined by commas if there are multiple in a production", () => {
      state.produced_by.carried_out_by.unshift({
        type: "Person",
        label: "Fake Name"
      });
      const names = getters.artistNames(state);
      expect(names).toEqual("Fake Name, Mary Cassatt");
    });
  });

  //----------------------------------------------------------------------------
  describe("Accession Numbers", () => {
    it("finds a accession number", () => {
      const accessionNumbers = getters.accessionNumbers(state);
      expect(accessionNumbers).toEqual("22.8");
    });

    it("returns null without a accession number", () => {
      state.identified_by.pop();
      const accessionNumbers = getters.accessionNumbers(state);
      expect(accessionNumbers).toBeNull();
    });
    it("returns accession numbers joined by commas if there are multiple", () => {
      state.identified_by.unshift({
        type: "Name",
        value: "Fake Number",
        classified_as: [
          { id: "aat:300312355", label: "accession numbers", type: "Type" }
        ]
      });
      const accessionNumbers = getters.accessionNumbers(state);
      expect(accessionNumbers).toEqual("Fake Number, 22.8");
    });
  });
});
