<script setup lang="ts">
import { FormKitSchema } from "@formkit/vue";
// import { FormKitSchemaDefinition } from "@formkit/core";
import { computed, onMounted } from "vue";
import { ElementDefinition } from "../FormDefinition";
import { transformTypo3ForElementToFormkitSchema } from '../typo3FormElementToFormkitSchemaTransforms';

const props = defineProps({
  formSchema: {
    default: () => []
  },
  library: {
    type: Object
  },
  // formKitSchemaProps: {
  //   type: FormKitSchema
  // },
  typo3FormConfig: {
    type: Object,
    required: true
  },
  typo3ToFormSchemaMappings: {
    type: Object,
    default: () => { }
  }
}
)

const formkitSchemaFromTypo3Config = computed(() => {
  if (!props.typo3FormConfig?.configuration?.elements?.length) return [];
  console.log(props.typo3FormConfig.configuration.elements)

  return props.typo3FormConfig.configuration.elements.map((el: ElementDefinition) => {
    return transformTypo3ForElementToFormkitSchema(el, props.typo3ToFormSchemaMappings)
  })

})

onMounted(() => {
  console.log(props.typo3FormConfig)
})

async function submitForm(data: any) {
  console.log({ data })
}
</script>

<template>
  <slot name="beforeWrapper"></slot>
  <div class="fv-app">
    <slot name="beforeSchema"></slot>
    <FormKit type="form" @submit="submitForm">
      <FormKitSchema :schema="formkitSchemaFromTypo3Config" />
    </FormKit>
    <slot name="afterSchema"></slot>
  </div>
  <slot name="afterWrapper"></slot>
</template>

<style lang="scss">
.fv-app {
  font-size: 16px;
  line-height: 1.1;
  padding: 20px;

  * {
    font-size: inherit;
    line-height: inherit;
  }

  [data-floating-label='true'] .formkit-inner {
    position: relative;
  }

  [data-floating-label='true'] .formkit-label {
    position: absolute;
    left: 0.5em;
    opacity: 0.45;
    font-weight: normal;
    font-size: 1em;
    transition: all 0.2s ease-out;
    transition-delay: 0.1s;
    top: 50%;
    transform: translateY(-50%);
    padding: 0.15em 0.25em;
    line-height: 1;
    box-sizing: border-box;
  }

  [data-floating-label='true'][data-type='textarea'] .formkit-label {
    top: 0.5em;
    left: 0.5em;
    transform: translateY(0%);
  }

  [data-floating-label='true'] input:focus~.formkit-label,
  [data-floating-label='true'] textarea:focus~.formkit-label,
  [data-floating-label='true']:not([data-empty='true']) .formkit-label,
  [data-floating-label='true'][data-expanded='true'] .formkit-label {
    font-size: 0.7em;
    transform: translateY(-66.666%);
    opacity: 1;
    top: 0;
    left: 0.5em !important;
    z-index: 2;
    transition-delay: 0s;
    transition-duration: 0.25s;
  }

  /* special considerations for placeholders and overlays */
  [data-floating-label='true'] .formkit-input:not(:focus)::placeholder,
  [data-floating-label='true']:not([data-expanded='true']) .formkit-placeholder,
  [data-floating-label='true']:not(:focus-within) .formkit-overlay,
  [data-floating-label='true'][data-type='datepicker'] .formkit-overlay {
    transition-duration: 0.2s;
    transition-delay: 0.1s;
    opacity: 0;
  }

  [data-floating-label='true'] .formkit-input::placeholder,
  [data-floating-label='true'] .formkit-placeholder,
  [data-floating-label='true']:not([data-empty='true']) .formkit-overlay,
  [data-floating-label='true'][data-type='datepicker']:not([data-empty='true']) .formkit-overlay,
  [data-floating-label='true'][data-type='datepicker'][data-focused='true'] .formkit-overlay,
  [data-floating-label='true'][data-type='datepicker'][data-expanded='true'] .formkit-overlay,
  [data-floating-label='true'][data-type='datepicker']:not([data-empty='true']) .formkit-overlay {
    opacity: 1;
    transition: opacity 0.25s ease-out;
  }

  /* mask & datepicker - hide the actual input value until the field is complete */
  [data-floating-label='true'][data-type='mask']:not(:focus-within) input,
  [data-floating-label='true'][data-type='datepicker'] input {
    transition-duration: 0.2s;
    transition-delay: 0.1s;
    color: transparent;
  }

  [data-floating-label='true'][data-type='mask']:not([data-empty='true']) input,
  [data-floating-label='true'][data-type='datepicker']:not([data-empty='true']) input,
  [data-floating-label='true'][data-type='datepicker'][data-focused='true'] input,
  [data-floating-label='true'][data-type='datepicker'][data-expanded='true'] input,
  [data-floating-label='true'][data-type='datepicker']:not([data-empty='true']) input {
    color: inherit;
    transition: opacity 0.25s ease-out;
  }

}
</style>
