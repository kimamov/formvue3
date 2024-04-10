import { createInput } from '@formkit/vue'
import { FormKitSchemaNode, FormKitSectionsSchema } from "@formkit/core";
/**
 * This is our input schema responsible for rendering the inner “input”
 * section. In our example, we render an text input which will be used
 * to filter search results, and an unordered list that shows all remaining
 * matches.
 */
const schema: FormKitSectionsSchema = {
    $el: "input",
    bind: "$attrs",
    attrs: {
        type: '$type',
        disabled: '$disabled',
        class: '$classes.input',
        name: '$node.name',
        onInput: '$handlers.DOMInput',
        onBlur: '$handlers.blur',
        value: '$_value',
        id: '$id',
    },
    // "section-schema": {
    //     outer: {
    //         $el: 'div',
    //         attrs: {
    //             class: "img-wrapper"
    //         },
    //         $children: [
    //             { $el: 'img', attrs: { src: "" } }
    //         ]
    //     }
    // }
    outer: { $el: null },
    props: {
        "sections-schema": {
            outer: { $el: null },
            inner: { $el: null },
            messages: { $el: null },
            message: { $el: 'div' },
        }
    },
    "sections-schema": {
        outer: { $el: null },
        inner: { $el: null },
        messages: { $el: null },
        message: { $el: 'div' },
    }

}
//     {
//         $el: "image",
//         attrs: {
//             src: "https://www.google.com/recaptcha/api2/bframe?hl=en&v=6m5ic6x6bq2c&k=6LcQJyAUAAAAAE9ZvL3eZ1fZ5f6xv7eJ9J3wZJGn&cb=1r5k3q1jx3a6",
//             alt: "Captcha",
//             width: 304,
//             height: 78
//         }

//     },
//     {
//         $formkit: "text",
//         label: "Captcha",
//         placeholder: "Enter the text shown in the image"
//     }
// ]




/**
 * This is our input schema responsible for rendering the inner “input”
 * section. In our example, we render an text input which will be used
 * to filter search results, and an unordered list that shows all remaining
 * matches.
 */
const schemaa = {
    if: '$value',
    then: [
        {
            $el: 'a',
            attrs: {
                id: '$id',
                href: '#',
                class: '$classes.value',
                onClick: '$handlers.setValue',
            },
            children: '$value',
        },
    ],
    else: [
        {
            $el: 'input',
            bind: '$attrs',
            attrs: {
                id: '$id',
                class: '$classes.input',
                onKeydown: '$handlers.selection',
                onInput: '$handlers.search',
                value: '$searchValue',
            },
        },
        {
            $el: 'ul',
            if: '$matches.length < $options.length',
            attrs: {
                class: '$classes.dropdown',
            },
            children: [
                {
                    $el: 'li',
                    for: ['match', '$matches'],
                    attrs: {
                        'data-selected': {
                            if: '$selection === $match',
                            then: 'true',
                            else: 'false',
                        },
                        class: '$classes.dropdownItem',
                        onClick: '$handlers.setValue',
                        onMouseenter: '$handlers.hover',
                        onMouseleave: '$handlers.unhover',
                    },
                    children: '$match',
                },
            ],
        },
    ],
}



/**
 * Finally we create our actual input declaration by using `createInput` this
 * places our schema into a "standard" FormKit schema feature set with slots,
 * labels, help, messages etc. The return value of this function is a proper
 * input declaration.
 */
const captcha = createInput(
    schema,
    {
        props: ['captchaUrl', 'width', 'height', 'refreshText'],
        family: 'text', // choose which family to inherit base class lists from
    }
)

export default captcha