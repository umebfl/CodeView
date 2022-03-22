import { createModel } from '@rematch/core'

import { RootModel } from '..'
import { langSet, languagePropsType } from 'src/reducer/language/type'

const initState: languagePropsType = {
    lang: langSet.zh,
}

export const language = createModel<RootModel>()({
    state: initState,
    reducers: {
        setLang: (state, payload: langSet) => ({
            ...state,
            lang: payload,
        }),
        switchLang: state => ({
            ...state,
            lang: state.lang === langSet.en ? langSet.zh : langSet.en,
        }),
    },
})
