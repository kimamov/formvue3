<template>
  <div v-if="shouldRender()">
    <child-dynamic-element
      v-for="element in elements"
      :element="element"
      :key="element.identifier"
      :formName="formName"
    />
  </div>
</template>

<script>
import DynamicElement from "../dynamic_element.vue";

function are(x, y, typeA, typeB) {
  const typeX = typeof x;
  const typeY = typeof y;

  return (typeX === typeA && typeY === typeB) || (typeX === typeB && typeY === typeA);
}

function boolval(x) {
  if (typeof x === 'string') return x.toLowerCase() === 'true';
  else return !!x;
}

export default {
  name: "ConditionalContent",
  components: {
    "child-dynamic-element": DynamicElement,
  },
  methods: {
    shouldRender() {
      const providedValue = this.properties.conditionValue;
      let conditionApplies = false;

      // boolean, string comparison
      if (are(providedValue, this.conditionalValue, 'boolean', 'string')) {
        conditionApplies = boolval(providedValue) === boolval(this.conditionalValue);
      }
      // number comparison
      else if (typeof providedValue === 'number' || typeof this.conditionalValue === 'number') {
        conditionApplies = Number(providedValue) === Number(this.conditionalValue);
      }
      // default comparison
      else {
        conditionApplies = providedValue === this.conditionalValue;
      }

      return !!this.properties.invertCondition ? !conditionApplies : conditionApplies;
    },
  },
  props: {
    conditionalValue: {
      type: String | Boolean | Number,
      required: true,
    },
    formName: {
      type: String,
      required: true,
    },
    identifier: {
      type: String,
      required: true,
    },
    properties: {
      type: Object | Array,
      required: true,
    },
    elements: {
      type: Array,
    },
  },
};
</script>
