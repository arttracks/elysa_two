import { classified_as } from "../../libs/LinkedArtHelpers.js";

const state = {
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

// getters
const getters = {
  primaryImage: function() {
    const rep = state.representation;
    if (!Array.isArray(rep) || !rep.length) {
      return null;
    }
    return rep[0].id;
  },
  primaryTitle: function() {
    const preferredTitle = classified_as(state.identified_by, "aat:300404670");
    if (preferredTitle.length) {
      return preferredTitle[0].value;
    }
    return null;
  },
  artistNames: function() {
    const production = state.produced_by;
    if (
      production &&
      production.carried_out_by &&
      Array.isArray(production.carried_out_by) &&
      production.carried_out_by.length
    ) {
      return production.carried_out_by.map(person => person.label).join(", ");
    }
    return null;
  },
  accessionNumbers: function() {
    const accessionNum = classified_as(state.identified_by, "aat:300312355");
    if (accessionNum.length) {
      return accessionNum.map(num => num.value).join(", ");
    }
    return null;
  }
};

// actions
const actions = {
  // getAllProducts ({ commit }) {
  //   shop.getProducts(products => {
  //     commit(types.RECEIVE_PRODUCTS, { products })
  //   })
  // }
};

// mutations
const mutations = {
  // [types.RECEIVE_PRODUCTS] (state, { products }) {
  //   state.all = products
  // },
  // [types.ADD_TO_CART] (state, { id }) {
  //   state.all.find(product => product.id === id).inventory--
};

export default {
  state,
  getters,
  actions,
  mutations
};
