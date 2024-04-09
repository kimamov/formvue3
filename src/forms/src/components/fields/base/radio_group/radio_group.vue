<template>
  <v-radio-group
      v-model="inputValue"
      color="red"
      hide-details="auto"
      :class="`ondigo-input-${identifier} ondigo-radio`"
      :error-messages="errorMessages"
      :identifier="identifier"
      :label="label"
      :ref="'ref-' + identifier"
      :required="required"
      :rules="rules"
      :name="name"
      :column="!inline"
      @blur="blur"
      @change="change"
      @focus="focus"
      @input="input"
  >
    <v-radio
        v-for="option in radioOptions"
        :key="option.value"
        :label="option.label"
        :value="option.value"
    ></v-radio>
  </v-radio-group>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import "./radio_group.scss";
import {mixins} from "vue-class-component";
import InputValueMixin from "@/components/mixin/InputValueMixin";

const Props = Vue.extend({
  props: {
    defaultValue: {
      type: [String, Number],
      required: false,
    },
    identifier: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false
    },
    label: {
      type: String,
      default: null,
    },
    properties: {
      type: [Object, Array],
      required: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array,
      default() {
        return [];
      },
    },
    required: {
      type: Boolean,
      default: false
    },
    errorMessages: {
      type: String,
      required: false
    },
  },
});

type RadioOption = {
  value: string,
  label: string,
}

@Component<OnRadioGroupBase>({
  name: "OnRadioGroupBase"
})
export default class OnRadioGroupBase extends mixins(Props, InputValueMixin) {

  get radioOptions(): RadioOption[] {
    const optionsArray: RadioOption[] = [];
    if (!this.properties || !this.properties.options) return optionsArray;

    const options = this.properties.options;

    if (Array.isArray(options)) {
      optionsArray.push(...options);
    } else if (typeof options === 'object') {
      for (const prop in options) {
        optionsArray.push({
          value: prop,
          label: options[prop],
        });
      }
    }

    return optionsArray;
  }

  get inline(): boolean {
    if (typeof this.properties?.inline !== 'boolean') return true;

    return !!this.properties.inline;
  }

  change(e: Event) {
    this.$emit("change", e);
  }

  input(e: Event) {
    this.$emit("input", e);
  }

  focus(e: Event) {
    this.$emit("focus", e);
  }

  blur(e: Event) {
    this.$emit("blur", e);
  }
}
</script>
