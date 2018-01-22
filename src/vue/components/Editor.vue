<!-- ###################   HTML   ################### -->
<template>
  <section class="section" :class="{'is-helpful': helpShown}">
    <div class="container is-widescreen">
      <div class="columns">
        <div class="column is-one-quarter">
          <ProvenancePeriods />
        </div>
        <div class="column editing-area">
          <EditorHeader />

          <EditorElement title="Current Line">
            <EditorLineDisplay :value="periodsAsText[period]" />
          </EditorElement>


          <EditorElement title="The Transfer">
            <EditorTransfer 
              :transferSetter="setDirectTransfer"
              :transferValue="datum(period,'direct_transfer')"
              :certaintySetter="setPeriodCertainty"
              :certaintyValue="!datum(period,'period_certainty')"
            />
          </EditorElement>

          <EditorElement title="New Owner">
            <EditorOwner />
          </EditorElement>
  
          <EditorElement title="Sale or Auction information">
            <EditorSaleData />
          </EditorElement>

          <EditorElement title="Footnotes">
            <EditorFootnote 
              :setter="setFootnote" 
              :value="datum(period,'footnote')"
            />
          </EditorElement>
          
          <EditorElement title="Citations">
            <EditorCitation
              :setter="setCitations" 
              :values="datum(period,'citations')"
            />
          </EditorElement>
          
        </div>
      </div>
    </div>
  </section>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>
import ProvenancePeriods from "./ProvenancePeriods.vue";
import EditorHeader from "./EditorHeader.vue";
import EditorLineDisplay from "./EditorLineDisplay.vue";
import EditorTransfer from "./EditorTransfer.vue";
import EditorOwner from "./EditorOwner.vue";
import EditorSaleData from "./EditorSaleData.vue";
import EditorFootnote from "./EditorFootnote.vue";
import EditorCitation from "./EditorCitation.vue";
import EditorElement from "./EditorElement";

import { mapMutations, mapState, mapGetters } from "vuex";
import * as types from "../store/mutation-types.js";

export default {
  props: [],
  computed: {
    ...mapGetters(["datum", "periodsAsText"]),
    ...mapState({
      period: state => state.editor_ui.activePeriod,
      helpShown: state => state.editor_ui.helpShown,
      allProvenance: state => state.provenance
    })
  },
  methods: {
    setPeriodCertainty(e) {
      this.commitProperty({
        period: this.period,
        property: "period_certainty",
        value: !e.target.checked
      });
    },
    setDirectTransfer(e) {
      this.commitProperty({
        period: this.period,
        property: "direct_transfer",
        value: e.target.checked
      });
    },
    setFootnote(e) {
      this.commitProperty({
        period: this.period,
        property: "footnote",
        value: e.target.value
      });
    },
    setCitations(values) {
      this.commitProperty({
        period: this.period,
        property: "citations",
        value: values
      });
    },
    ...mapMutations({
      commitProperty: types.SET_PERIOD_PROPERTY
    })
  },
  components: {
    ProvenancePeriods,
    EditorHeader,
    EditorLineDisplay,
    EditorTransfer,
    EditorOwner,
    EditorSaleData,
    EditorFootnote,
    EditorCitation,
    EditorElement
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
  .is-intermediate {
    font-size: 75%;
    line-height: 200%;
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
