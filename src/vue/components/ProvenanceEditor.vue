<!-- ###################   HTML   ################### -->
<template>
  <section class="section" :class="{'is-helpful': helpShown}">
    <div class="container is-widescreen">
      <div class="columns">
        <div class="column is-one-quarter">
          <ProvenancePeriods />
        </div>
        <div class="column editing-area">
          <ProvenanceEditorHeader />
          <ProvenanceEditorLineDisplay />
          <ProvenanceEditorTransfer />
          <ProvenanceEditorOwner />
          <ProvenanceEditorSaleData />
          <ProvenanceEditorFootnote />
          <ProvenanceEditorCitation />
        </div>
      </div>
    </div>
  </section>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>
import ProvenancePeriods from "./ProvenancePeriods.vue";
import ProvenanceEditorHeader from "./ProvenanceEditorHeader.vue";
import ProvenanceEditorLineDisplay from "./ProvenanceEditorLineDisplay.vue";
import ProvenanceEditorTransfer from "./ProvenanceEditorTransfer.vue";
import ProvenanceEditorOwner from "./ProvenanceEditorOwner.vue";
import ProvenanceEditorSaleData from "./ProvenanceEditorSaleData.vue";
import ProvenanceEditorFootnote from "./ProvenanceEditorFootnote.vue";
import ProvenanceEditorCitation from "./ProvenanceEditorCitation.vue";

import { mapMutations, mapState } from "vuex";
import * as types from "../store/mutation-types.js";

export default {
  props: [],
  computed: {
    ...mapState({
      helpShown: state => state.editor_ui.helpShown,
      allProvenance: state => state.provenance
    })
  },
  components: {
    ProvenancePeriods,
    ProvenanceEditorHeader,
    ProvenanceEditorLineDisplay,
    ProvenanceEditorTransfer,
    ProvenanceEditorOwner,
    ProvenanceEditorSaleData,
    ProvenanceEditorFootnote,
    ProvenanceEditorCitation
  }
};
</script>


<!-- ###################    CSS    ################### -->
<style scoped lang="scss">
@import "../assets/_DarkSection.scss";

section {
  @include darkSection;
}

.editing-area {
  background-color: white;
  color: black;
}

/deep/ .form-section {
  margin-bottom: 1.5rem;
  h3 {
    margin-bottom: 0.75rem;
    border-bottom: 1px solid #eee;
  }
  .is-intermediate {
    font-size: 75%;
    line-height: 200%;
  }

  .columns {
    margin-bottom: 0;
  }

  .field .help {
    width: 100%;
  }

  .field.has-addons {
    flex-wrap: wrap;
  }

  .checkbox.is-small {
    font-size: 0.75rem;
  }

  .field-body .is-shorter {
    flex-basis: 61.5%;
    flex-grow: 0;
    .select {
      width: 100%;
      select {
        width: 100%;
      }
    }
  }

  .field-label.is-small .label {
    font-size: 0.75rem;
    font-weight: normal;
  }
}
</style>

<style lang="scss">
.help {
  max-height: 0px;
  overflow-y: hidden;
  opacity: 0;
  color: #294866;
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}
.is-helpful .help {
  opacity: 0.8;
  max-height: 2rem;
}
</style>
