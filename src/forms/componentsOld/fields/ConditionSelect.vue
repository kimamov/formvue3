<template>
  <div class="fv-condition-select">
    <OnSelect
        v-bind="$attrs"
        v-on="$listeners"
        v-model="inputValue"
        :identifier="identifier"
        :formName="formName"
        :properties="properties"
    />
    <child-dynamic-element
        v-for="element in elements"
        :element="{ ...element, conditionalValue: inputValue  }"
        :key="element.identifier"
        :formName="formName"
		:conditionalValue="inputValue"
    />
  </div>
</template>

<script>
import {DynamicElement, OnSelect} from "formvue-json";

export default {
  name: "ConditionSelect",
  components: {
    "child-dynamic-element": DynamicElement,
    OnSelect: OnSelect
  },
  props: {
    formName: {
      type: String,
      required: true,
    },
    identifier: {
      type: String,
      required: true,
    },
    elements: {
      type: Array,
    },
    properties: {
      type: Object | Array,
      required: true,
    },
  },

  computed: {
    inputValue: {
      get() {
        return this.$store.getters.getCurrentInputValue(this.identifier) || "";
      },
      set(value) {
        this.$store.commit("updateInputValue", { key: this.identifier, value: value });
      },
    },
  },
};
</script>
