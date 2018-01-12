<!-- ###################   HTML   ################### -->
<template>
  <div>
    <PageHeader />
    <ObjectSection :mmo="manMadeObject" />
    <ProvenanceEditor />
    <TimelineVisualization />
    <PageFooter />
  </div>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>

import ObjectSection from "./components/ObjectSection.vue";
import ProvenanceEditor from "./components/ProvenanceEditor.vue";
import TimelineVisualization from "./components/TimelineVisualization.vue";
import PageHeader from "./components/PageHeader.vue";
import PageFooter from "./components/PageFooter.vue";
import BulmaCustomization from "./assets/BulmaCustomization.scss"

export default {
  name: 'app',
  data: function() {
    return {
      "manMadeObject": {
        label: "Young Woman Picking Fruit",
        "identified_by": [
            {
              "type": "Name", 
              "value": "Young Woman Picking Fruit", 
              "classified_as": [
                {"id": "aat:300404670", "label": "preferred terms", "type": "Type"}
              ]
            },
            {
              "type": "Identifier", 
              "value": "22.8", 
              "classified_as": [
                {"id":"aat:300312355", "label": "accession numbers", "type": "Type"}
              ]
            }, 
          ], 
        "produced_by": {
          "type": "Production", 
          "label": "Production of Young Women Picking Fruit", 
          "carried_out_by": [
            {
              "type": "Person", 
              "label": "Mary Cassatt"
            }
          ]
        },
        "representation": [
            {
              "id": "http://collection.cmoa.org/CollectionImage.aspx?irn=148520&size=Large", 
              "type": "VisualItem", 
              "label": "Young Women Picking Fruit", 
              "classified_as": ["aat:300215302"], 
                    "format": "image/jpeg"
            }
          ]
      }
    }
  },
  props: ["entity"],
  components: {
    PageHeader,
    ProvenanceEditor,
    TimelineVisualization,
    PageFooter,
    ObjectSection
  }
}
</script>


<!-- ###################    CSS    ################### -->
<style lang="scss">
  [v-cloak] {
      display: none;
  }
</style>