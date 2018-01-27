<!-- ###################   HTML   ################### -->
<template>
  <div>    
    <EntityLookup 
      label="Sale Name"
      placeholder="The name of the sale"
      :value="saleEvent"
      :setter="updateEntity('event')"
      help="The verbatim name of the sale or auction."
    />
   
   <EntityLookup 
      label="Buyer's Agent"
      placeholder="Buyer's agent"
      :value="purchasingAgent ? purchasingAgent.name : undefined"
      :setter="updateEntity('purchasing_agent.name')"
      help="The person or organization aquiring the work on the behalf of the new owner."    
    />
    
    <EntityLookup 
              label="Seller's Agent"
              placeholder="The Seller's agent"
              :value="sellersAgent ? sellersAgent.name : undefined"
              :setter="updateEntity('sellers_agent.name')"
              help="The intermediary or auction house working on behalf of the seller."
            />

    <EditorElementLine label="Stock Number">
      <div class="field is-shorter">
        <div class="control">
          <input 
            class="input is-small" 
            type="text" 
            placeholder="Stock number" 
            :value="stockNumber"
            @input="setStockNumber"
          >
          <p class="help">The stock, auction, or inventory number associated with the sale.</p>
        </div>
      </div>
    </EditorElementLine>
    
    <EditorElementLine label="Purchase Amount">
      <div class="field has-addons is-shorter">
        <div class="control">
          <span class="select is-small">
            <select 
              name="purchasePriceCurrency"
              :value="purchasePrice ? purchasePrice.currency_symbol : undefined"
              @input="setPurchasePrice"
            >
              <option v-for="currency in currencies">
                  {{ currency }}
              </option>
            </select>
          </span>
        </div>
        <div class="control is-expanded">
          <input 
            class="input is-small" 
            type="text" 
            placeholder="Purchase price" 
            name="purchasePrice"
            :value="purchasePrice ? purchasePrice.value: undefined"
            @input="setPurchasePrice"
          >
        </div>
        <p class="help">The amount of the sale in a standard currency.</p>
      </div>
      <div class="field is-narrow">
        <p class='is-intermediate'>or</p>
      </div>
      <div class="field ">
        <div class="control">
          <input 
            class="input is-small" 
            type="text"
            name="purchasePriceDesc"
            placeholder="Purchase price description"
            :value="purchasePrice ? purchasePrice.string :undefined"
            @input="setPurchasePrice"
          >
          <p class="help">An amount that can't be expressed as a single number.</p>
        </div>
      </div>
    </EditorElementLine>
  </div>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>
import EntityLookup from "./EntityLookup.vue";
import EditorElementLine from "./EditorElementLine.vue";

export default {
  props: [
    "purchasingAgent",
    "updateEntity",
    "sellersAgent",
    "saleEvent",
    "stockNumber",
    "purchasePrice"
  ],
  methods: {
    setStockNumber: function(e) {
      const f = this.updateEntity("stock_number");
      f(e.target.value);
    },
    setPurchasePrice: function(e) {
      let obj = null;
      if (e.target.value === "") {
        obj = null;
      } else if (e.target.name === "purchasePriceDesc") {
        obj = {
          string: e.target.value
        };
      } else if (
        e.target.name === "purchasePrice" ||
        e.target.name === "purchasePriceCurrency"
      ) {
        const pp = document.body.querySelector("input[name='purchasePrice']");
        const ppc = document.body.querySelector(
          "select[name='purchasePriceCurrency']"
        );
        obj = {
          value: pp.value,
          currency_symbol: ppc.value
        };
      }
      const f = this.updateEntity("purchase");
      f(obj);
    }
  },
  data: function() {
    return {
      currencies: ["$", "ƒ", "£", "€", "¢", "¥", "₱"]
    };
  },
  components: {
    EntityLookup,
    EditorElementLine
  }
};
</script>


<!-- ###################    CSS    ################### -->
<style scoped lang="scss">

</style>
