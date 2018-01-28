<!-- ###################   HTML   ################### -->
<template>
  <div class="field is-horizontal" :class="{inset: inset}">
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
  props: { label: String, inset: { type: Boolean, default: false } }
};
</script>


<!-- ###################    CSS    ################### -->
<style scoped lang="scss">
.inset {
  margin-left: 3.5%;
}
</style>
