const state = {
  label: "Young Woman Picking Fruit",
  "identified_by": [
      {
        "type": "Name", 
        "value": "Young Woman Picking Fruit", 
        "classified_as": [
          {"id": "aat:300404670", "label": "preferred terms", "type": "Type"}
        ]
      },
      {
        "type": "Identifier", 
        "value": "22.8", 
        "classified_as": [{"id":"aat:300312355", "label": "accession numbers", "type": "Type"}]
      }, 
    ], 
  "produced_by": {
    "type": "Production", 
    "label": "Production of Young Women Picking Fruit", 
    "carried_out_by": [
      {
        "type": "Person", 
        "label": "Mary Cassatt"
      }
    ]
  },
  "representation": [
    {
      "type": "VisualItem", 
      "id": "http://collection.cmoa.org/CollectionImage.aspx?irn=148520&size=Large", 
      "label": "Young Women Picking Fruit", 
      "classified_as": [{id: "aat:300215302", "label": "digital images", "type": "Type"}], 
      "format": "image/jpeg"
    }
  ]
}


// getters
const getters = {
  // allProducts: state => state.all
}

// actions
const actions = {
  // getAllProducts ({ commit }) {
  //   shop.getProducts(products => {
  //     commit(types.RECEIVE_PRODUCTS, { products })
  //   })
  // }
}

// mutations
const mutations = {
  // [types.RECEIVE_PRODUCTS] (state, { products }) {
  //   state.all = products
  // },

  // [types.ADD_TO_CART] (state, { id }) {
  //   state.all.find(product => product.id === id).inventory--
}


export default {
  state,
  getters,
  actions,
  mutations
}