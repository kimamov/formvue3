import { createApp } from 'vue';
import FormFromTypo3Json from "./formvue3/components/FormFromTypo3Json.vue";
import { defaultConfig, plugin } from "@formkit/vue";
import '@formkit/themes/genesis'
import { createFloatingLabelsPlugin } from '@formkit/addons'
import { FormKitSchemaDefinition } from "@formkit/core";
import { FormWrapper } from './formvue3/FormDefinition';


export default function initVueForms() {
    const forms = document.querySelectorAll('[data-id]');
    const formConfigsList = (window as any).extendedforms;

    const formViews = {};

    if (!formConfigsList) return formViews;


    function scrollToElement(inputWithError: HTMLElement) {
        if (inputWithError && inputWithError.getBoundingClientRect) {
            let scrollTarget = inputWithError.getBoundingClientRect().top + window.scrollY;
            const offset = 100;
            scrollTarget -= offset;
            scrollTarget = scrollTarget > 0 ? scrollTarget : 0;
            window.scrollTo({
                top: scrollTarget,
                behavior: 'smooth'
            });
        }
    }

    for (let form of forms) {
        const id = form.getAttribute('data-id');
        if (!id) continue;
        const wrapper = document.querySelector('[data-id="' + id + '"]');

        if (!wrapper) continue;

        const formSchema: FormWrapper = formConfigsList[id];
        if (!formSchema?.configuration) continue;

        /**
         *
         * @type FormKitSchemaDefinition
         */
        const testSchema = [
            {
                $el: 'h1',
                children: 'Register',
                attrs: {
                    class: 'text-2xl font-bold mb-4',
                },
            },
            {
                $formkit: 'text',
                name: 'email',
                label: 'Email',
                help: 'This will be used for your account.',
                validation: 'required|email',
            },
            {
                $formkit: 'text',
                name: 'email',
                label: 'Email',
                help: 'This will be used for your account.',
                validation: 'required|email',
            },
            {
                $formkit: 'password',
                name: 'password',
                label: 'Password',
                help: 'Enter your new password.',
                validation: 'required|length:5,16',
            },
            {
                $formkit: 'password',
                name: 'password_confirm',
                label: 'Confirm password',
                help: 'Enter your new password again to confirm it.',
                validation: 'required|confirm',
                validationLabel: 'password confirmation',
            },
            {
                $cmp: 'FormKit',
                props: {
                    name: 'eu_citizen',
                    type: 'checkbox',
                    id: 'eu',
                    label: 'Are you a european citizen?',
                },
            },
            {
                $formkit: 'select',
                if: '$get(eu).value', // 👀 Oooo, conditionals!
                name: 'cookie_notice',
                label: 'Cookie notice frequency',
                options: {
                    refresh: 'Every page load',
                    hourly: 'Ever hour',
                    daily: 'Every day',
                },
                help: 'How often should we display a cookie notice?',
            },
        ];

        console.log(formSchema)

        const app = createApp(
            FormFromTypo3Json,
            {
                formSchema: testSchema,
                typo3FormConfig: formSchema.configuration,
                library: {

                }
            }
        ).use(plugin, defaultConfig({
            plugins: [
                createFloatingLabelsPlugin({
                    useAsDefault: true, // defaults to false
                }),
            ],
        })).mount(wrapper);


    }
}
//
// registerResponseInterceptor(async (context, responseJson) => {
//     if (responseJson.status == 200) {
//         window.dataLayer = window.dataLayer || [];
//         window.dataLayer.push({
//             'event': 'form_send',
//             'form_id': context.state.id,
//             'form_location': window.location.pathname
//         });
//     }
//
//     return false;  // do not cancel response handling
// });

