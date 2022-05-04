import { createModel } from '@rematch/core'

import request from 'src/util/request'

import { RootModel } from '..'
import {
    diskPAURecordsType,
    diskPAURecordsState,
} from 'src/reducer/diskPAURecords/type'

const initState: diskPAURecordsState = {
    data: [],
}

export const diskPAURecords = createModel<RootModel>()({
    state: initState,
    reducers: {
        setData: (state, payload: diskPAURecordsType[]) => {
            return {
                ...state,
                data: payload,
            }
        },
    },
    effects: dispatch => ({
        async initData(_, rootState) {
            const data = await request({
                url: '/data_center/get_diskPAURecords_list',
                rootState,
                dispatch,
            })

            if (data?.diskPAURecords) {
                dispatch.diskPAURecords.setData(data.diskPAURecords)
            }
        },
    }),
})
