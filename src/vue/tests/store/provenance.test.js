import { getters } from "../../store/modules/provenance.js";

describe("Provenance Getters", () => {
  it("can get a list of periods", () => {
    const state = {
      periods: [
        {
          owner: {
            name: {
              string: "Mary Cassatt",
              certainty: true
            }
          },
          direct_transfer: false
        },
        {
          direct_transfer: true,
          owner: {
            name: {
              string: "Galeries Durand-Ruel",
              certainty: true
            },
            place: {
              string: "Paris, France",
              certainty: true
            }
          }
        }
      ]
    };
    const result = getters.periodsList(state);
    expect(result).toHaveLength(2);
    expect(result[0].value).toBe("Mary Cassatt");
    expect(result[0].direct).toBe(false);
    expect(result[1].value).toBe("Galeries Durand-Ruel");
    expect(result[1].direct).toBe(true);
  });
});
