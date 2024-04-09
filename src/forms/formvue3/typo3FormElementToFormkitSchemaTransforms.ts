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
    const out: Record<string, any> = {

        $formkit: formkitType,
        label: el.label,
        value: el.defaultValue,

    };
    if (el.validators?.length) {

        const validations = typo3ToFormkitValidation(el.validators);
        if (validations.validation.length) {
            out.validation = validations.validation;
            out.validationMessages = validations.validationMessages;
        }
    }


    if (el.properties?.options?.length) {
        out.options = el.properties.options;
    }


    return out;
}

export function gridRow(el: ElementDefinition) {
    const schema = {}
    return schema;
}

export function gridCol(el: ElementDefinition) {
    const schema = {}
    return schema;

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
    // Oncaptcha: OnCaptcha,
    FileUpload: (el) => simpleInputTransform(el, 'file'),
    Telephone: (el) => simpleInputTransform(el, 'tel'),
    // StaticText: StaticText,
    // RadioButton: OnRadioGroup,
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


export function transformTypo3ForElementToFormkitSchema(typo3ElementDefinition: ElementDefinition, mappingsOverride: Typo3ElementTypeToFormkitMapping) {
    const combinedMappings = { ...defaultMappings, ...mappingsOverride };

    const transformer = combinedMappings[typo3ElementDefinition.type];

    if (!transformer) return {
        $el: 'div',

    }
    return transformer(typo3ElementDefinition);

}