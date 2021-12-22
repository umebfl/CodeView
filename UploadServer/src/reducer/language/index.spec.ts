import { init, createModel, Models } from '@rematch/core'
import { dissoc } from 'ramda'

import { language } from 'src/reducer/language'
import { langSet } from './type'

describe('Reducer - language', () => {
    it('should switch language', () => {
        const store = init({
            models: { language } as any,
        })

        const { dispatch } = store

        const data = store.getState().language
        expect(data).toEqual({ lang: langSet.zh })

        dispatch.language.switchLang()
        const newData = store.getState().language
        expect(newData).toEqual({ lang: langSet.en })

        dispatch.language.switchLang()
        const newData2 = store.getState().language
        expect(newData2).toEqual({ lang: langSet.zh })
    })

    it('should set language', () => {
        const store = init({
            models: { language } as any,
        })

        const { dispatch } = store

        const data = store.getState().language
        expect(data).toEqual({ lang: langSet.zh })

        dispatch.language.setLang(langSet.en)

        const newData = store.getState().language
        expect(newData).toEqual({ lang: langSet.en })
    })
})
