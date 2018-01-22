

<!-- ###################   HTML   ################### -->
<template>
  <div class="form-section">
    <h3>{{title}}</h3>
    <slot></slot>
  </div>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>
export default {
  props: ["title"]
};
</script>


<!-- ###################    CSS    ################### -->
<style scoped lang="scss">
.form-section {
  margin-bottom: 1.5rem;
}
h3 {
  margin-bottom: 0.75rem;
  border-bottom: 1px solid #eee;
}
</style>
