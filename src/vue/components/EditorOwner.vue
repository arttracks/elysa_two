

<!-- ###################   HTML   ################### -->
<template>
  <div >
    <EntityLookup 
      label="Owner"
      placeholder="Owner's name"
      :value="owner.name"
      :setter="updateEntity('owner.name')"
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
      :value="owner.place"
      :setter="updateEntity('owner.place')"
      help="A location used to disambiguate this person from other people with similar names."
    />
    

    <EntityLookup 
      label="Relation to Prev. Owner"
      placeholder="Previous owner's name"
      :lookupList="relationships"
      :lookupValue="owner.relationship ? owner.relationship.type : undefined"
      :lookupSetter="updateEntity('owner.relationship.type')"
      :value="owner.relationship ? owner.relationship.name : undefined"
      :setter="updateEntity('owner.relationship.name')"
      help="Familial relationship between the previous and new owner."
    />

  </div>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>
import EntityLookup from "./EntityLookup.vue";

export default {
  props: ["owner", "updateEntity"],
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
    };
  },
  components: {
    EntityLookup
  }
};
</script>


<!-- ###################    CSS    ################### -->
<style scoped lang="scss">
.form-section .columns {
  margin-left: 8%;
}
.is-year {
  flex-basis: 6rem;
}
</style>
