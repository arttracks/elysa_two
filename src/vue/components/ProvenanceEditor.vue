<!-- ###################   HTML   ################### -->
<template>
  <section class="section">
    <div class="container is-widescreen">
      <div class="columns">
        <div class="column is-one-quarter">
          <ProvenancePeriods />
        </div>
        <div class="column editing-area">
          <div class="form-section">
            <h3>Current Line</h3>
            <textarea class="textarea is-small" placeholder="Provenance entry" rows="2"></textarea>
          </div>
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

import ProvenancePeriods from "./ProvenancePeriods.vue"

import ProvenanceEditorTransfer from "./ProvenanceEditorTransfer.vue"
import ProvenanceEditorOwner    from "./ProvenanceEditorOwner.vue"
import ProvenanceEditorSaleData from "./ProvenanceEditorSaleData.vue"
import ProvenanceEditorFootnote from "./ProvenanceEditorFootnote.vue"
import ProvenanceEditorCitation from "./ProvenanceEditorCitation.vue"

export default {
  props: [],
  components: {
    ProvenancePeriods,
    ProvenanceEditorTransfer,
    ProvenanceEditorOwner,
    ProvenanceEditorSaleData,
    ProvenanceEditorFootnote,
    ProvenanceEditorCitation
  }
}
</script>


<!-- ###################    CSS    ################### -->
<style scoped lang="scss">
  @import "../assets/_DarkSection.scss";
  
  section {
    @include darkSection;
  }

  .editing-area {
    background-color: white;
    color: black
  }

  /deep/ .form-section {
    margin-bottom: 1.5rem;
    h3 {
      margin-bottom: 0.75rem;
      border-bottom: 1px solid #eee;
    }
    .is-intermediate {
      font-size: 75%;
      line-height: 200%
    }

    .help {
      display: none;
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

    .help {
      opacity: 0.8;
      color: #294866
    }

    .checkbox.is-small {
      font-size: .75rem;
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
      font-size: .75rem;
      font-weight: normal;
    }
  }

</style>