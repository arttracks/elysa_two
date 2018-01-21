

<!-- ###################   HTML   ################### -->
<template>
  <div class="form-section">
    <h3>Current Line</h3>
    <p>{{value}}</p>
  </div>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>
export default {
  props: ["value"]
};
</script>


<!-- ###################    CSS    ################### -->
<style scoped lang="scss">
p {
  color: #555;
  font-size: 90%;
  padding: 0.5em 2em;
}
</style>
