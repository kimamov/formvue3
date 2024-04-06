<template>
  <div :class="['fieldset', identifier? identifier : '']">
    <child-dynamic-element
        v-for="element in elements"
        :element="{ ...element }"
        :key="element.identifier"
        :formName="formName"
    />
  </div>
</template>

<script>
import {DynamicElement} from "formvue-json";

export default {
  name: "NotEmptyCondition",
  components: {
    "child-dynamic-element": DynamicElement,
  },
  props: {
    properties: {
      type: Object | Array,
      required: true,
    },
    elements: {
      type: Array,
    },
    formName: {
      type: String,
      required: true,
    },
    identifier: {
      type: String
    }
  },

};
</script>
