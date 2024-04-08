import { ElementDefinition } from "./FormDefinition";


export type Typo3ElementToFormkitElementTransformer = (el: ElementDefinition) => object

export type Typo3ElementTypeToFormkitMapping = Record<string, Typo3ElementToFormkitElementTransformer>;



export function simpleInputTransform(el: ElementDefinition): object {
    const out = {};

    return out;
}


export const defaultMappings: Typo3ElementTypeToFormkitMapping = {
    Text: simpleInputTransform,
    Email: simpleInputTransform,
    Number: simpleInputTransform,
    Honeypot: () => ({ $formkit: 'hidden' }),
    Hidden: () => ({ $formkit: 'hidden' }),
    Checkbox: simpleInputTransform,
    SingleSelect: simpleInputTransform,
    // EmailSingleSelect: OnSelect,
    Textarea: simpleInputTransform,
    // Oncaptcha: OnCaptcha,
    // FileUpload: FileUpload,
    // Telephone: Telephone,
    // StaticText: StaticText,
    // RadioButton: OnRadioGroup,
    // DatePicker: DatePicker,
    // GridRow: FormGridRow,
    // MaskedText: MaskedText,
    // ConditionCheckbox: ConditionCheckbox,
    // ConditionRadio: ConditionRadio,
    // ConditionalContent: ConditionalContent,
    // ContentElement: ContentElement,
    // ApplicationVideoUrl: ApplicationVideoUrl,
    // MultiCheckbox: MultiCheckbox,
    // Url: Url,
    // ImageUpload: FileUpload,
    // ElementsRepeater: FieldRepeater,
    // DisplayRepeatCondition: RepeatedContent,
    // Fieldset: Fieldset,
    // ConditionSelect: ConditionSelect,
    // SubmitButton: SubmitButton,
    // BackButton: BackButton

}


export function transformTypo3ForElementToFormkitSchema(typo3ElementDefinition: ElementDefinition, mappingsOverride: Typo3ElementTypeToFormkitMapping) {
    const combinedMappings = { ...defaultMappings, ...mappingsOverride };

    const transformer = combinedMappings[typo3ElementDefinition.type];

    if (!transformer) return {
        $el: 'div',

    }
    return transformer(typo3ElementDefinition);

}