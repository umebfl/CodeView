import { init, createModel, Models } from '@rematch/core'
import { dissoc } from 'ramda'

import { userConfig } from 'src/reducer/userConfig'

describe('Reducer - userConfig', () => {
    it('should set data', () => {
        const store = init({
            models: { userConfig } as any,
        })

        const { dispatch } = store

        dispatch.userConfig.set({ uploadServer: { viewType: 0 } })

        const data = store.getState().userConfig
        expect(data).toEqual({ uploadServer: { viewType: 0 } })
    })
})
