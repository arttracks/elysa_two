<!-- ###################   HTML   ################### -->
<template>
  <div class="provenance-text">
    <p>
      <span 
        v-for="(period, i) in periodTexts" 
        :class="{active: (activePeriod ===i)}"
        @click="selectPeriod(i)"
      >
        {{period}}
      </span> 
    </p>
    <div class='navbar'> 
      <div class="navbar-menu is-active">
        <div class="navbar-end">
          <div class="navbar-item">
            <button class="button is-small">Reset</button>
          </div>
          <div class="navbar-item">
            <button class="button is-small">Copy Provenance</button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>
import ProvenanceToString from "../libs/ProvenanceToString";
import { mapState, mapMutations } from "vuex";
import * as types from "../store/mutation-types.js";

export default {
  props: [],
  components: {},
  computed: {
    periodTexts: function() {
      let results = [];
      let footnotes = [];
      let citations = [];
      let prevEnding = null;
      for (const period of this.periods) {
        let prov = ProvenanceToString(period);

        // handle uppercasing lines preceded by a period.
        if (prevEnding == ".") {
          let firstLetter = prov.text.slice(0, 1);
          let rest = prov.text.slice(1);
          prov.text = firstLetter.toUpperCase() + rest;
        }
        prevEnding = prov.text.slice(-1);

        // Handle writing endnotes
        let endnotes = [];
        if (prov.footnote) {
          footnotes.push(prov.footnote);
          endnotes.push(`[${footnotes.length}]`);
        }
        if (prov.citations) {
          for (const citation of prov.citations) {
            citations.push(citation);
            endnotes.push(`[${String.fromCharCode(96 + citations.length)}]`);
          }
        }
        if (endnotes.length) {
          let lastLetter = prov.text.slice(-1);
          let rest = prov.text.slice(0, -1);
          prov.text = rest + " " + endnotes.join("") + lastLetter;
        }

        results.push(prov.text);
      }
      return results;
    },
    ...mapState({
      periods: state => state.provenance.periods,
      activePeriod: state => state.editor_ui.activePeriod
    })
  },
  methods: {
    ...mapMutations({
      selectPeriod: types.SET_ACTIVE_PERIOD
    })
  }
};
</script>


<!-- ###################    CSS    ################### -->
<style scoped lang="scss">
.provenance-text {
  margin-top: 1rem;
}
.active {
  color: black;
  background: #b9d4ec;
  padding: 2px 0;
  margin: -2px 0;
  display: inline-box;
}
</style>
