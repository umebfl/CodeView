import { createModel } from '@rematch/core'
import { dissoc } from 'ramda'

import { RootModel } from '..'
import { globalLoadingState } from 'src/reducer/globalLoading/type'

const initState: globalLoadingState = {
    loadingMap: {},
}

export const globalLoading = createModel<RootModel>()({
    state: initState,
    reducers: {
        add: (state, payload: string) => ({
            ...state,
            loadingMap: {
                ...state.loadingMap,
                [payload]: true,
            },
        }),
        pop: (state, payload: string) => ({
            ...state,
            loadingMap: dissoc(payload)(state.loadingMap),
        }),
    },
    effects: dispatch => ({
        async remove(payload: string) {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(true)
                }, 800)
            })

            dispatch.globalLoading.pop(payload)
        },
    }),
})
