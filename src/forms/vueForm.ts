import { createApp } from 'vue';
import FormFromTypo3Json from "./formvue3/components/FormFromTypo3Json.vue";
import { createInput, defaultConfig, plugin } from "@formkit/vue";
import '@formkit/themes/genesis'
// import { createFloatingLabelsPlugin } from '@formkit/addons'
// import { FormKitSchemaDefinition } from "@formkit/core";
import { FormWrapper } from './formvue3/FormDefinition';
//@ts-ignore
import captchaInput from './formvue3/components/inputs/captcha.js';

export default function initVueForms() {
    const forms = document.querySelectorAll('[data-id]');
    const formConfigsList = (window as any).extendedforms;

    const formViews = {};

    if (!formConfigsList) return formViews;


    for (let form of forms) {
        console.log(form);
        const id = form.getAttribute('data-id');

        if (!id) continue;
        const wrapper = document.querySelector('[data-id="' + id + '"]');

        if (!wrapper) continue;

        const formSchema: FormWrapper = formConfigsList[id];
        if (!formSchema?.configuration) continue;
        console.log(formSchema);
        console.log(formSchema)

        createApp(
            FormFromTypo3Json,
            {
                typo3FormConfig: formSchema,
                typo3ToFormSchemaMappings: {

                }
            }
        ).use(plugin, defaultConfig({
            plugins: [
                // createFloatingLabelsPlugin({
                //     useAsDefault: true, // defaults to false
                // }),
            ],
            inputs: {
                captcha: captchaInput
            }
        })).mount(wrapper);


    }
}

