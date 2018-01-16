

<!-- ###################   HTML   ################### -->
<template>
  <nav class="panel provenance-periods">
  <p class="panel-heading">
    Provenance Periods
  </p>

  <draggable v-model='draggablePeriodsList'>
    <div v-for="period in draggablePeriodsList" >
      <label 
        class="panel-block period" 
        :class="{'is-active': activePeriod == period.index}" 
        @click.prevent="selectPeriod(period.index)">
        {{period.value}}
        <a class="tag is-delete is-small" @click.stop="deletePeriod(period.index)"></a>
      </label>
      <div 
        v-if="!period.direct && period.index!=(periodsList.length-1)" class="missing-block">
        (missing data)
      </div>
    </div>
  </draggable>
  <div class="panel-block">
    <button class="button is-info is-fullwidth" @click.prevent="addPeriod">
      Add new period
    </button>
  </div>
</nav>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>
import draggable from "vuedraggable";
import { mapGetters, mapState, mapMutations } from "vuex";
import * as types from "../store/mutation-types.js";

export default {
  props: [],
  components: { draggable },
  computed: {
    ...mapState({
      activePeriod: state => state.editor_ui.activePeriod
    }),
    ...mapGetters(["periodsList"]),
    draggablePeriodsList: {
      get() {
        return this.periodsList;
      },
      set(value) {
        let selectedPeriod = 0;
        const newOrder = value.map((v, i) => {
          if (v.index == this.activePeriod) {
            selectedPeriod = i;
          }
          return v.index;
        });

        this.reorderPeriods(newOrder);
        this.selectPeriod(selectedPeriod);
      }
    }
  },
  methods: {
    ...mapMutations({
      selectPeriod: types.SET_ACTIVE_PERIOD,
      addPeriod: types.ADD_NEW_PERIOD,
      deletePeriod: types.DELETE_PERIOD,
      reorderPeriods: types.REORDER_PERIODS
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
