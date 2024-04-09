<template>
  <div class="on-multi-checkbox">
    <div class="on-multi-checkbox__label" v-if="label && label!==''" v-html="label"></div>
    <div class="on-multi-checkbox__slot">
      <v-checkbox
        v-for="option of options"
        :key="option.value"
        v-model="checked"
        off-icon="mdi-checkbox-blank"
        class="ondigo-checkbox"
        hide-details="auto"
        :class="`ondigo-input-${identifier} ondigo-checkbox`"
        :error-messages="errorMessages"
        :identifier="identifier"
        :label="option.label || null"
        :name="name !== null ? name.concat('[]') : null"
        :ref="'ref-' + identifier"
        :required="required"
        :rules="rules"
        :value="option.value"
    >
      <div v-if="option.content" ref="contentLabel" slot="label" class="ondigo-content-element-wrapper" v-html="option.content" />
    </v-checkbox>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

const Props = Vue.extend({
  props: {
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
    requiredLabel: {
      type: String,
      default: "required",
    },
    type: {
      type: String,
      default: "text",
    },
    required: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default() {
        return [];
      },
    },
    errorMessages: {
      type: String,
      required: false
    },
  }
});

type Option = {
  label: string,
  value?: string,
  content?: string,
}

@Component<OnMultiCheckboxBase>({
  name: "OnMultiCheckboxBase",
  watch: {
    checked(val) {
      this.$emit('input', val);
    }
  }
})
export default class OnMultiCheckboxBase extends Props {
  readonly $refs!: Partial<Record<string, HTMLElement | HTMLElement[]>>

  @Prop({
    default: () => null
  })
  readonly value!: any

  checked: string[] = []

  created() {
    if (this.value && Array.isArray(this.value)) {
      this.checked = this.value as string[];
    }
  }

  mounted() {
    const contentLabel = this.$refs['contentLabel'];
    if (!contentLabel) return;

    function apply(contentLabel: HTMLElement) {
      const links = Array.from(contentLabel.querySelectorAll('a'));
      links.forEach(elem => elem.addEventListener('click', e => e.stopPropagation()));
    }

    if (Array.isArray(contentLabel)) contentLabel.forEach(apply);
    else apply(contentLabel);
  }

  get options(): Option[] {
    const options = this.properties?.options;
    if (!options) return [];

    if (Array.isArray(options)) {
      return options as Option[];
    } else if (typeof options === 'object') {
      return Object.entries(options).map(entry => {
        const key = entry[0];
        const val = entry[1] as string | { content?: string };

        if (typeof val === 'string') {
          return {value: key, label: val} as Option;  // string label
        } else if (val && typeof val === 'object') {
          if (val.content) {
            // html content
            return {value: key, content: val.content} as Option;
          }
        }

        return {value: key} as Option;  // ignore
      }).filter(x => x.value !== undefined || x.content !== undefined);
    }

    return [];
  }
}
</script>


