

<!-- ###################   HTML   ################### -->
<template>
  <nav class="panel provenance-periods">
  <p class="panel-heading">
    Provenance Periods
  </p>

  <template v-for="(period,i) in periodsList" >
    <label 
      class="panel-block period" 
      :class="{'is-active': activePeriod == i}" 
      @click.prevent="selectPeriod(i)">
      {{period.value}}
      <a class="tag is-delete is-small" @click.stop="deletePeriod(i)"></a>
    </label>
    <div v-if="!period.direct && i!=(periodsList.length-1)" class="missing-block">(missing data)</div>
  </template>

  <div class="panel-block">
    <button class="button is-info is-fullwidth" @click.prevent="addPeriod">
      Add new period
    </button>
  </div>
</nav>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import * as types from "../store/mutation-types.js";

export default {
  props: [],
  components: {},
  computed: {
    ...mapState({
      activePeriod: state => state.editor_ui.activePeriod
    }),
    ...mapGetters(["periodsList"])
  },
  methods: {
    ...mapMutations({
      selectPeriod: types.SET_ACTIVE_PERIOD,
      addPeriod: types.ADD_NEW_PERIOD,
      deletePeriod: types.DELETE_PERIOD
    })
  }
};
</script>


<!-- ###################    CSS    ################### -->
<style scoped lang="scss">
.provenance-periods {
  background-color: white;
  margin-top: -12px;
}
.panel-block.is-active {
  font-weight: bold;
}
.tag.is-delete {
  margin-left: auto;
  visibility: hidden;
}
.panel-block:hover .tag {
  visibility: visible;
}

.missing-block {
  width: 100%;
  font-size: 0.75rem;
  background-color: whitesmoke;
  text-align: center;
  font-style: italic;
  padding: 0em 0.75em;
  margin-top: -1.5px;
  color: #aaa;
}
a.panel-block[disabled]:hover {
  cursor: inherit;
}
</style>
