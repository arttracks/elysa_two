<!-- ###################   HTML   ################### -->
<template>
    <div class="field is-horizontal">
      <div class="field-label is-small">
        <label class="label">{{label}}</label>
      </div>
      <div class="field-body">
        <div class="field entity-input" :class="{ 'has-addons': lookupList.length}">

          <div v-if="lookupList.length" class="control">
            <span class="select is-small">
              <select>
                <option v-for="lookup in lookupList">
                    {{ lookup }}
                </option>
              </select>
            </span>
          </div>

          <div class="control">
            <input class="input is-small" type="text" :placeholder="placeholder">
            <p v-if="help" class="help">{{help}}</p>
          </div>

        </div>
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

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faLink from '@fortawesome/fontawesome-free-solid/faLink'
import faUnlink from '@fortawesome/fontawesome-free-solid/faUnlink'
import faEye from '@fortawesome/fontawesome-free-solid/faEye'
import faEyeSlash from '@fortawesome/fontawesome-free-solid/faEyeSlash'

export default {
  props: {
    "placeholder": {
      default: "Enter a search term",
      type: String
    },
    "label": {
      default: "",
      type: String
    },
    "help": {
      type: String
    },
    "lookupList": {
      type: Array,
      default: function() {return [];}
    }
  },
  computed: {
    internetIcon () {
      return faUnlink;
    },
    previewIcon () {
      return faEyeSlash;
    },
    lowercaseLabel () {
      return this.label.toLowerCase();
    }
  },
  components: {
    FontAwesomeIcon
  }
}
</script>


<!-- ###################    CSS    ################### -->
<style scoped lang="scss">
    .entity-input:not(.has-addons) {
      flex-basis: 50%;
    }
 
    .entity-input.has-addons {
    }
 
    .lod-input {
      flex-basis: 25%
    }
</style>