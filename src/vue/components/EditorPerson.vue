

<!-- ###################   HTML   ################### -->
<template>
  <div class="person-wrapper">
    <!-- Verbatim Name -->
    <EntityLookup 
      class="person-name"
      :label="label"
      :placeholder="`${label}'s name`"
      :value="person ? person.name: undefined"
      :setter="wrappedUpdate('name')"
      :help="helpText"
    />

    <template v-if="person && person.name && person.name.string && person.name.string.length">
      
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
            <p class="help">The year the {{lowercaseLabel}} was born.</p>
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
            <p class="help">The year the {{lowercaseLabel}} died.</p>
          </div>
        </div>
      </EditorElementLine>

      <!-- Associated Location -->
      <EntityLookup 
        class="associated-place inset"
        label="Assocated Location"
        :placeholder="`${label}'s location`"
        :value="person.place"
        :setter="wrappedUpdate('place')"
        :help="`A location used to disambiguate the ${lowercaseLabel} from others with similar names.`"
      />
      
      <!-- Related Persion -->
      <EntityLookup 
        v-if="!noRelated"
        class="related-person inset"
        label="Related Person"
        placeholder="related person's name"
        :lookupList="relationships"
        :lookupValue="person.relationship ? person.relationship.type : undefined"
        :lookupSetter="wrappedUpdate('relationship.type')"
        :value="person.relationship ? person.relationship.name : undefined"
        :setter="wrappedUpdate('relationship.name')"
        :help="`A family member of the ${lowercaseLabel}.`"
      />
    </template>
  </div>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>
import EntityLookup from "./EntityLookup.vue";
import EditorElementLine from "./EditorElementLine.vue";
import relationshipJSON from "../../data/relationships.json";
import Aggregation from "../libs/Aggregation.js";
import edtf from "edtf";

export default {
  props: {
    label: String,
    person: Object,
    help: String,
    personField: String,
    updateEntity: Function,
    noRelated: Boolean
  },
  computed: {
    helpText: function() {
      if (this.help) {
        return this.help;
      }
      return `The verbatim name of the ${this.lowercaseLabel}.`;
    },
    birthYear: {
      get() {
        return this.person && this.person.birth
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
        return this.person && this.person.death
          ? edtf(this.person.death.replace(/u/g, "X")).year
          : null;
      },
      set(value) {
        const date = edtf(`${value.padStart("4", "0")}-XX-XX`);
        this.wrappedUpdate("death")(date.edtf);
      }
    },
    lowercaseLabel: function() {
      if (this.label) {
        return this.label.toLowerCase();
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
    const relationships = new Aggregation(relationshipJSON, {
      langs: "en"
    });
    return {
      relationships: relationships.getList().map(r => {
        return { label: r.prefLabel, value: r.keyword };
      })
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
.person-wrapper:not(:last-child) {
  margin-bottom: 0.75rem;
}
</style>
