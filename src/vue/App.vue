<!-- ###################   HTML   ################### -->
<template>
  <div>
    <PageHeader />
    <ObjectMetadata tombstone-data="{title: 'Landscape with Table'}"/>
    <ProvenanceText />
    <ProvenanceEditor />
    <TimelineVisualization />
    <PageFooter />
  </div>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>

import ObjectMetadata from "./components/ObjectMetadata.vue";
import ProvenanceText from "./components/ProvenanceText.vue";
import ProvenanceEditor from "./components/ProvenanceEditor.vue";
import TimelineVisualization from "./components/TimelineVisualization.vue";
import PageHeader from "./components/PageHeader.vue";
import PageFooter from "./components/PageFooter.vue";

export default {
  name: 'app',
  props: ["entity"],
  components: {
    PageHeader,
    ObjectMetadata,
    ProvenanceText,
    ProvenanceEditor,
    TimelineVisualization,
    PageFooter
  }
}
</script>


<!-- ###################    CSS    ################### -->
<style lang="scss">
  [v-cloak] {
      display: none;
  }
</style>