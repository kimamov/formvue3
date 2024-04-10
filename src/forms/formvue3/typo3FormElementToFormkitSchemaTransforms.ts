import { ElementDefinition, InputValidator } from "./FormDefinition";


export type Typo3ElementToFormkitElementTransformer = (el: ElementDefinition, formkitType?: string) => object

export type Typo3ElementTypeToFormkitMapping = Record<string, Typo3ElementToFormkitElementTransformer>;


export function typo3ToFormkitValidation(validators: InputValidator[]) {
  const validation = [];
  const validationMessages: Record<string, string> = {}

  for (const validator of validators) {
    const { identifier, errorMessage } = validator;


    switch (identifier) {
      case "NotEmpty": {
        validation.push(['required']);
        validationMessages.required = errorMessage;
        break;
      }
      case "StringLength": {
        validation.push(["length", validator.options?.minimum ?? 0, validator.options?.maximum ?? undefined])
        validationMessages.length = errorMessage;
        break;
      }
      case "EmailAdress": {
        validation.push(["email"]);
        validationMessages.email = errorMessage;
        break;
      }
      case "Oncaptcha": {
        break;
      }

    }
  }

  return {
    validation,
    validationMessages
  }
}

export function simpleInputTransform(el: ElementDefinition, formkitType: string = 'text'): object {
  const schema: Record<string, any> = {

    $formkit: formkitType,
    label: el.label,
    value: el.defaultValue,
    classes: {
      outer: "fv_" + el.identifier
    }
  };


  schema.name = el.name;

  if (el.validators?.length) {

    const validations = typo3ToFormkitValidation(el.validators);
    if (validations.validation.length) {
      schema.validation = validations.validation;
      schema.validationMessages = validations.validationMessages;
    }
  }

  if (el.properties?.options) {
    schema.options = el.properties.options;
    schema.placeholder = el.label;

  }
  // console.log(schema);

  return schema;
}


export function captchaInput(el: ElementDefinition): object {
  const schema = {
    $formkit: 'captcha',
    label: el.label,
    value: el.defaultValue,
    captchaUrl: el.properties?.gencaptchaUri,
    width: el.properties?.width,
    height: el.properties?.height,
    refreshText: el.properties?.refreshText,
    // classes: {
    //   name: el.name,
    //   outer: `fv_${el.identifier}`
    // }
  }

  return schema;
}

function columnSizes(el: ElementDefinition) {
  const validSizeOrFullWidth = (sizeKey: string) => {
    const defaultSize = 12; // 12 columns the entire container

    const gridColumnConfigObj =
      el.properties.gridColumnClassAutoConfiguration;
    if (!gridColumnConfigObj) return defaultSize;

    const viewportsObj = gridColumnConfigObj.viewPorts;
    if (!viewportsObj) return defaultSize;

    const sizeObj = viewportsObj[sizeKey];
    if (!sizeObj) return defaultSize;

    const size = sizeObj.numbersOfColumnsToUse;
    if (!size || isNaN(size) || size < 1 || size > 12) {
      return defaultSize;
    }
    return size;
  };

  if (typeof el.properties === "object") {
    return {
      lg: validSizeOrFullWidth("lg"),
      md: validSizeOrFullWidth("md"),
      sm: validSizeOrFullWidth("sm"),
      xs: validSizeOrFullWidth("xs"),
    };
  }

  return {
    lg: 12,
    md: 12,
    sm: 12,
    xs: 12,
  };
}


export function gridRow(el: ElementDefinition) {
  const schema: any = {
    $el: "div",
    attrs: {
      class: "grid"
    }
  }


  if (el.elements?.length) {
    schema.children = el.elements.map((child) => {
      const sizes = columnSizes(child);
      const content = transformTypo3ForElementToFormkitSchema(child)
      const children = content ? [content] : [];
      console.log(content);


      const childSchema = {
        $el: "div",
        attrs: {
          class: `grid__column col-${sizes.xs} col-sm-${sizes.sm} col-md-${sizes.md} col-lg-${sizes.lg}`
        },
        children: children
      }
      return childSchema;
    })
  }
  console.log({ schema });

  return schema;
}

export function gridCol(el: ElementDefinition) {
  const schema = { $el: "div" }
  return schema;

}

export function staticText(el: ElementDefinition) {
  return {
    $el: "div",
    children: el.label
  }
}


export const defaultMappings: Typo3ElementTypeToFormkitMapping = {
  Text: (el) => simpleInputTransform(el, 'text'),
  Email: (el) => simpleInputTransform(el, 'email'),
  Number: (el) => simpleInputTransform(el, 'number'),
  Honeypot: () => ({ $formkit: 'hidden' }),
  Hidden: () => ({ $formkit: 'hidden' }),
  Checkbox: (el) => simpleInputTransform(el, 'checkbox'),
  SingleSelect: (el) => simpleInputTransform(el, 'select'),
  EmailSingleSelect: (el) => simpleInputTransform(el, 'select'),
  Textarea: (el) => simpleInputTransform(el, 'textarea'),
  Oncaptcha: captchaInput,
  FileUpload: (el) => simpleInputTransform(el, 'file'),
  Telephone: (el) => simpleInputTransform(el, 'tel'),
  StaticText: staticText,
  RadioButton: (el) => simpleInputTransform(el, 'radio'),
  // DatePicker: DatePicker,
  GridRow: gridRow,
  // MaskedText: MaskedText,
  // ConditionCheckbox: ConditionCheckbox,
  // ConditionRadio: ConditionRadio,
  // ConditionalContent: ConditionalContent,
  // ContentElement: ContentElement,
  // ApplicationVideoUrl: ApplicationVideoUrl,
  // MultiCheckbox: MultiCheckbox,
  Url: (el) => simpleInputTransform(el, 'url'),
  // ImageUpload: FileUpload,
  // ElementsRepeater: FieldRepeater,
  // DisplayRepeatCondition: RepeatedContent,
  // Fieldset: Fieldset,
  // ConditionSelect: ConditionSelect,

}


export function transformTypo3ForElementToFormkitSchema(typo3ElementDefinition: ElementDefinition, mappingsOverride?: Typo3ElementTypeToFormkitMapping = {}) {
  const combinedMappings = { ...defaultMappings, ...mappingsOverride };

  const transformer = combinedMappings[typo3ElementDefinition.type];

  if (!transformer) return {
    $el: 'div',

  }
  return transformer(typo3ElementDefinition);

}
