

<!-- ###################   HTML   ################### -->
<template>
  <div class="form-section">
    <h3>The Transfer</h3>
    <div class="field is-horizontal">
      <div class="field-label is-small">
        <label class="label">Aquisition Method</label>
      </div>
      <div class="field-body">
        <div class="field is-shorter">
          <div class="control">
            <div class="select is-small">
              <select >
                <option>Aquisition Method</option>
                <option>With options</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field is-narrow is-narrow">
          <div class="control">
            <label class="checkbox is-small">
              <input type="checkbox">
             Direct Transfer?
            </label>
          </div>
        </div>
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox is-small">
              <input type="checkbox">
              Period Uncertain?
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-small ">
        <label class="label">Date</label>
      </div>
      <div class="field-body">
        <div class="field is-shorter">
          <div class="control">
            <input class="input is-small" type="text" placeholder="Date string">
            <p class="help">The interval of ownership or custody associated with this acquisition.</p>
          </div>
        </div>
      </div>
    </div>

    <EntityLookup 
      label="Transfer Location"
      placeholder="Location of the transfer"
      help="The physical location where the transfer took place."
    />
  </div>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>
import EntityLookup from "./EntityLookup.vue";

export default {
  props: [],
  components: {
    EntityLookup
  }
}
</script>


<!-- ###################    CSS    ################### -->
<style lang="scss">

</style>

