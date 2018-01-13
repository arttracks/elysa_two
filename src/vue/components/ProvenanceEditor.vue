<!-- ###################   HTML   ################### -->
<template>
  <section class="section">
    <div class="container is-widescreen">
      <div class="columns">
        <div class="column is-one-quarter">
        </div>
        <div class="column editing-area">
          <div class="form-section">
            <h3>Current Text</h3>
            <textarea class="textarea is-small" placeholder="10 lines of textarea" rows="2"></textarea>
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

import EntityLookup from "./EntityLookup.vue";
import ProvenanceEditorTransfer from "./ProvenanceEditorTransfer.vue"
import ProvenanceEditorOwner    from "./ProvenanceEditorOwner.vue"
import ProvenanceEditorSaleData from "./ProvenanceEditorSaleData.vue"
import ProvenanceEditorFootnote from "./ProvenanceEditorFootnote.vue"
import ProvenanceEditorCitation from "./ProvenanceEditorCitation.vue"

export default {
  props: [],
  components: {
    EntityLookup,
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
  
    .field-label.is-small .label {
      font-size: .75rem;
      font-weight: normal;
    }
  }

</style>