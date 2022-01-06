import { createModel } from '@rematch/core'
import { dissoc } from 'ramda'

import { RootModel } from '..'
import { globalLoadingType } from 'src/reducer/globalLoading/type'

const initState: globalLoadingType = {
    loadingMap: {},
}

export const globalLoading = createModel<RootModel>()({
    state: initState,
    reducers: {
        push: (state, payload: symbol) => ({
            ...state,
            loadingMap: {
                ...state.loadingMap,
                [payload]: true,
            },
        }),
        pop: (state, payload: symbol) => ({
            ...state,
            loadingMap: dissoc(payload as unknown as string)(state.loadingMap),
        }),
    },
    effects: dispatch => ({
        async remove(payload: symbol) {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(true)
                }, 800)
            })

            dispatch.globalLoading.pop(payload)
        },
    }),
})
