<!-- ###################   HTML   ################### -->
<template>
  <div class="form-section">
    <h3>Auction or Sale Information</h3>
    
    <EntityLookup 
      label="Sale Name"
      placeholder="The name of the sale"
      help="The verbatim name of the sale or auction."
    />

    <EntityLookup 
              label="Seller's Agent"
              placeholder="The Seller's agent"
              help="The intermediary or auction house working on behalf of the seller."
            />

    <div class="field is-horizontal">
      <div class="field-label is-small ">
        <label class="label">Stock Number</label>
      </div>
      <div class="field-body">
        <div class="field is-shorter">
          <div class="control">
            <input class="input is-small" type="text" placeholder="Stock number">
            <p class="help">The stock, auction, or inventory number associated with the sale.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-small">
        <label class="label">Purchase Amount</label>
      </div>
      <div class="field-body">
        <div class="field has-addons is-shorter">
          <div class="control">
            <span class="select is-small">
              <select>
                <option v-for="currency in currencies">
                    {{ currency }}
                </option>
              </select>
            </span>
          </div>
          <div class="control is-expanded">
            <input class="input is-small" type="text" placeholder="Purchase price">
          </div>
          <p class="help">The amount of the sale in a standard currency.</p>
        </div>
        <div class="field is-narrow">
          <p class='is-intermediate'>or</p>
        </div>
        <div class="field ">
          <div class="control">
            <input class="input is-small" type="text" placeholder="Purchase price description">
            <p class="help">An amount that can't be expressed as a single number.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>
import EntityLookup from "./EntityLookup.vue";

export default {
  props: [],
  data: function() {
    return {
      currencies: ["$", "ƒ", "£", "€", "¢", "¥", "₱"]
    };
  },
  components: {
    EntityLookup
  }
};
</script>


<!-- ###################    CSS    ################### -->
<style scoped lang="scss">

</style>
