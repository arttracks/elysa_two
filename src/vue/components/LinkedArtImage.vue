<!-- ###################   HTML   ################### -->
<template>
  <figure v-if="primaryImage" class="image">
    <img :src="primaryImage">
  </figure>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>

export default {
  props: ["representation"],
  computed: {
    primaryImage: function() {
      const rep = this.representation;
      if (!Array.isArray(rep) || !rep.length) {return null};
      return rep[0].id
    }
  }
}
</script>


<!-- ###################    CSS    ################### -->
<style scoped lang="scss">
  img {
    width: 200px;
  }
</style>