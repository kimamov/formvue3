import { ObjectFlags } from "typescript";



const forms = {
    'contact-22616': {
        configuration: {
            action: 'https://www.berliner-philharmoniker.de/kontakt/sendform/#contact-22616',
            id: 'contact-22616',
            api: {
                "status": null,
                "errors": null,
                "callbacks": [],
                "preprocess": [],
                "actionAfterSuccess": null,
                "page": {
                    "current": 1,
                    "nextPage": null,
                    "pages": 1,
                    "labels": {
                        "nextButtonLabel": "Absenden"
                    },
                    "errorHint": "Bitte prüfen Sie %s Felder",
                    "pageSummaryText": null,
                    "submitButtonAlignment": "left",
                    "label": "Step"
                },
                "pageDefinitions": [
                    {
                        "index": 0,
                        "identifier": "page-1",
                        "label": "Step"
                    }
                ]
            },
            global: {
                "labels": {
                    "error": "Ein Fehler ist aufgetreten, bitte kontaktieren Sie den Webseitenbetreiber"
                }
            },
            i18n: 'de-DE',
            elements: [
                {
                    "defaultValue": "",
                    "type": "Text",
                    "identifier": "name",
                    "label": "Name",
                    "properties": {
                        "fluidAdditionalAttributes": {
                            "required": "required",
                            "minlength": "2",
                            "maxlength": "40"
                        },
                        "validationErrorMessages": [
                            {
                                "code": 1221560910,
                                "message": "Bitte geben Sie Ihren Namen ein"
                            },
                            {
                                "code": 1221560718,
                                "message": "Bitte geben Sie Ihren Namen ein"
                            },
                            {
                                "code": 1347992400,
                                "message": "Bitte geben Sie Ihren Namen ein"
                            },
                            {
                                "code": 1347992453,
                                "message": "Bitte geben Sie Ihren Namen ein"
                            },
                            {
                                "code": 1238110957,
                                "message": "Der Name muss zwischen 2 und 40 Zeichen betragen"
                            },
                            {
                                "code": 1269883975,
                                "message": "Der Name muss zwischen 2 und 40 Zeichen betragen"
                            },
                            {
                                "code": 1428504122,
                                "message": "Der Name muss zwischen 2 und 40 Zeichen betragen"
                            },
                            {
                                "code": 1238108068,
                                "message": "Der Name muss zwischen 2 und 40 Zeichen betragen"
                            },
                            {
                                "code": 1238108069,
                                "message": "Der Name muss zwischen 2 und 40 Zeichen betragen"
                            }
                        ]
                    },
                    "renderingOptions": [],
                    "validators": [
                        {
                            "identifier": "NotEmpty",
                            "code": 1221560910,
                            "errorMessage": "Bitte geben Sie Ihren Namen ein"
                        },
                        {
                            "options": {
                                "minimum": "2",
                                "maximum": "40"
                            },
                            "identifier": "StringLength",
                            "code": 1428504122,
                            "errorMessage": "Der Name muss zwischen 2 und 40 Zeichen betragen"
                        }
                    ],
                    "name": "tx_form_formframework[contact-22616][name]"
                },
                {
                    "defaultValue": "",
                    "type": "Email",
                    "identifier": "email",
                    "label": "E-Mail",
                    "properties": {
                        "fluidAdditionalAttributes": {
                            "required": "required"
                        },
                        "validationErrorMessages": [
                            {
                                "code": 1221560910,
                                "message": "Bitte geben Sie eine Email-Adresse ein"
                            },
                            {
                                "code": 1221560718,
                                "message": "Bitte geben Sie eine Email-Adresse ein"
                            },
                            {
                                "code": 1347992400,
                                "message": "Bitte geben Sie eine Email-Adresse ein"
                            },
                            {
                                "code": 1347992453,
                                "message": "Bitte geben Sie eine Email-Adresse ein"
                            },
                            {
                                "code": 1221559976,
                                "message": "Bitte geben Sie eine valide E-Mail Adresse an"
                            }
                        ]
                    },
                    "renderingOptions": [],
                    "validators": [
                        {
                            "identifier": "EmailAddress",
                            "code": 1221559976,
                            "errorMessage": "Bitte geben Sie eine valide E-Mail Adresse an"
                        },
                        {
                            "identifier": "NotEmpty",
                            "code": 1221560910,
                            "errorMessage": "Bitte geben Sie eine Email-Adresse ein"
                        }
                    ],
                    "name": "tx_form_formframework[contact-22616][email]"
                },
                {
                    "properties": {
                        "options": {
                            "1": "Ticketkauf",
                            "2": "Abonnement",
                            "3": "Digital Concert Hall",
                            "4": "Berliner Phiharmoniker Recordings",
                            "5": "Archiv",
                            "6": "Fundbüro",
                            "7": "Sonstiges"
                        },
                        "mails": {
                            "1": "tickets@berliner-philharmoniker.de",
                            "2": "abo@berliner-philharmoniker.de",
                            "3": "help@digitalconcerthall.com",
                            "4": "onlineshop@berliner-philharmoniker.de",
                            "5": "archiv@berliner-philharmoniker.de",
                            "6": "fundbuero@berliner-philharmoniker.de",
                            "7": "service@berliner-philharmoniker.de"
                        },
                        "elementDescription": "Thema mit Mail",
                        "fluidAdditionalAttributes": {
                            "required": "required"
                        },
                        "validationErrorMessages": [
                            {
                                "code": 1221560910,
                                "message": "Bitte wählen Sie ein Thema aus"
                            },
                            {
                                "code": 1221560718,
                                "message": "Bitte wählen Sie ein Thema aus"
                            },
                            {
                                "code": 1347992400,
                                "message": "Bitte wählen Sie ein Thema aus"
                            },
                            {
                                "code": 1347992453,
                                "message": "Bitte wählen Sie ein Thema aus"
                            }
                        ]
                    },
                    "type": "EmailSingleSelect",
                    "identifier": "contact-matter",
                    "label": "Thema",
                    "renderingOptions": [],
                    "validators": [
                        {
                            "identifier": "NotEmpty",
                            "code": 1221560910,
                            "errorMessage": "Bitte wählen Sie ein Thema aus"
                        }
                    ],
                    "name": "tx_form_formframework[contact-22616][contact-matter]"
                },
                {
                    "defaultValue": "",
                    "type": "Text",
                    "identifier": "subject",
                    "label": "Betreff",
                    "renderingOptions": [],
                    "properties": {
                        "fluidAdditionalAttributes": {
                            "required": "required"
                        },
                        "validationErrorMessages": [
                            {
                                "code": 1221560910,
                                "message": "Bitte geben Sie einen Betreff ein"
                            },
                            {
                                "code": 1221560718,
                                "message": "Bitte geben Sie einen Betreff ein"
                            },
                            {
                                "code": 1347992400,
                                "message": "Bitte geben Sie einen Betreff ein"
                            },
                            {
                                "code": 1347992453,
                                "message": "Bitte geben Sie einen Betreff ein"
                            }
                        ]
                    },
                    "validators": [
                        {
                            "identifier": "NotEmpty",
                            "code": 1221560910,
                            "errorMessage": "Bitte geben Sie einen Betreff ein"
                        }
                    ],
                    "name": "tx_form_formframework[contact-22616][subject]"
                },
                {
                    "defaultValue": "",
                    "type": "Textarea",
                    "identifier": "message",
                    "label": "Nachricht",
                    "properties": {
                        "fluidAdditionalAttributes": {
                            "required": "required",
                            "placeholder": "Ihre Nachricht hier..."
                        },
                        "validationErrorMessages": [
                            {
                                "code": 1221560910,
                                "message": "Bitte geben Sie Ihre Nachricht ein"
                            },
                            {
                                "code": 1221560718,
                                "message": "Bitte geben Sie Ihre Nachricht ein"
                            },
                            {
                                "code": 1347992400,
                                "message": "Bitte geben Sie Ihre Nachricht ein"
                            },
                            {
                                "code": 1347992453,
                                "message": "Bitte geben Sie Ihre Nachricht ein"
                            }
                        ]
                    },
                    "renderingOptions": [],
                    "validators": [
                        {
                            "identifier": "NotEmpty",
                            "code": 1221560910,
                            "errorMessage": "Bitte geben Sie Ihre Nachricht ein"
                        }
                    ],
                    "name": "tx_form_formframework[contact-22616][message]"
                },
                {
                    "properties": {
                        "width": "300",
                        "height": 100,
                        "fluidAdditionalAttributes": {
                            "required": "required"
                        },
                        "validationErrorMessages": [
                            {
                                "code": 1221560910,
                                "message": "Bitte geben Sie die Zeichen aus dem Bild ein"
                            },
                            {
                                "code": 1221560718,
                                "message": "Bitte geben Sie die Zeichen aus dem Bild ein"
                            },
                            {
                                "code": 1347992400,
                                "message": "Bitte geben Sie die Zeichen aus dem Bild ein"
                            },
                            {
                                "code": 1347992453,
                                "message": "Bitte geben Sie die Zeichen aus dem Bild ein"
                            }
                        ],
                        "refreshText": "Neues Bild generieren",
                        "disableJsonResponse": true,
                        "gencaptchaUri": "/gencaptcha/?uid=22616&identifier=contact-22616"
                    },
                    "type": "Oncaptcha",
                    "identifier": "oncaptcha-1",
                    "label": "Bitte geben Sie den angezeigten Text an",
                    "validators": [
                        {
                            "identifier": "Oncaptcha",
                            "code": 0,
                            "errorMessage": 0
                        },
                        {
                            "identifier": "NotEmpty",
                            "code": 1221560910,
                            "errorMessage": "Bitte geben Sie die Zeichen aus dem Bild ein"
                        }
                    ],
                    "name": "tx_form_formframework[contact-22616][oncaptcha-1]"
                },
                {
                    "properties": {
                        "fluidAdditionalAttributes": {
                            "required": "required"
                        },
                        "validationErrorMessages": [
                            {
                                "code": 1221560910,
                                "message": "Sie müssen die Datenschutzbestimmung akzeptieren"
                            },
                            {
                                "code": 1221560718,
                                "message": "Sie müssen die Datenschutzbestimmung akzeptieren"
                            },
                            {
                                "code": 1347992400,
                                "message": "Sie müssen die Datenschutzbestimmung akzeptieren"
                            },
                            {
                                "code": 1347992453,
                                "message": "Sie müssen die Datenschutzbestimmung akzeptieren"
                            }
                        ],
                        "content": "<div>                    \t\t\t\t\t<p>Ich akzeptiere die <a href=\"/datenschutz/\" title=\"Datenschutz\" target=\"_blank\">Datenschutzbestimmungen</a>.</p>\t\t    </div>"
                    },
                    "type": "Checkbox",
                    "identifier": "privacy-check",
                    "renderingOptions": [],
                    "validators": [
                        {
                            "identifier": "NotEmpty",
                            "code": 1221560910,
                            "errorMessage": "Sie müssen die Datenschutzbestimmung akzeptieren"
                        }
                    ],
                    "name": "tx_form_formframework[contact-22616][privacy-check]"
                },
                {
                    "properties": {
                        "containerClassAttribute": "input",
                        "elementClassAttribute": "",
                        "elementErrorClassAttribute": "error",
                        "renderAsHiddenField": false,
                        "styleAttribute": "position:absolute; margin:0 0 0 -999em;"
                    },
                    "type": "Honeypot",
                    "identifier": "TKDovNFcGtx7a5M3XfEgprAHR",
                    "label": "",
                    "name": "tx_form_formframework[contact-22616][TKDovNFcGtx7a5M3XfEgprAHR]"
                },
                {
                    "properties": [],
                    "type": "Hidden",
                    "identifier": "__currentPage",
                    "defaultValue": 1,
                    "label": "",
                    "name": "tx_form_formframework[contact-22616][__currentPage]"
                },
                {
                    "properties": [],
                    "type": "Hidden",
                    "identifier": "__trustedProperties",
                    "defaultValue": "{\"contact-22616\":{\"name\":1,\"email\":1,\"contact-matter\":1,\"subject\":1,\"message\":1,\"oncaptcha-1\":1,\"privacy-check\":1,\"TKDovNFcGtx7a5M3XfEgprAHR\":1,\"__currentPage\":1}}a7374e451e7697e10a23e2a00a51f1d5f8dac26e",
                    "label": "",
                    "name": "tx_form_formframework[contact-22616][__trustedProperties]"
                },
                {
                    "properties": [],
                    "type": "Hidden",
                    "identifier": "__state",
                    "defaultValue": "TzozOToiVFlQTzNcQ01TXEZvcm1cRG9tYWluXFJ1bnRpbWVcRm9ybVN0YXRlIjoyOntzOjI1OiIAKgBsYXN0RGlzcGxheWVkUGFnZUluZGV4IjtpOjA7czoxMzoiACoAZm9ybVZhbHVlcyI7YTowOnt9fQ==d48b984bc123981e8c4bdd84e0a06164d2ee0026",
                    "label": "",
                    "name": "tx_form_formframework[contact-22616][__state]"
                }
            ]

        }
    }
}



function addFormDefinitionToDOM() {
    window.extendedforms = forms;

    Object.keys(forms).forEach(key => {
        document.querySelector('main').innerHTML += `<div data-id="${key}"></div>`
    })
}

addFormDefinitionToDOM();