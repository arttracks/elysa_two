<!-- ###################   HTML   ################### -->
<template>
  <div class="field is-horizontal">
    <div v-if="label" class="field-label is-small ">
      <label class="label">{{label}}</label>
    </div>
    <div class="field-body">
      <slot></slot>
    </div>
  </div>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>
export default {
  props: ["label"]
};
</script>


<!-- ###################    CSS    ################### -->
<style scoped lang="scss">

</style>
