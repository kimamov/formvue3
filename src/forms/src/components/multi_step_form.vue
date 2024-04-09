<template>
  <div class="ondigo-multistep-form-wrapper">
    <h2 v-if="pageSummaryLabel" class="mb-4 ondigo-form-header">
      {{ pageSummaryLabel }}
    </h2>
    <v-form :class="`ondigo-multi-step-form ondigo-form form-${formConfig.identifier}`"
      :data-form-identifier="formConfig.id" :name="formConfig.name ? formConfig.name : formConfig.id"
      @submit.prevent="handleFormSubmit" ref="form" :loading="loading" :disabled="disabled">
      <dynamic-element v-for="element in formConfig.elements" :key="element.identifier" :formName="formConfig.id"
        :element="element" />
      <div v-show="errorCountLabel" class="error-summary input-errors">
        <button class="btn btn---display-textlink" @click.prevent="scrollToFirstError">{{ errorCountLabel }}</button>
      </div>
      <div v-show="formErrors && formErrors.length" class="error-summary form-errors">
        <p v-for="error in formErrors" class="error-summary-item">{{ error }}</p>
      </div>
      <div class="d-flex justify-space-between mt-4">
        <template v-if="currentStep > 1">
          <component v-if="componentsMap['BackButton']" :is="componentsMap['BackButton']"
                     :loading="loading" :btn-label="nextButtonLabel" class="btn-back" :disabled="disabled" :formName="formConfig.id" />
          <v-btn type="button"  @click="loadPreviousStep" color="secondary"
                 class="ondigo-btn ondigo-btn-back" :disabled="disabled">
            {{ previousButtonLabel }}
          </v-btn>
        </template>

        <template v-if="isLastStep">
          <component v-if="componentsMap['SubmitButton']" :is="componentsMap['SubmitButton']"
                     :loading="loading" :btn-label="nextButtonLabel" class="btn-submit" :disabled="disabled" :formName="formConfig.id" />
          <v-btn type="submit" v-else :loading="loading" color="primary" class="ondigo-btn ondigo-btn-next"
                 :disabled="disabled">
            {{ nextButtonLabel }}
          </v-btn>
        </template>

      </div>
    </v-form>
  </div>
</template>

<script>
import dynamic_element from "./dynamic_element.vue";

export default {
  components: {
    "dynamic-element": dynamic_element,
  },
  computed: {
    formConfig() {
      return this.$store.getters.getCurrentSchema;
    },
    loading() {
      return this.$store.state.loading;
    },
    errorCountLabel() {
      return this.$store.getters.getErrorLabel;
    },
    formErrors() {
      return this.$store.getters.getFormErrors;
    },
    currentStep() {
      return this.$store.state.currentStep;
    },
    pageSummaryLabel() {
      return this.$store.getters.getPageSummaryText;
    },
    disabled() {
      return this.$store.state.formDisabled;
    },

    lastStep() {
      return this.$store.state.lastStep;
    },

    isLastStep() {
      return this.currentStep === this.lastStep;
    },
    buttonLabels() {
      return (
        this.formConfig &&
        this.formConfig.api &&
        this.formConfig.api.page &&
        this.formConfig.api.page.labels
      );
    },
    previousButtonLabel() {
      return (
        (this.buttonLabels && this.buttonLabels.previousButtonLabel) ||
        "previous step"
      );
    },

    nextButtonLabel() {
      return (
        (this.buttonLabels && this.buttonLabels.nextButtonLabel) || "next step"
      );
    },
  },
  inject: ["scrollIntoView", "componentsMap"],
  methods: {
    handleFormSubmit() {
      const form = this.$refs.form;
      if (form) this.$store.dispatch("submitStep", form);
    },
    loadPreviousStep() {
      this.$store.commit("updateFormStep", this.currentStep - 1);
    },
    scrollToFirstError() {
      const firstInputWithError = this.$refs.form.$el.querySelector(
        ".v-input.error--text"
      );
      if (firstInputWithError) {
        if (this.scrollIntoView) {
          this.scrollIntoView(firstInputWithError);
        }
      }
    },
  },
  watch: {
    currentStep() {
      if (this.onStepChange && typeof this.onStepChange === 'function') {
        this.$nextTick(() => {
          this.onStepChange(this.currentStep, this);
        })
      }
    }
  }
};
</script>
