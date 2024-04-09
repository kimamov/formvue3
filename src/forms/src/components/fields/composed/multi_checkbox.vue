<template>
  <OnMultiCheckboxBase
      v-bind="$attrs"
      :properties="properties"
      :identifier="identifier"

      :required="isRequired"
      :requiredLabel="requiredLabel"
      :errorMessages="inputError"
      :rules="inputRules"
      v-model="inputValue"
  />
</template>
<script lang="ts">
import 'reflect-metadata' // infer vue prop type validation by ts-definition; import this before vue-property-decorator!
import OnMultiCheckboxBase from "../base/multi_checkbox/multi_checkbox.vue";
import {createInputRules, createRequiredLabel, isRequired} from "@/lib/util";
import {Component, Prop} from "vue-property-decorator";
import {ElementProperties, InputValidator} from "@/lib/FormDefinition";
import {mixins} from "vue-class-component";
import InputValueMixin from "@/components/mixin/InputValueMixin";

@Component<OnMultiCheckbox>({
  name: "OnMultiCheckbox",
  components: {
    OnMultiCheckboxBase: OnMultiCheckboxBase
  }
})
export default class OnMultiCheckbox extends mixins(InputValueMixin) {
  @Prop({
    default: () => []
  })
  readonly validators!: InputValidator[]

  @Prop()
  readonly properties!: ElementProperties

  @Prop()
  readonly identifier!: string

  get isRequired() {
    return isRequired(this.properties);
  }

  get requiredLabel() {
    return createRequiredLabel(this.validators);
  }

  get inputRules() {
    return createInputRules(this.isRequired, this.validators, this.properties);
  }

  get inputValue() {
    const currentInputValue = this.$store.getters.getCurrentInputValue(this.identifier);
    return Array.isArray(currentInputValue) ? currentInputValue : (this.value || []);
  }

  set inputValue(value: any) {
    this.$store.commit("updateInputValue", {
      key: this.identifier,
      value: value
    });
  }

  get inputError() {
    return this.$store.getters.getCurrentInputError(this.identifier) || "";
  }

  created() {
    // support array default option
    const defaultValue = this.$store.getters.getCurrentInputValue(this.identifier);
    if (typeof defaultValue === 'string') {

      // manipulate store directly
      this.$store.commit("updateInputValue", {
        key: this.identifier,
        value: defaultValue.split(',')
      });
    }
  }
};
</script>
