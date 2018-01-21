

<!-- ###################   HTML   ################### -->
<template>
  <div class="form-section">
    <h3>Footnote</h3>
    <textarea 
      :value="value"
      @input="setter"
      class="textarea is-small" 
      placeholder="Additional information about this period" 
      rows="4"
    ></textarea>
  </div>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>
export default {
  props: ["setter", "value"]
};
</script>


<!-- ###################    CSS    ################### -->
<style lang="scss">

</style>
