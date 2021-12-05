import { map, reduce } from 'ramda'
import React, { useReducer } from 'react'

import uploadServer from 'src/reducer/uploadServer'
import { stateLog } from 'src/util/loger'

export interface IReducer {
    initState: any
    reducer: Record<string, Function>
    asyncReducer: Record<string, Function>
}

const buildReducer = (payload: IReducer[]) => {
    return reduce(
        (val: any, item: any) => {
            return {
                initState: {
                    ...val.initState,
                    ...item.initState,
                },
                rootReducer: {
                    ...val.rootReducer,
                    ...item.reducer,
                },
                rootAsyncReducer: {
                    ...val.rootAsyncReducer,
                    ...item.asyncReducer,
                },
            }
        },
        { initState: {}, rootReducer: {}, rootAsyncReducer: {} }
    )(payload)
}

const bind = buildReducer([uploadServer])

const reducer = (state: any, action: { type: string; payload: any }) => {
    const fn = bind.rootReducer[action.type]

    if (!fn) {
        throw new Error('action type no found!')
    }

    const nextState = fn(state, action.payload)

    stateLog(state, nextState, action)

    return nextState
}

export const initState = bind.initState

export const useTest = () => {
    const rv = useReducer(reducer, initState)

    const state = rv[0]
    const _dispatch = rv[1]

    const dispatch = (payload: { type: string; payload: any }) => {
        let fn = bind.rootReducer[payload.type]

        if (fn) {
            fn = bind.rootReducer[payload.type]
            _dispatch(payload)
        } else {
            fn = bind.rootAsyncReducer[payload.type]

            if (fn) {
                fn(state, payload.payload, _dispatch)
            }
        }
    }

    return [state, dispatch]
}

export default reducer
