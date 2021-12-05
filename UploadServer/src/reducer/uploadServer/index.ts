import { createModel } from '@rematch/core'

import request from 'src/util/request'

import { RootModel } from '..'
import { UploadServerState, uploadServerType } from './type'

const initState: UploadServerState = {
    data: [],
}

export const uploadServer = createModel<RootModel>()({
    state: initState,
    reducers: {
        setData: (state, payload: uploadServerType[]) => ({
            ...state,
            data: payload,
        }),
    },
    effects: dispatch => ({
        async initData() {
            const data = await request('/uploadServer')

            if (data.uploadServerInfos) {
                dispatch.uploadServer.setData(data.uploadServerInfos)
            }
        },
    }),
})
