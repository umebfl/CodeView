import { createModel } from '@rematch/core'
import { dissoc } from 'ramda'

import { RootModel } from '..'
import { sourceType, sourcePropsType } from 'src/reducer/source/type'
import request from 'src/util/request'
import { optionSubNodeType } from 'src/reducer/userConfig/type'

const initState: sourceType = {
    data: {},
}

export const source = createModel<RootModel>()({
    state: initState,
    reducers: {
        setData: (state, payload: any) => ({
            ...state,
            data: payload,
        }),
    },

    effects: dispatch => ({
        async initData(_, rootState) {
            const {
                userConfig: { option },
            } = rootState

            const path = (option['root/code/path'] as optionSubNodeType).value

            const rv = await request({
                url: `/source/${path}`,
                dispatch,
            })

            if (rv.data) {
                dispatch.source.setData(rv.data)
            }
        },
    }),
})
