const state = {
  periods: [
    {
      period_certainty: true,
      owner: {
        name: {
          string: "Mary Cassatt",
          certainty: true
        },
        birth: "1844-uu-uu",
        death: "1926-uu-uu"
      },
      timespan: null,
      direct_transfer: true
    },
    {
      period_certainty: true,
      owner: {
        name: {
          string: "Galeries Durand-Ruel",
          certainty: true
        },
        place: {
          string: "Paris, France",
          certainty: true
        }
      },
      timespan: {
        eotb: "1892-08-uu"
      },
      footnote: "Recorded in stock book in August 1892 ",
      direct_transfer: true
    },
    {
      period_certainty: true,
      owner: {
        name: {
          string: "Durand-Ruel Galleries",
          certainty: true
        },
        place: {
          string: "New York, NY",
          certainty: true
        }
      },
      timespan: {
        botb: "1895-uu-uu",
        eotb: "1895-uu-uu"
      },
      direct_transfer: true
    },
    {
      period_certainty: true,
      acquisition_method: "acq:sale",
      owner: {
        name: {
          string: "Museum",
          certainty: true
        }
      },
      timespan: {
        botb: "1922-10-uu",
        eotb: "1922-10-uu"
      },
      footnote: "Updated by CGK July 2012.",
      direct_transfer: false
    }
  ]
};

