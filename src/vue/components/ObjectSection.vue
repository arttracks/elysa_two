

<!-- ###################   HTML   ################### -->
<template>
  <section class="section">
      <div class="container is-widescreen">
        <div class="columns">
          <div class="column is-one-quarter">
            <LinkedArtImage :representation="mmo.representation" />
          </div>
          <div class="column">
            <ObjectMetadata :mmo="mmo"/>
            <ProvenanceText />
          </div>
        </div>
      </div>
    </section>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>
import LinkedArtImage from "./LinkedArtImage.vue";
import ObjectMetadata from "./ObjectMetadata.vue";
import ProvenanceText from "./ProvenanceText.vue";

export default {
  props: ["mmo"],
  components: {
    LinkedArtImage,
    ObjectMetadata,
    ProvenanceText
  }
}
</script>


<!-- ###################    CSS    ################### -->
<style scoped lang="scss">

</style>