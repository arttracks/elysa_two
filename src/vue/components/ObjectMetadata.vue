<!-- ###################   HTML   ################### -->
<template>
  <div class="">
    <h2 class="title"> {{primaryTitle}}</h2>
    <div class="subtitle"> {{artistNames}} </div>
    <p class="is-size-7">
      <span class="field-label">Accession Number:</span> {{accessionNumbers}}
    </p>
  </div>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>
export default {
  props: ["primaryTitle", "artistNames", "accessionNumbers"]
};
</script>


<!-- ###################    CSS    ################### -->
<style scoped lang="scss">
.field-label {
  color: #888;
}
</style>
