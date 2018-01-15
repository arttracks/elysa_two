

<!-- ###################   HTML   ################### -->
<template>
  <nav class="panel provenance-periods">
  <p class="panel-heading">
    Provenance Periods
  </p>
  <a class="panel-block ">
    Mary Cassatt
  </a>
  <a class="panel-block unknown" disabled>
    (missing data)
  </a>
  <a class="panel-block is-active">
    Galaries Durand-Ruel
  </a>
  <a class="panel-block">
    Durand-Ruel Galleries
  </a>
  <a class="panel-block">
    Carnegie Museum of Art
  </a>

  <div class="panel-block">
    <button class="button is-info is-fullwidth">
      Add new period
    </button>
  </div>
</nav>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>
export default {
  props: [],
  components: {}
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
a.panel-block.unknown {
  font-size: 0.75rem;
  background-color: whitesmoke;
  justify-content: center;
  font-style: italic;
  padding: 0em 0.75em;
  margin-top: -1.5px;
}
a.panel-block[disabled]:hover {
  cursor: inherit;
}
</style>
