import { addIndex, find, findIndex, map, propEq, update } from 'ramda'
import { createModel } from '@rematch/core'

import request from 'src/util/request'

import { RootModel } from '..'
import { DiskType, diskState, DiskResponseType } from 'src/reducer/disk/type'

const initState: diskState = {
    data: [],
}

export const disk = createModel<RootModel>()({
    state: initState,
    reducers: {
        setData: (state, payload: DiskType[]) => {
            return {
                ...state,
                data: payload,
            }
        },
    },
    effects: dispatch => ({
        async initData(_, rootState) {
            const data: DiskResponseType[] = await request({
                url: '/disk_management/get_disks_info',
                rootState,
                dispatch,
            })

            if (data) {
                const transData: DiskType[] = addIndex<DiskResponseType>(map)(
                    (disk: DiskResponseType, idx: number): DiskType => ({
                        id: idx,
                        diskId: disk.disk_sn,
                        owner: disk.owner,
                        inventoryStatus: disk.status,
                        onServer: disk.on_server,
                        comment: disk.comment,
                    })
                )(data)

                dispatch.disk.setData(transData)
            }
        },

        async changeDiskInfo(payload: DiskType, rootState) {
            console.log('payload', payload)

            try {
                await request({
                    url: '/disk_management/upsert_disk_info',
                    payload: {
                        method: 'POST',
                        body: JSON.stringify(payload),
                    },
                    rootState,
                    dispatch,
                })

                const idx = findIndex(
                    propEq('diskId', payload.diskId),
                    rootState.disk.data
                )

                const newData = update(idx, payload, rootState.disk.data)

                dispatch.disk.setData(newData)
            } catch (error) {
                console.error(error)
            }
        },
    }),
})
