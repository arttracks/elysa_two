<!-- ###################   HTML   ################### -->
<template>
  <nav class="navbar">
    <div class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <div class="control">
              <input id="showHelp" type="checkbox" name="showHelp" class="switch is-info is-rounded is-small" :checked="helpShown" @click.prevent="toggleHelp">
              <label for="showHelp">{{helpButtonText}}</label>
            </div>
            <div class="control">
              <input id="expandAll" type="checkbox" name="expandAll" class="switch is-info  is-rounded  is-small">
              <label for="expandAll">Expanded</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>
import { mapMutations, mapState } from "vuex";
import * as types from "../store/mutation-types.js";

export default {
  props: [],
  components: {},
  computed: {
    helpButtonText: function() {
      return this.helpShown ? "Help On" : "Help Off";
    },
    ...mapState({
      helpShown: state => state.editor_ui.helpShown
    })
  },
  methods: {
    ...mapMutations({ toggleHelp: types.TOGGLE_HELP })
  }
};
</script>


<!-- ###################    CSS    ################### -->
<style lang="scss">

</style>
