

<!-- ###################   HTML   ################### -->
<template>
  <nav class="panel provenance-periods">
  <p class="panel-heading">
    Provenance Periods
  </p>

  <template v-for="(period,i) in periodsList" >
    <a class="panel-block period" :class="{'is-active': activePeriod == i}">
      {{period.value}}
    </a>
    <div v-if="!period.direct && i!=(periodsList.length-1)" class="missing-block">(missing data)</div>
  </template>

  <div class="panel-block">
    <button class="button is-info is-fullwidth">
      Add new period
    </button>
  </div>
</nav>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>
import { mapGetters, mapState } from "vuex";

export default {
  props: [],
  components: {},
  computed: {
    ...mapState({
      activePeriod: state => state.editor_ui.activePeriod
    }),
    ...mapGetters(["periodsList"])
  }
};
</script>


<!-- ###################    CSS    ################### -->
<style scoped lang="scss">
.period {
  flex-wrap: wrap;
}

.provenance-periods {
  background-color: white;
  margin-top: -12px;
}
.panel-block.is-active {
  font-weight: bold;
}
.missing-block {
  width: 100%;
  font-size: 0.75rem;
  background-color: whitesmoke;
  text-align: center;
  font-style: italic;
  padding: 0em 0.75em;
  margin-top: -1.5px;
  cursor: inherit;
  color: black;
}
a.panel-block[disabled]:hover {
  cursor: inherit;
}
</style>
