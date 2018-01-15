<!-- ###################   HTML   ################### -->
<template>
  <figure v-if="src" class="image">
    <img :src="src">
  </figure>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>
export default {
  props: ["src"]
};
</script>


<!-- ###################    CSS    ################### -->
<style scoped lang="scss">
figure {
  max-height: 250px;
  img {
    width: auto;
    height: 100%;
  }
}
</style>
