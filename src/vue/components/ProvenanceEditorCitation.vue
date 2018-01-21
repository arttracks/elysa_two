

<!-- ###################   HTML   ################### -->
<template>
  <div class="form-section" id="citations">
    <h3>Citations</h3>
    <template v-for="(citation) in values">
      <input 
        class="input is-small" 
        @input="updateCitations"
        :value="citation" >
    </template>
    <input 
      class="input is-small" id="blank-citation-field" 
      @input="updateCitations"
      placeholder="Citation or source" >
  </div>
</template>

<!-- ################### JAVACRIPT ################### -->
<script>
export default {
  data: function() {
    return {
      lastUpdatedText: null
    };
  },
  props: ["values", "setter"],
  components: {},
  updated: function() {
    const inputs = document.body.querySelectorAll("#citations input");
    if (inputs.length == 1) {
      inputs[0].focus();
    } else {
      for (const i of inputs) {
        if (i.value === this.lastUpdatedText) {
          i.focus();
        }
      }
    }
  },
  methods: {
    updateCitations: function(e) {
      const matches = document.body.querySelectorAll("#citations input");
      let values = [];
      for (const m of matches) {
        if (m.value.length) {
          values.push(m.value);
        }
      }
      this.setter(values);
      document.getElementById("blank-citation-field").value = "";
      this.lastUpdatedText = e.data;
    }
  }
};
</script>


<!-- ###################    CSS    ################### -->
<style lang="scss">

</style>
