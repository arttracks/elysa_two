

<!-- ###################   HTML   ################### -->
<template>
  <p>{{value}}</p>
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
