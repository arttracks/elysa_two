

<!-- ###################   HTML   ################### -->
<template>
  <div class="form-section">
    <h3>The New Owner</h3>
    <EntityLookup 
      label="Owner"
      placeholder="Owner's name"
      help="The verbatim name of the person who is taking ownership of the work."
    />


    <div class="field is-horizontal">
      <div class="field-label is-small">
        <label class="label">Life Dates</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow is-year">
          <div class="control">
            <input class="input is-small" type="text" placeholder="Birth year" />
            <p class="help">The year the owner was born.</p>
          </div>
        </div>
        <div class="field is-narrow">
          <p class="is-intermediate">—</p>
        </div>
        <div class="field is-narrow is-year">
          <div class="control">
            <input class="input is-small" type="text" placeholder="Death year" />
            <p class="help">The year the owner died.</p>
          </div>
        </div>
      </div>    
    </div>


    <EntityLookup 
      label="Assocated Location"
      placeholder="Owner's location"
      help="A location used to disambiguate this person from other people with similar names."
    />
    
   <EntityLookup 
      label="Buyer's Agent"
      placeholder="Buyer's agent"
      help="The person or organization aquiring the work on the behalf of the new owner."    
    />
    
    <EntityLookup 
      label="Relation to Prev. Owner"
      placeholder="Previous owner's name"
      :lookupList="relationships"
      help="Familial relationship between the previous and new owner."
    />

  </div>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>

import EntityLookup from "./EntityLookup.vue";

export default {
  props: [],
  data: function() {
    return {
      relationships: [
        "brother", 
        "sister", 
        "sibling", 
        "mother", 
        "father", 
        "parent", 
        "son", 
        "daughter", 
        "child", 
        "grandchild", 
        "grandparent", 
        "nephew", 
        "niece", 
        "uncle", 
        "aunt", 
        "husband", 
        "wife", 
        "spouse", 
        "relative" 
      ]
    }
  },
  components: {
    EntityLookup
  }
}
</script>


<!-- ###################    CSS    ################### -->
<style scoped lang="scss">
  .form-section .columns {
    margin-left: 8%
  }
  .is-year {
    flex-basis: 6rem
  }
</style>