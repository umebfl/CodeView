import { createModel } from '@rematch/core'

import { RootModel } from '..'
import { snackbarType, snackbarPropsType } from 'src/reducer/snackbar/type'
import { dissoc } from 'ramda'

const initState: snackbarType = {
    data: {},
}

export const snackbar = createModel<RootModel>()({
    state: initState,
    reducers: {
        push: (state, payload: snackbarPropsType) => ({
            ...state,
            data: {
                ...state.data,
                [payload.timeStamp]: payload,
            },
        }),
        pop: (state, payload: number) => ({
            ...state,
            data: dissoc(payload)(state.data),
        }),
    },
})
