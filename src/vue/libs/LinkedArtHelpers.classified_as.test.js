import { classifiedAs } from ".//LinkedArtHelpers.js";
describe("classifiedAs", () => {
  const sampleData = {
    identified_by: [
      {
        type: "Name",
        value: "Young Woman Picking Fruit",
        classified_as: [
          { id: "aat:300404670", label: "preferred terms", type: "Type" }
        ]
      }
    ],
    without_classified_id: [
      {
        type: "Name",
        value: "Young Woman Picking Fruit",
        classified_as: [{ label: "preferred terms", type: "Type" }]
      }
    ],
    no_array_identified_by: {
      type: "Name",
      value: "Young Woman Picking Fruit",
      classified_as: [
        { id: "aat:300404670", label: "preferred terms", type: "Type" }
      ]
    },
    multi_identified_by: [
      {
        type: "Name",
        value: "Young Woman Picking Fruit",
        classified_as: [
          { id: "aat:300404670", label: "preferred terms", type: "Type" },
          { id: "aat:300404671", label: "mispreferred terms", type: "Type" }
        ]
      }
    ],
    two_identified_by: [
      {
        type: "Name",
        value: "Young Woman Picking Fruit",
        classified_as: [
          { id: "aat:300404670", label: "preferred terms", type: "Type" }
        ]
      },
      {
        type: "Name",
        value: "Young Women Plucking Fruit",
        classified_as: [
          { id: "aat:300404670", label: "preferred terms", type: "Type" }
        ]
      }
    ],
    only_one_identified_by: [
      {
        type: "Name",
        value: "Young Woman Picking Fruit",
        classified_as: [
          { id: "aat:300404670", label: "preferred terms", type: "Type" }
        ]
      },
      {
        type: "Name",
        value: "Young Women Plucking Fruit",
        classified_as: [
          { id: "aat:300404671", label: "un-preferred terms", type: "Type" }
        ]
      }
    ],
    object_identified_by: [
      {
        type: "Name",
        value: "Young Woman Picking Fruit",
        classified_as: {
          id: "aat:300404670",
          label: "preferred terms",
          type: "Type"
        }
      }
    ],
    string_identified_by: [
      {
        type: "Name",
        value: "Young Woman Picking Fruit",
        classified_as: "aat:300404670"
      }
    ],
    no_classification_identified_by: [
      {
        type: "Name",
        value: "Young Woman Picking Fruit"
      }
    ]
  };

  test("it works with arrays of resources", () => {
    const results = classifiedAs(sampleData.identified_by, "aat:300404670");
    expect(results).toHaveLength(1);
    expect(results[0].value).toBe("Young Woman Picking Fruit");
  });

  test("It also works with single objects", () => {
    const results = classifiedAs(
      sampleData.no_array_identified_by,
      "aat:300404670"
    );
    expect(results).toHaveLength(1);
    expect(results[0].value).toBe("Young Woman Picking Fruit");
  });

  test("processes valid data with multiple classifications", () => {
    const results = classifiedAs(
      sampleData.multi_identified_by,
      "aat:300404670"
    );
    expect(results).toHaveLength(1);
    expect(results[0].value).toBe("Young Woman Picking Fruit");
  });

  test("returns all if there are multiple correct entries", () => {
    const results = classifiedAs(sampleData.two_identified_by, "aat:300404670");
    expect(results).toHaveLength(2);
    expect(results[0].value).toBe("Young Woman Picking Fruit");
    expect(results[1].value).toBe("Young Women Plucking Fruit");
  });

  test("only returns the correct one if there are multiples", () => {
    const results = classifiedAs(
      sampleData.only_one_identified_by,
      "aat:300404670"
    );
    expect(results).toHaveLength(1);
    expect(results[0].value).toBe("Young Woman Picking Fruit");
  });

  test("returns an empty array with a missing classification", () => {
    const results = classifiedAs(
      sampleData.no_classification_identified_by,
      "aat:300404670"
    );
    expect(results).toHaveLength(0);
  });

  test("It does not work with string classifications", () => {
    const results = classifiedAs(
      sampleData.string_identified_by,
      "aat:300404670"
    );
    expect(results).toHaveLength(0);
  });

  test("It does not work with object classifications", () => {
    const results = classifiedAs(
      sampleData.object_identified_by,
      "aat:300404670"
    );
    expect(results).toHaveLength(0);
  });

  test("It returns an empty array with an invalid classification", () => {
    const results = classifiedAs(sampleData.identified_by, "aat:not_an_id");
    expect(results).toHaveLength(0);
  });
  test("It returns an empty array with classifications without ids", () => {
    const results = classifiedAs(sampleData.identified_by, "aat:not_an_id");
    expect(results).toHaveLength(0);
  });
  test("It returns an empty array for missing data", () => {
    const results = classifiedAs(null, "aat:300404670");
    expect(results).toHaveLength(0);
  });
  test("It returns an empty array for missing classifications", () => {
    const results = classifiedAs(sampleData.without_classified_id, null);
    expect(results).toHaveLength(0);
  });
});
