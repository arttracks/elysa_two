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
            <button class="button is-small">Copy Provenance</button>

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

export default {
  props: [],
  components: {},
  computed: {
    ...mapGetters(["periodsAsText", "footnotes", "citations", "authorities"]),
    ...mapState({
      periods: state => state.provenance.periods,
      activePeriod: state => state.editorInterface.activePeriod
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
