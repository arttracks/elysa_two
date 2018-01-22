<!-- ###################   HTML   ################### -->
<template>
  <div>
    <PageHeader />
    <ObjectSection />
    <Editor />
    <TimelineVisualization />
    <PageFooter />
  </div>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>
import ObjectSection from "./components/ObjectSection.vue";
import Editor from "./components/Editor.vue";
import TimelineVisualization from "./components/TimelineVisualization.vue";
import PageHeader from "./components/PageHeader.vue";
import PageFooter from "./components/PageFooter.vue";
import BulmaCustomization from "./assets/BulmaCustomization.scss";

export default {
  name: "app",
  components: {
    PageHeader,
    Editor,
    TimelineVisualization,
    PageFooter,
    ObjectSection
  }
};
</script>


<!-- ###################    CSS    ################### -->
<style lang="scss">
[v-cloak] {
  display: none;
}
</style>
