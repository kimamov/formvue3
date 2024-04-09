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
    },
    "cancellation-subscription-24921": {
        configuration: {
            "id": "cancellation-subscription-24921",
            "api": {
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
            "global": {
                "labels": {
                    "error": "Ein Fehler ist aufgetreten, bitte kontaktieren Sie den Webseitenbetreiber"
                }
            },
            "action": "https://www.berliner-philharmoniker.de/konzerte/abonnements/kuendigung-abo/sendform/#cancellation-subscription-24921",
            "i18n": "de-DE",
            "elements": [
                {
                    "properties": {
                        "options": {
                            "female": "Frau",
                            "male": "Herr",
                            "divers": "divers"
                        }
                    },
                    "type": "SingleSelect",
                    "identifier": "salutation",
                    "label": "Anrede",
                    "renderingOptions": [],
                    "name": "tx_form_formframework[cancellation-subscription-24921][salutation]"
                },
                {
                    "defaultValue": "",
                    "type": "Text",
                    "identifier": "firstname",
                    "label": "Vorname",
                    "properties": {
                        "fluidAdditionalAttributes": {
                            "minlength": "2",
                            "maxlength": "40",
                            "required": "required"
                        },
                        "validationErrorMessages": [
                            {
                                "code": 1238110957,
                                "message": "Bitte geben Sie einen Namen mit mindestens 2 und maximal 40 Zeichen an"
                            },
                            {
                                "code": 1269883975,
                                "message": "Bitte geben Sie einen Namen mit mindestens 2 und maximal 40 Zeichen an"
                            },
                            {
                                "code": 1428504122,
                                "message": "Bitte geben Sie einen Namen mit mindestens 2 und maximal 40 Zeichen an"
                            },
                            {
                                "code": 1238108068,
                                "message": "Bitte geben Sie einen Namen mit mindestens 2 und maximal 40 Zeichen an"
                            },
                            {
                                "code": 1238108069,
                                "message": "Bitte geben Sie einen Namen mit mindestens 2 und maximal 40 Zeichen an"
                            },
                            {
                                "code": 1221560910,
                                "message": "Bitte geben Sie Ihren Vornamen an"
                            },
                            {
                                "code": 1221560718,
                                "message": "Bitte geben Sie Ihren Vornamen an"
                            },
                            {
                                "code": 1347992400,
                                "message": "Bitte geben Sie Ihren Vornamen an"
                            },
                            {
                                "code": 1347992453,
                                "message": "Bitte geben Sie Ihren Vornamen an"
                            }
                        ]
                    },
                    "renderingOptions": [],
                    "validators": [
                        {
                            "options": {
                                "minimum": "2",
                                "maximum": "40"
                            },
                            "identifier": "StringLength",
                            "code": 1428504122,
                            "errorMessage": "Bitte geben Sie einen Namen mit mindestens 2 und maximal 40 Zeichen an"
                        },
                        {
                            "identifier": "NotEmpty",
                            "code": 1221560910,
                            "errorMessage": "Bitte geben Sie Ihren Vornamen an"
                        }
                    ],
                    "name": "tx_form_formframework[cancellation-subscription-24921][firstname]"
                },
                {
                    "defaultValue": "",
                    "type": "Text",
                    "identifier": "name",
                    "label": "Nachname",
                    "properties": {
                        "elementDescription": "",
                        "fluidAdditionalAttributes": {
                            "required": "required",
                            "minlength": "2",
                            "maxlength": "40"
                        },
                        "validationErrorMessages": [
                            {
                                "code": 1221560910,
                                "message": "Bitte geben Sie Ihren Nachnamen an"
                            },
                            {
                                "code": 1221560718,
                                "message": "Bitte geben Sie Ihren Nachnamen an"
                            },
                            {
                                "code": 1347992400,
                                "message": "Bitte geben Sie Ihren Nachnamen an"
                            },
                            {
                                "code": 1347992453,
                                "message": "Bitte geben Sie Ihren Nachnamen an"
                            },
                            {
                                "code": 1238110957,
                                "message": "Bitte geben Sie einen Namen mit mindestens 2 und maximal 40 Zeichen an"
                            },
                            {
                                "code": 1269883975,
                                "message": "Bitte geben Sie einen Namen mit mindestens 2 und maximal 40 Zeichen an"
                            },
                            {
                                "code": 1428504122,
                                "message": "Bitte geben Sie einen Namen mit mindestens 2 und maximal 40 Zeichen an"
                            },
                            {
                                "code": 1238108068,
                                "message": "Bitte geben Sie einen Namen mit mindestens 2 und maximal 40 Zeichen an"
                            },
                            {
                                "code": 1238108069,
                                "message": "Bitte geben Sie einen Namen mit mindestens 2 und maximal 40 Zeichen an"
                            }
                        ]
                    },
                    "renderingOptions": [],
                    "validators": [
                        {
                            "identifier": "NotEmpty",
                            "code": 1221560910,
                            "errorMessage": "Bitte geben Sie Ihren Nachnamen an"
                        },
                        {
                            "options": {
                                "minimum": "2",
                                "maximum": "40"
                            },
                            "identifier": "StringLength",
                            "code": 1428504122,
                            "errorMessage": "Bitte geben Sie einen Namen mit mindestens 2 und maximal 40 Zeichen an"
                        }
                    ],
                    "name": "tx_form_formframework[cancellation-subscription-24921][name]"
                },
                {
                    "type": "GridRow",
                    "identifier": "gridrow-1",
                    "label": "Addresszeile",
                    "defaultValue": null,
                    "properties": [],
                    "elements": [
                        {
                            "defaultValue": "",
                            "type": "Text",
                            "identifier": "street",
                            "label": "Straße",
                            "properties": {
                                "fluidAdditionalAttributes": {
                                    "required": "required"
                                },
                                "validationErrorMessages": [
                                    {
                                        "code": 1221560910,
                                        "message": "Bitte geben Sie Ihre Straße an"
                                    },
                                    {
                                        "code": 1221560718,
                                        "message": "Bitte geben Sie Ihre Straße an"
                                    },
                                    {
                                        "code": 1347992400,
                                        "message": "Bitte geben Sie Ihre Straße an"
                                    },
                                    {
                                        "code": 1347992453,
                                        "message": "Bitte geben Sie Ihre Straße an"
                                    }
                                ],
                                "gridColumnClassAutoConfiguration": {
                                    "viewPorts": {
                                        "lg": {
                                            "numbersOfColumnsToUse": "8"
                                        }
                                    }
                                }
                            },
                            "renderingOptions": [],
                            "validators": [
                                {
                                    "identifier": "NotEmpty",
                                    "code": 1221560910,
                                    "errorMessage": "Bitte geben Sie Ihre Straße an"
                                }
                            ],
                            "name": "tx_form_formframework[cancellation-subscription-24921][street]"
                        },
                        {
                            "defaultValue": "",
                            "type": "Text",
                            "identifier": "houseno",
                            "label": "Hausnummer",
                            "renderingOptions": [],
                            "properties": {
                                "fluidAdditionalAttributes": {
                                    "required": "required"
                                },
                                "validationErrorMessages": [
                                    {
                                        "code": 1221560910,
                                        "message": "Bitte geben Sie Ihre Hausnummer an"
                                    },
                                    {
                                        "code": 1221560718,
                                        "message": "Bitte geben Sie Ihre Hausnummer an"
                                    },
                                    {
                                        "code": 1347992400,
                                        "message": "Bitte geben Sie Ihre Hausnummer an"
                                    },
                                    {
                                        "code": 1347992453,
                                        "message": "Bitte geben Sie Ihre Hausnummer an"
                                    }
                                ],
                                "gridColumnClassAutoConfiguration": {
                                    "viewPorts": {
                                        "lg": {
                                            "numbersOfColumnsToUse": "4"
                                        }
                                    }
                                }
                            },
                            "validators": [
                                {
                                    "identifier": "NotEmpty",
                                    "code": 1221560910,
                                    "errorMessage": "Bitte geben Sie Ihre Hausnummer an"
                                }
                            ],
                            "name": "tx_form_formframework[cancellation-subscription-24921][houseno]"
                        }
                    ]
                },
                {
                    "defaultValue": "",
                    "type": "Text",
                    "identifier": "postalcode",
                    "label": "PLZ",
                    "properties": {
                        "fluidAdditionalAttributes": {
                            "required": "required"
                        },
                        "validationErrorMessages": [
                            {
                                "code": 1221560910,
                                "message": "Bitte geben Sie Ihre Postleitzahl an"
                            },
                            {
                                "code": 1221560718,
                                "message": "Bitte geben Sie Ihre Postleitzahl an"
                            },
                            {
                                "code": 1347992400,
                                "message": "Bitte geben Sie Ihre Postleitzahl an"
                            },
                            {
                                "code": 1347992453,
                                "message": "Bitte geben Sie Ihre Postleitzahl an"
                            }
                        ]
                    },
                    "renderingOptions": [],
                    "validators": [
                        {
                            "identifier": "NotEmpty",
                            "code": 1221560910,
                            "errorMessage": "Bitte geben Sie Ihre Postleitzahl an"
                        }
                    ],
                    "name": "tx_form_formframework[cancellation-subscription-24921][postalcode]"
                },
                {
                    "defaultValue": "",
                    "type": "Text",
                    "identifier": "city",
                    "label": "Stadt",
                    "properties": {
                        "fluidAdditionalAttributes": {
                            "required": "required"
                        },
                        "validationErrorMessages": [
                            {
                                "code": 1221560910,
                                "message": "Bitte geben Sie Ihre Stadt an"
                            },
                            {
                                "code": 1221560718,
                                "message": "Bitte geben Sie Ihre Stadt an"
                            },
                            {
                                "code": 1347992400,
                                "message": "Bitte geben Sie Ihre Stadt an"
                            },
                            {
                                "code": 1347992453,
                                "message": "Bitte geben Sie Ihre Stadt an"
                            }
                        ]
                    },
                    "renderingOptions": [],
                    "validators": [
                        {
                            "identifier": "NotEmpty",
                            "code": 1221560910,
                            "errorMessage": "Bitte geben Sie Ihre Stadt an"
                        }
                    ],
                    "name": "tx_form_formframework[cancellation-subscription-24921][city]"
                },
                {
                    "defaultValue": "",
                    "type": "Text",
                    "identifier": "country",
                    "label": "Land",
                    "renderingOptions": [],
                    "properties": [],
                    "name": "tx_form_formframework[cancellation-subscription-24921][country]"
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
                                "message": "Bitte geben Sie Ihre E-Mail Adresse an"
                            },
                            {
                                "code": 1221560718,
                                "message": "Bitte geben Sie Ihre E-Mail Adresse an"
                            },
                            {
                                "code": 1347992400,
                                "message": "Bitte geben Sie Ihre E-Mail Adresse an"
                            },
                            {
                                "code": 1347992453,
                                "message": "Bitte geben Sie Ihre E-Mail Adresse an"
                            },
                            {
                                "code": 1221559976,
                                "message": "Bitte geben Sie eine gültige E-Mail Addresse an"
                            }
                        ]
                    },
                    "renderingOptions": [],
                    "validators": [
                        {
                            "identifier": "EmailAddress",
                            "code": 1221559976,
                            "errorMessage": "Bitte geben Sie eine gültige E-Mail Addresse an"
                        },
                        {
                            "identifier": "NotEmpty",
                            "code": 1221560910,
                            "errorMessage": "Bitte geben Sie Ihre E-Mail Adresse an"
                        }
                    ],
                    "name": "tx_form_formframework[cancellation-subscription-24921][email]"
                },
                {
                    "defaultValue": "",
                    "type": "Text",
                    "identifier": "customer-number",
                    "label": "Kundennummer",
                    "renderingOptions": [],
                    "properties": {
                        "fluidAdditionalAttributes": {
                            "required": "required"
                        },
                        "validationErrorMessages": [
                            {
                                "code": 1221560910,
                                "message": "Bitte geben Sie Ihre Kundennummer an"
                            },
                            {
                                "code": 1221560718,
                                "message": "Bitte geben Sie Ihre Kundennummer an"
                            },
                            {
                                "code": 1347992400,
                                "message": "Bitte geben Sie Ihre Kundennummer an"
                            },
                            {
                                "code": 1347992453,
                                "message": "Bitte geben Sie Ihre Kundennummer an"
                            }
                        ]
                    },
                    "validators": [
                        {
                            "identifier": "NotEmpty",
                            "code": 1221560910,
                            "errorMessage": "Bitte geben Sie Ihre Kundennummer an"
                        }
                    ],
                    "name": "tx_form_formframework[cancellation-subscription-24921][customer-number]"
                },
                {
                    "defaultValue": "",
                    "type": "Text",
                    "identifier": "subscription",
                    "label": "Aboreihe",
                    "properties": {
                        "fluidAdditionalAttributes": {
                            "required": "required"
                        },
                        "validationErrorMessages": [
                            {
                                "code": 1221560910,
                                "message": "Bitte geben Sie die Aboreihe an, die Sie kündigen möchten"
                            },
                            {
                                "code": 1221560718,
                                "message": "Bitte geben Sie die Aboreihe an, die Sie kündigen möchten"
                            },
                            {
                                "code": 1347992400,
                                "message": "Bitte geben Sie die Aboreihe an, die Sie kündigen möchten"
                            },
                            {
                                "code": 1347992453,
                                "message": "Bitte geben Sie die Aboreihe an, die Sie kündigen möchten"
                            }
                        ]
                    },
                    "renderingOptions": [],
                    "validators": [
                        {
                            "identifier": "NotEmpty",
                            "code": 1221560910,
                            "errorMessage": "Bitte geben Sie die Aboreihe an, die Sie kündigen möchten"
                        }
                    ],
                    "name": "tx_form_formframework[cancellation-subscription-24921][subscription]"
                },
                {
                    "properties": {
                        "text": "Wir möchten unseren Service für unsere Abonnent*innen permanent verbessern und würden uns daher freuen, wenn Sie uns mitteilen, warum Sie Ihr Abo kündigen."
                    },
                    "type": "StaticText",
                    "identifier": "text-reason",
                    "label": "",
                    "renderingOptions": [],
                    "name": "tx_form_formframework[cancellation-subscription-24921][text-reason]"
                },
                {
                    "defaultValue": "",
                    "type": "Textarea",
                    "identifier": "reasons",
                    "label": "Kündigungsgrund",
                    "renderingOptions": [],
                    "properties": {
                        "elementDescription": ""
                    },
                    "name": "tx_form_formframework[cancellation-subscription-24921][reasons]"
                },
                {
                    "properties": {
                        "text": "Gibt es noch etwas, was Sie uns sagen möchten?"
                    },
                    "type": "StaticText",
                    "identifier": "text-feedback",
                    "label": "",
                    "renderingOptions": [],
                    "name": "tx_form_formframework[cancellation-subscription-24921][text-feedback]"
                },
                {
                    "defaultValue": "",
                    "type": "Textarea",
                    "identifier": "feedback",
                    "label": "Feedback oder Anregungen",
                    "renderingOptions": [],
                    "properties": [],
                    "name": "tx_form_formframework[cancellation-subscription-24921][feedback]"
                },
                {
                    "properties": {
                        "width": "300",
                        "height": 100,
                        "refreshText": "Neues Bild generieren",
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
                        "disableJsonResponse": true,
                        "gencaptchaUri": "/gencaptcha/?uid=24921&identifier=cancellation-subscription-24921"
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
                    "name": "tx_form_formframework[cancellation-subscription-24921][oncaptcha-1]"
                },
                {
                    "properties": {
                        "fluidAdditionalAttributes": {
                            "required": "required"
                        },
                        "validationErrorMessages": [
                            {
                                "code": 1221560910,
                                "message": "Sie müssen die Datenschutzbestimmungen akzeptieren"
                            },
                            {
                                "code": 1221560718,
                                "message": "Sie müssen die Datenschutzbestimmungen akzeptieren"
                            },
                            {
                                "code": 1347992400,
                                "message": "Sie müssen die Datenschutzbestimmungen akzeptieren"
                            },
                            {
                                "code": 1347992453,
                                "message": "Sie müssen die Datenschutzbestimmungen akzeptieren"
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
                            "errorMessage": "Sie müssen die Datenschutzbestimmungen akzeptieren"
                        }
                    ],
                    "name": "tx_form_formframework[cancellation-subscription-24921][privacy-check]"
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
                    "identifier": "s6KRfJLj5MbxAcYhikpCnN8PDV",
                    "label": "",
                    "name": "tx_form_formframework[cancellation-subscription-24921][s6KRfJLj5MbxAcYhikpCnN8PDV]"
                },
                {
                    "properties": [],
                    "type": "Hidden",
                    "identifier": "__currentPage",
                    "defaultValue": 1,
                    "label": "",
                    "name": "tx_form_formframework[cancellation-subscription-24921][__currentPage]"
                },
                {
                    "properties": [],
                    "type": "Hidden",
                    "identifier": "__trustedProperties",
                    "defaultValue": "{\"cancellation-subscription-24921\":{\"salutation\":1,\"firstname\":1,\"name\":1,\"street\":1,\"houseno\":1,\"postalcode\":1,\"city\":1,\"country\":1,\"email\":1,\"customer-number\":1,\"subscription\":1,\"text-reason\":1,\"reasons\":1,\"text-feedback\":1,\"feedback\":1,\"oncaptcha-1\":1,\"privacy-check\":1,\"s6KRfJLj5MbxAcYhikpCnN8PDV\":1,\"__currentPage\":1}}0726abcd2cbef5c2c720e490d112a136a53265d5",
                    "label": "",
                    "name": "tx_form_formframework[cancellation-subscription-24921][__trustedProperties]"
                },
                {
                    "properties": [],
                    "type": "Hidden",
                    "identifier": "__state",
                    "defaultValue": "TzozOToiVFlQTzNcQ01TXEZvcm1cRG9tYWluXFJ1bnRpbWVcRm9ybVN0YXRlIjoyOntzOjI1OiIAKgBsYXN0RGlzcGxheWVkUGFnZUluZGV4IjtpOjA7czoxMzoiACoAZm9ybVZhbHVlcyI7YTowOnt9fQ==d48b984bc123981e8c4bdd84e0a06164d2ee0026",
                    "label": "",
                    "name": "tx_form_formframework[cancellation-subscription-24921][__state]"
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