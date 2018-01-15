<!-- ###################   HTML   ################### -->
<template>
  <section class="section">
    <div class="container is-widescreen">
      I am TimelineVisualization
      and my data is
      <pre>{{}}</pre>
    </div>
  </section>
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
@import "../assets/_DarkSection.scss";

section {
  @include darkSection;
}
</style>
