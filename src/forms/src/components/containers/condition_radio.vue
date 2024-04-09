<template>
  <div>
    <OnRadioGroup
        v-bind="$attrs"
        v-on="$listeners"
        v-model="inputValue"
        :identifier="identifier"
        :formName="formName"
        :properties="properties"
    />
    <child-dynamic-element
        v-for="element in elements"
        :element="{ conditionalValue: inputValue, ...element }"
        :key="element.identifier"
        :formName="formName"
    />
  </div>
</template>

<script>
import OnRadioGroup from '../fields/composed/radio_group.vue';
import DynamicElement from "../dynamic_element.vue";

export default {
  name: "ConditionRadio",
  components: {
    "child-dynamic-element": DynamicElement,
    OnRadioGroup: OnRadioGroup
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
