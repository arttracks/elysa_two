

<!-- ###################   HTML   ################### -->
<template>
  <div >

    <!-- Verbatim Name -->
    <EntityLookup 
      class="person-name"
      label="Name"
      placeholder="Person's name"
      :value="person.name"
      :setter="wrappedUpdate('name')"
      help="The verbatim name of the person."
    />
    <template v-if="person.name.string.length">
      
      <!-- Life Dates -->
      <EditorElementLine label="Life Dates" class="life-dates inset">
        <div class="field is-narrow is-year">
          <div class="control">
            <input 
              v-model="birthYear"
              class="input is-small birth-year" 
              type="text" 
              placeholder="Birth year" 
            />
            <p class="help">The year the person was born.</p>
          </div>
        </div>
        <div class="field is-narrow">
          <p class="is-intermediate">—</p>
        </div>
        <div class="field is-narrow is-year">
          <div class="control">
            <input 
              v-model="deathYear"
              class="input is-small death-year" 
              type="text" 
              placeholder="Death year"
            />
            <p class="help">The year the person died.</p>
          </div>
        </div>
      </EditorElementLine>

      <!-- Associated Location -->
      <EntityLookup 
        class="associated-place inset"
        label="Assocated Location"
        placeholder="Person's location"
        :value="person.place"
        :setter="wrappedUpdate('place')"
        help="A location used to disambiguate this person from other people with similar names."
      />
      
      <!-- Related Persion -->
      <EntityLookup 
        class="related-person inset"
        label="Related Person"
        placeholder="Previous person's name"
        :lookupList="relationships"
        :lookupValue="person.relationship ? person.relationship.type : undefined"
        :lookupSetter="wrappedUpdate('relationship.type')"
        :value="person.relationship ? person.relationship.name : undefined"
        :setter="wrappedUpdate('relationship.name')"
        help="A family member of this person."
      />
    </template>
  </div>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>
import EntityLookup from "./EntityLookup.vue";
import EditorElementLine from "./EditorElementLine.vue";
import edtf from "edtf";

export default {
  props: ["person", "personField", "updateEntity"],
  computed: {
    birthYear: {
      get() {
        return this.person.birth
          ? edtf(this.person.birth.replace(/u/g, "X")).year
          : null;
      },
      set(value) {
        const date = edtf(`${value.padStart("4", "0")}-XX-XX`);
        this.wrappedUpdate("birth")(date.edtf);
      }
    },
    deathYear: {
      get() {
        return this.person.death
          ? edtf(this.person.death.replace(/u/g, "X")).year
          : null;
      },
      set(value) {
        const date = edtf(`${value.padStart("4", "0")}-XX-XX`);
        this.wrappedUpdate("death")(date.edtf);
      }
    }
  },
  methods: {
    wrappedUpdate: function(field) {
      const appendedField = `${this.personField}.${field}`;
      return this.updateEntity(appendedField);
    }
  },
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
    EntityLookup,
    EditorElementLine
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
