<template>
  <on-autocomplete-base
      v-bind="{...$attrs, ...customProps}"
      v-on="$listeners"
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
import OnAutocompleteBase from "../base/autocomplete/autocomplete.vue";
import {createInputRules, createRequiredLabel, isRequired,} from "@/lib/util";
import {Component, Inject, Prop} from "vue-property-decorator";
import {mixins} from "vue-class-component";
import InputValueMixin from "@/components/mixin/InputValueMixin";
import {ElementProperties, InputValidator} from "@/lib/FormDefinition";
import {ValidatorMap} from "@/lib/validators";

@Component<OnAutocomplete>({
  name: "OnAutocomplete",
  components: {
    OnAutocompleteBase: OnAutocompleteBase,
  },
})
export default class OnAutocomplete extends mixins(InputValueMixin) {
  @Prop({
    default: () => []
  })
  readonly validators!: InputValidator[]

  @Prop()
  readonly properties!: ElementProperties

  @Prop()
  readonly identifier!: string

  @Prop({
    default: () => false
  })
  readonly required!: boolean;

  @Inject('validatorsMap')
  readonly validatorsMap!: ValidatorMap

  get customProps(){
    return this.properties?.customProps || {};
  }

  get isRequired() {
    return isRequired(this.properties) || this.required;
  }

  get requiredLabel() {
    return createRequiredLabel(this.validators);
  }

  get inputRules() {
    return createInputRules(this.isRequired, this.validators, this.properties, true, this.validatorsMap);
  }

  get inputValue() {
    return this.$store.getters.getCurrentInputValue(this.identifier) || "";
  }

  set inputValue(value) {
    this.$store.commit("updateInputValue", {
      key: this.identifier,
      value: value
    });
  }

  get inputError() {
    return this.$store.getters.getCurrentInputError(this.identifier) || "";
  }
};
</script>
