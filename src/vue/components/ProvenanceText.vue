<!-- ###################   HTML   ################### -->
<template>
  <div class="provenance-text">
    <p>
      <span 
        v-for="(period, i) in periodsAsText" 
        :class="{active: (activePeriod ===i)}"
        @click="selectPeriod(i)"
      >
        {{period}}
      </span> 
    </p>

    <!-- Footnote block -->
    <template  v-if="footnotes.length">
      <p>Notes:</p>
      <p>
        <ol>
          <li 
            v-for="(note) in footnotes" 
            class="footnote"
            @click="selectPeriod(note.periodIndex)"
          >
            <span :class="{active: (activePeriod ===note.periodIndex)}">
              {{note.text}}
          </span>
          </li>
        </ol> 
      </p>
    </template>

    <!-- Authority block -->
    <template  v-if="authorities.length">
      <p>Authorities:</p>
      <p>
        <table>
          <tr
            v-for="(authority) in authorities" 
            class="footnote"
            @click="selectPeriod(authority.periodIndex)"
            :class="{active: (activePeriod ===authority.periodIndex)}"
          >
            <td>
              {{authority.text}}:
            </td>
            <td>
              <a v-if="authority.uri" :href="authority.uri">{{authority.uri}}</a>
              <span v-else class="has-text-weight-light">no records found.</span>
            </td>
          </tr>
        </table>
      </p>
    </template>

    <!-- Citation block -->
    <template  v-if="citations.length">
      <p>Citations:</p>
      <p>
        <ol>
          <li 
            v-for="(note) in citations" 
            class="footnote"
            @click="selectPeriod(note.periodIndex)"
          >
            <span :class="{active: (activePeriod ===note.periodIndex)}">
              {{note.text}}
          </span>
          </li>
        </ol> 
      </p>
    </template>
   
    <div class='navbar'> 
      <div class="navbar-menu is-active">
        <div class="navbar-end">
          <div class="navbar-item">
            <button class="button is-small">Reset</button>
          </div>
          <div class="navbar-item">
            <button 
              id="copy-button"
              class="button is-small"
            >Copy Provenance</button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import * as types from "../store/mutation-types.js";
import Clipboard from "clipboard";

export default {
  props: [],
  components: {},
  mounted: function() {
    let clipboard = new Clipboard("#copy-button", {
      text: this.fullText
    });
    clipboard.on("success", function(e) {
      let oldText = e.trigger.innerHTML;
      e.trigger.innerHTML = "Sent to Clipboard";
      setTimeout(() => (e.trigger.innerHTML = oldText), 1500);
    });
  },
  computed: {
    ...mapGetters(["periodsAsText", "footnotes", "citations", "authorities"]),
    ...mapState({
      activePeriod: state => state.editorInterface.activePeriod
    })
  },
  methods: {
    ...mapMutations({
      selectPeriod: types.SET_ACTIVE_PERIOD
    }),
    generateAuthorities: function(authorityList) {
      let maxLength = 0;
      authorityList.forEach(a => {
        if (a.text.length > maxLength) {
          maxLength = a.text.length;
        }
      });
      const names = authorityList.map(
        a =>
          `${a.text}:`.padEnd(maxLength + 2) +
          (a.uri ? a.uri : "no records found.")
      );
      return `\n\nAuthorities:\n\n${names.join("\n")}`;
    },
    fullText: function() {
      let str = this.periodsAsText.join(" ");
      if (this.footnotes.length) {
        str += `\n\nNotes:\n\n${this.footnotes.map(f => f.text).join("\n")}`;
      }
      if (this.authorities.length) {
        str += this.generateAuthorities(this.authorities);
      }
      if (this.citations.length) {
        str += `\n\nCitations:\n\n${this.citations
          .map(c => c.text)
          .join("\n")}`;
      }
      return str;
    }
  }
};
</script>


<!-- ###################    CSS    ################### -->
<style scoped lang="scss">
.provenance-text {
  margin-top: 0.75rem;
  border-top: 1px solid #eee;
  p {
    margin-top: 0.75rem;
  }
}
.active {
  color: black;
  box-shadow: 0px 0px 10px 2px rgba(185, 212, 236, 0.35);
  padding: 0px 0;
  margin: -2px 0;
  background: rgba(185, 212, 236, 0.35);
  border-radius: 4px;
}
.footnote {
  list-style: none;
}
td {
  padding-right: 1em;
}
</style>
