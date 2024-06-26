<template>
  <div>
    <input type="hidden" :name="name" v-model="formattedInput"/>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <masked-text
            :mask-active="maskActive"
            :placeholder="placeholder"
            ref="masked"
            :rules="menu ? [] : inputRules"
            :class="`ondigo-input ondigo-textfield ondigo-input-_${identifier}`"
            :inputBridge="inputBridge"
            :identifier="subIdentifier"
            :requiredLabel="requiredLabel"
            :name="subInputName"
            :formName="formName"
            v-bind="{
              ...$attrs,
              properties: {
                ...properties,
                // mixin generated MaskedText properties
                pattern: maskPattern,
                placeholder: '_'
              }
            }"
            v-on="$listeners"
        >
          <template slot="append-masked">
            <div class="ondigo-icon-button" v-bind="attrs" v-on="on">
              <v-icon :color="menu ? 'primary' : ''">mdi-calendar</v-icon>
            </div>
          </template>
        </masked-text>
      </template>
      <v-date-picker
          v-model="date"
          :active-picker.sync="activePicker"
          :max="maxDate"
          :min="minDate"
          @change="save"
          :locale="locale || navigator.language || 'en-US'"
      />
    </v-menu>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata' // infer vue prop type validation by ts-definition; import this before vue-property-decorator!
import {createInputName, createInputRules, createRequiredLabel, getPlaceholder, isRequired} from "@/lib/util";
import {Component, Inject, Prop, Vue} from "vue-property-decorator";
import {mixins} from "vue-class-component";
import InputValueMixin from "@/components/mixin/InputValueMixin";
import MaskedText from "@/components/fields/composed/textfield_masked.vue";

import {
  compareDateTimes,
  formatISODateFromPattern,
  getShortIsoString,
  interpretTime,
  isIsoFormatted,
  parseISODateFromPattern,
  toIsoFormatWithOffset
} from "@/lib/time";
import {ElementProperties, InputValidator} from "@/lib/FormDefinition";
import {ValidatorMap} from "@/lib/validators";

@Component<OnDatePicker>({
  name: "OnDatePicker",
  components: {
    MaskedText: MaskedText
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
      this.$store.commit("setFormDisabled", val);
    },
    date() {
      if (!this.date) return;

      const newFormattedDate = this.formatDate(this.date);

      // this.formattedInput must be set before updating the inputBridge
      this.updateFormattedValue(newFormattedDate);
      this.inputBridge = newFormattedDate;
    },
    inputBridge(val) {
      this.updateFormattedValue(val);
    },
    defaultValue() {
      this.handleDefaultValue();
    }
  }
})
export default class OnDatePicker extends mixins(InputValueMixin) {

  @Prop({
    default: () => []
  })
  readonly validators!: InputValidator[]

  @Prop()
  readonly properties!: ElementProperties

  @Prop()
  readonly identifier!: string

  @Prop()
  readonly defaultValue?: string;

  @Prop()
  readonly name!: string

  @Prop()
  readonly formName!: string

  @Prop()
  readonly minimumDate?: string

  @Prop()
  readonly maximumDate?: string

  @Prop({
    default: () => {
    }
  })
  readonly rules!: any[];

  @Inject('validatorsMap')
  readonly validatorsMap!: ValidatorMap

  readonly $refs!: Partial<Record<string, HTMLElement>> & {
    field: Vue
  }

  activePicker: 'YEAR' | 'MONTH' | 'DATE' | null = null;
  date: string | null = null
  menu = false;
  formattedInput: string | null = null

  get subIdentifier() {
    return '_' + this.identifier;
  }

  get subInputName() {
    return createInputName(this.formName, '_' + this.identifier);
  }

  get inputRules() {
    if (this.rules && Array.isArray(this.rules)) return this.rules;
    else return createInputRules(this.isRequired, this.validators, {
      ...this.properties,
      pattern: this.maskPattern,
    }, true, this.validatorsMap);
  }

  get isRequired() {
    return isRequired(this.properties);
  }

  get requiredLabel() {
    return createRequiredLabel(this.validators);
  }

  get placeholder() {
    return getPlaceholder(this.properties);
  }

  get maskActive() {
    return !!this.properties.enableMask;
  }

  get minDate() {
    // compatibility: minimumDate property takes priority over validator constraint
    if (this.minimumDate) {
      return this.minimumDate;
    }

    if (!this.validators) return undefined;

    const validator = this.validators.find(v => v.identifier === "DateInterval");
    if (!validator) return undefined;

    const minDate = validator.options?.minDate;
    if (!minDate) return undefined;

    const interpreted = interpretTime(minDate);

    // parse date with date
    const date = Date.parse(interpreted);
    return !isNaN(date) ? interpreted : undefined;
  }

  get maxDate() {
    // compatibility: maximumDate property takes priority over validator constraint
    if (this.maximumDate) {
      return this.maximumDate;
    }

    if (!this.validators) return undefined;

    const validator = this.validators.find(v => v.identifier === "DateInterval");
    if (!validator) return undefined;

    const maxDate = validator.options?.maxDate;
    if (!maxDate) return undefined;

    const interpreted = interpretTime(maxDate);

    // parse date with date
    const date = Date.parse(interpreted);
    return !isNaN(date) ? interpreted : undefined;
  }

  get maskPattern() {
    if (!this.maskActive) return "";

    let format = this.properties.dateFormat;
    if (!format) return "dd.mm.YYYY"; // fallback value

    // In PHP a format would be something like Y-m-d, but the mask pattern needs to be mapped to, in this case YYYY-mm-dd
    Object.entries({
      // Supported PHP format specifiers
      d: "dd",
      m: "mm",
      Y: "YYYY",
      H: "HH",
      i: "ii",
    }).forEach(([from, to]) => (format = format.replace(from, to)));

    return format; // is now pattern
  }

  get locale() {
    return this.$store.getters.getCurrentSchema?.i18n;
  }

  get inputBridge() {
    return this.$store.getters.getCurrentInputValue(this.subIdentifier) || "";
  }

  set inputBridge(value) {
    this.$store.commit("updateInputValue", {key: this.subIdentifier, value: value});

    // remember call updateFormattedValue() before!
    this.$store.commit("updateInputValue", {key: this.identifier, value: this.formattedInput});
  }

  created() {
    const stored = this.$store.getters.getCurrentInputValue(this.identifier);

    if (stored) {
      this.setSelectedDate(stored);
    } else {
      this.handleDefaultValue();
    }
  }

  save(date: string) {
    (<any>this.$refs.menu)?.save(date);
  }

  formatDate(date: string) {
    const now = new Date();
    return formatISODateFromPattern(date, this.maskPattern, {
      // additional mappings for hour, minute
      H: String(now.getHours()).padStart(2, "0"),
      i: String(now.getMinutes()).padStart(2, "0"),
    });
  }

  updateFormattedValue(val: string) {
    const parsed = this.parseDate(val);
    if (!parsed) return;

    if (parsed !== this.date) this.date = parsed;

    const time = Date.parse(parsed);
    if (isNaN(time)) {
      this.formattedInput = null;
      return;
    }

    this.formattedInput = toIsoFormatWithOffset(new Date(time));
  }

  parseDate(date: string) {
    if (!date) return null;

    return parseISODateFromPattern(
        date,
        this.maskPattern,
        // Getter for date components
        (match, order, identifier) => {
          const idx = order.indexOf(identifier);
          if (idx >= 0) return Number(match[idx + 1]); // order[i] = match[i + 1]

          // default values
          const now = new Date();
          switch (identifier) {
            case "Y":
              return now.getFullYear();
            case "m":
              return now.getMonth() + 1;
            case "d":
              return now.getDate();
            default:
              return undefined;
          }
        },
        // Interceptor, ensures invalid dates are not set
        (year, month, day) => {
          // check if date components are in allowed ranges
          if (!year || !month || !day ||
              month < 1 || month > 12 ||
              day < 1 || day > 31 ||
              year < 1000 || year > 9999) {
            return [null, true]; // invalid date, override with null
          }

          // check if date components are in given min/max range (to prevent vuetify error throw)
          const inputDate = [year, month, day] as [number, number, number];
          if (
              (this.minDate && compareDateTimes(inputDate, this.minDate) < 0) /* date is before minDate */ ||
              (this.maxDate && compareDateTimes(inputDate, this.maxDate) > 0) /* date is after maxDate */
          ) {
            return [null, true]; // date out of selectable range, override with null
          }
          return [null, false]; // do not override
        }
    );
  }

  handleDefaultValue() {
    // if there is no defaultValue or the input is not empty, cancel
    if (!this.defaultValue || this.inputBridge) return;

    this.setSelectedDate(this.defaultValue);
  }

  setSelectedDate(date: string) {
    if (isIsoFormatted(date)) {
      const defaultValueDate = new Date(date);
      const isoDate = getShortIsoString(defaultValueDate);
      let formattedDefaultValue = this.formatDate(isoDate);

      this.updateFormattedValue(formattedDefaultValue);
      this.inputBridge = formattedDefaultValue;
    } else {
      let defaultValueDate = this.parseDate(date);
      if (!defaultValueDate) {
        // invalid date string
        return;
      }

      this.updateFormattedValue(date);
      this.inputBridge = date;
    }
  }
};
</script>
