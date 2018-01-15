<!-- ###################   HTML   ################### -->
<template>
    <div class="field is-horizontal">
      
      <!-- Lookup Label -->
      <div class="field-label is-small">
        <label class="label">{{label}}</label>
      </div>

      <div class="field-body">

        <!-- String entry field-->
        <div 
          class="field entity-input" 
          :class="{ 'has-addons': hasAddons}"
        >

          <!-- Lookup dropdown -->
          <div v-if="lookupList.length" class="control">
            <span class="select is-small">
              <select>
                <option v-for="lookup in lookupList">
                    {{ lookup }}
                </option>
              </select>
            </span>
          </div>

          <!-- String entry input -->
          <div 
            class="control is-expanded" >
            <input class="input is-small" type="text" :placeholder="placeholder" v-model="entityText">
            <p v-if="help" class="help">{{help}}</p>
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
            <input class="input is-small" type="text" placeholder="http(s)://" />
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
      </div>    
    </div>

</template>

<!-- ################### JAVACRIPT ################### -->
<script>
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faLink from "@fortawesome/fontawesome-free-solid/faLink";
import faUnlink from "@fortawesome/fontawesome-free-solid/faUnlink";
import faEye from "@fortawesome/fontawesome-free-solid/faEye";
import faEyeSlash from "@fortawesome/fontawesome-free-solid/faEyeSlash";
import faQuestion from "@fortawesome/fontawesome-free-solid/faQuestion";

export default {
  data: function() {
    return {
      isCertain: true,
      entityText: this.value
    };
  },

  props: {
    value: {
      type: String,
      default: ""
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
    entityText: function(newText, _) {
      this.isCertain = !newText.endsWith("?");
    },
    isCertain: function(newState, oldState) {
      if (newState === oldState) {
        return;
      }
      if (newState && this.entityText.endsWith("?")) {
        this.entityText = this.entityText.substr(0, this.entityText.length - 1);
      } else if (!newState && !this.entityText.endsWith("?")) {
        this.entityText = this.entityText + "?";
      }
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
      return this.label.toLowerCase();
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
      this.isCertain = !this.isCertain;
    }
  },

  components: {
    FontAwesomeIcon
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
