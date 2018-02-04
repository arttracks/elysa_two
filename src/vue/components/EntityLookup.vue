<!-- ###################   HTML   ################### -->
<template>
  <EditorElementLine :label="label">
    
    <!-- String entry field-->
    <div 
      class="field entity-input" 
      :class="{ 'has-addons': hasAddons}"
    >


      <!-- String entry input -->
      <div 
        class="control is-expanded" >
        <input 
          class="input is-small entity-text" 
          type="text" 
          :placeholder="placeholder" 
          v-model="entityText"
          @input="updateEntity"
        >
        <p v-if="help" class="help">{{help}}</p>
      </div>


      <!-- Lookup dropdown -->
      <div v-if="lookupList.length" class="control">
        <span class="select is-small">
          <select
            @change="setLookup"
            >
            <option :selected="!lookupValue" value >relationship type</option>
            <option 
              v-for="lookup in lookupList" 
              :value="lookup.value"
              :selected="lookupValue == lookup.value"

            >
                {{ lookup.value }}
            </option>
          </select>
        </span>
      </div>

      <!-- Certainty button -->
      <div 
        v-if="certaintyEnabled" 
        class="control certainty-button" 
        :class="[isCertain ? 'inactive' : '']"
      >
        <button class="button is-small" @click="toggleCertainty" :disabled="entityText.length ==0">
          <span  class="icon is-small is-right">
             <font-awesome-icon :icon="certainIcon" />
          </span>
        </button>
    </div>
  </div>

  <!-- URL entry field -->
  <div class="field has-addons lod-input">
    <div class="control has-icons-right is-expanded">
      <input 
        class="input is-small" 
        type="text" 
        placeholder="http(s)://" 
        :value="entityUri"
        />
      <span class="icon is-right">
        <font-awesome-icon :icon="internetIcon" />
      </span>
      <p class="help">URL for {{lowercaseLabel}}.</p>
    </div>
    <div class="control">
      <a class="button is-small is-info" disabled>
        <font-awesome-icon :icon="previewIcon" />
      </a>
    </div>
  </div>

  </EditorElementLine>

</template>

<!-- ################### JAVACRIPT ################### -->
<script>
import EditorElementLine from "./EditorElementLine.vue";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faLink from "@fortawesome/fontawesome-free-solid/faLink";
import faUnlink from "@fortawesome/fontawesome-free-solid/faUnlink";
import faEye from "@fortawesome/fontawesome-free-solid/faEye";
import faEyeSlash from "@fortawesome/fontawesome-free-solid/faEyeSlash";
import faQuestion from "@fortawesome/fontawesome-free-solid/faQuestion";

export default {
  data: function() {
    return {
      isCertain: this.value.certainty,
      entityText: this.value.string,
      entityUri: this.value.uri
    };
  },

  props: {
    value: {
      type: Object,
      default: function() {
        return {
          certainty: true,
          string: "",
          uri: ""
        };
      }
    },
    lookupSetter: {
      type: Function
    },
    lookupValue: {
      type: String,
      default: ""
    },
    setter: {
      type: Function
    },
    placeholder: {
      default: "Enter a search term",
      type: String
    },
    label: {
      default: "",
      type: String
    },
    help: {
      type: String
    },
    lookupList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    certaintyEnabled: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    value: function(newValue, _) {
      this.entityText = `${newValue.string}${newValue.certainty ? "" : "?"}`;
      this.isCertain = newValue.certainty;
      this.entityUri = newValue.uri;
    }
  },

  computed: {
    internetIcon() {
      return faUnlink;
    },
    previewIcon() {
      return faEyeSlash;
    },
    certainIcon() {
      return faQuestion;
    },
    lowercaseLabel() {
      if (this.label) {
        return this.label.toLowerCase();
      }
    },
    hasAddons() {
      return this.lookupList.length || this.certaintyEnabled;
    }
  },

  methods: {
    toggleCertainty: function() {
      if (this.entityText.length == 0) {
        return;
      }
      if (this.entityText.endsWith("?")) {
        this.entityText = this.entityText.substr(0, this.entityText.length - 1);
      } else {
        this.entityText = this.entityText + "?";
      }
      this.updateEntity();
    },
    setLookup: function(e) {
      this.lookupSetter(e.target.value);
    },
    updateEntity: function() {
      let text = this.entityText;
      if (text.endsWith("??")) {
        text = text.replace(/\?+/, "");
      }
      if (text.endsWith("?")) {
        text = text.substr(0, text.length - 1);
        this.isCertain = false;
      } else {
        this.isCertain = true;
      }
      text = text.replace(/\?+/, "");
      const data = {
        string: text,
        certainty: this.isCertain,
        uri: this.uri
      };
      this.setter(data);
    }
  },

  components: {
    FontAwesomeIcon,
    EditorElementLine
  }
};
</script>


<!-- ###################    CSS    ################### -->
<style scoped lang="scss">
.entity-input {
  flex-basis: 50%;
}

.lod-input {
  flex-basis: 25%;
}

.certainty-button.inactive .button {
  color: #d9d9d9;
}
.certainty-button .button {
  padding-left: 0.5em;
  padding-right: 0.5em;
}
</style>
