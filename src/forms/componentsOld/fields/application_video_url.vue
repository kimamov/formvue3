<template>
  <div class="application-video-wrapper">
    <div
        class="ondigo-text-content application-video-url-desc"
        v-if="properties.elementDescription"
    >
      {{properties.elementDescription}}
    </div>
    <on-text-field-base
        v-bind="{ ...$attrs, rules: inputRules}"
        v-on="$listeners"
        :required="required"
        :placeholder="placeholder"
        :requiredLabel="requiredLabel"
		:properties="properties"
        type="url"
    />
  </div>
</template>
<script>
import { createInputRules, getPlaceholder, OnTextFieldBase, isRequired } from 'formvue-json';

export default {
  name: "ApplicationVideoUrl",
  components: {
    OnTextFieldBase,
  },
  props: {
    renderingOptions: {
      type: Object,
      default: {},
    },
    properties: {
      type: Object,
      default: {}
    },
    rules: {
      type: [Object, Array],
      default() {
        return {} || [];
      },
    },
    validators: {
      type: Array,
      required: false,
    },
  },
  computed: {
    required() {
      return isRequired(this.properties);
    },
    placeholder() {
      return getPlaceholder(this.properties);
    },
    requiredLabel() {
      if (!this.validators || !this.validators.length) return "required";
      const notEmptyValidator = this.validators.find(
          (v) => v.identifier === "NotEmpty"
      );
      return (
          (notEmptyValidator && notEmptyValidator.errorMessage) || "required"
      );
    },
    inputRules() {
      const rules = [];
      if (this.rules && Array.isArray(this.rules)) rules.push(...this.rules);
      else rules.push(...createInputRules(this.required, this.validators, this.properties, true));

      const urlErrorMessage = this.renderingOptions?.urlErrorMessage;
      rules.push(value => {
        const pattern = /^(https?:\/\/(?:(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|[A-Za-z0-9.-]+))((?:\/[+~%\/.\w-_]*)?\??[-+=&;%@.\w_]*#?[\w]*)?$/;
        return pattern.test(value) || !this.required || urlErrorMessage || "Invalid URL";
      });

      return rules;
    },
  }
};
</script>
