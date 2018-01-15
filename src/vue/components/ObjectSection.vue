

<!-- ###################   HTML   ################### -->
<template>
  <section class="section">
      <div class="container is-widescreen">
        <div class="columns">
          <div class="column is-one-quarter">
            <LinkedArtImage :src="primaryImage" />
          </div>
          <div class="column">
            <ObjectMetadata 
              :primaryTitle="primaryTitle"
              :artistNames="artistNames"
              :accessionNumbers="accessionNumbers"
            />
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

import { mapGetters } from "vuex";

export default {
  props: ["mmo"],
  components: {
    LinkedArtImage,
    ObjectMetadata,
    ProvenanceText
  },
  computed: {
    ...mapGetters([
      "primaryImage",
      "primaryTitle",
      "artistNames",
      "accessionNumbers"
    ])
  }
};
</script>


<!-- ###################    CSS    ################### -->
<style scoped lang="scss">

</style>
