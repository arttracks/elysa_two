<!-- ###################   HTML   ################### -->
<template>
  <div class="">
    <h2 class="title"> {{artworkTitle}}</h2>
    <div class="subtitle"> {{artistNames}} </div>
    <p class="is-size-7">
      <span class="field-labelx">Accession Number:</span> {{accessionNumbers}}
    </p>
  </div>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>
import { classified_as } from "../libs/LinkedArtHelpers.js";

export default {
  props: ["mmo"],
  computed: {
    artworkTitle: function() {
      const preferredTitle = classified_as(
        this.mmo.identified_by,
        "aat:300404670"
      );
      if (preferredTitle.length) {
        return preferredTitle[0].value;
      }
      return null;
    },

    artistNames: function() {
      const production = this.mmo.produced_by;
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
      const accessionNum = classified_as(
        this.mmo.identified_by,
        "aat:300312355"
      );
      if (accessionNum.length) {
        return accessionNum.map(num => num.value).join(", ");
      }
      return null;
    }
  }
};
</script>


<!-- ###################    CSS    ################### -->
<style scoped lang="scss">
  .field-labelx {
    color: #888;
  }
</style>