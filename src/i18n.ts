import en from './locale/en.json'
import fr from './locale/fr.json'
import es from './locale/es.json'

import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
    locale: localStorage.getItem('lang') || 'en',
    messages: {
        en: en,
        fr: fr,
        es: es,
    }
})

