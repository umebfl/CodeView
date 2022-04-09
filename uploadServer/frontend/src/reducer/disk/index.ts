import { createModel } from '@rematch/core'

import request from 'src/util/request'

import { RootModel } from '..'
import { diskType, diskState } from 'src/reducer/disk/type'

const initState: diskState = {
    data: [],
}

export const disk = createModel<RootModel>()({
    state: initState,
    reducers: {
        setData: (state, payload: diskType[]) => {
            return {
                ...state,
                data: payload,
            }
        },
    },
    effects: dispatch => ({
        async initData(_, rootState) {
            const data = await request({
                url: '/data_center/get_disk_list',
                rootState,
                dispatch,
            })

            if (data?.diskInfos) {
                dispatch.disk.setData(data.diskInfos)
            }
        },

        async changeDiskInventoryStatus(
            payload: { diskID: string; status: string },
            rootState
        ) {
            const data = await request({
                url: '/data_center/change_disk_inventory_status',
                payload: {
                    method: 'POST',
                    body: JSON.stringify(payload),
                },
                rootState,
                dispatch,
            })

            if (data?.diskInfos) {
                dispatch.disk.setData(data.diskInfos)
            }
        },
    }),
})
