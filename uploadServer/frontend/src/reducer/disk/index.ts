import { addIndex, find, findIndex, map, propEq, update } from 'ramda'
import { createModel } from '@rematch/core'

import request from 'src/util/request'

import { RootModel } from '..'
import {
    DiskType,
    diskState,
    DiskResponseType,
    DiskOwnerType,
} from 'src/reducer/disk/type'

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
            const data: {
                disks_info: DiskResponseType[]
            } = await request({
                url: '/disk_management/get_disks_info',
                rootState,
                dispatch,
            })

            const { disks_info } = data

            if (disks_info) {
                const transData: DiskType[] = addIndex<DiskResponseType>(map)(
                    (disk: DiskResponseType, idx: number): DiskType => ({
                        id: idx,
                        diskId: disk.disk_sn,
                        owner: disk.owner,
                        inventoryStatus: disk.status,
                        onServer: disk.on_server,
                        comment: disk.comment,
                    })
                )(disks_info)

                dispatch.disk.setData(transData)
            }
        },

        async getUploadRecords(payload: string, rootState) {
            try {
                // const data = await request({
                //     url: '/disk_management/get_upload_records',
                //     payload: {
                //         method: 'POST',
                //         body: JSON.stringify({
                //             disk_sn: payload,
                //         }),
                //     },
                //     rootState,
                //     dispatch,
                // })
                // 获取结果
                // 插入到数据行
                // 设置到store
            } catch (error) {
                console.error(error)
            }
        },

        async changeDiskInfo(
            payload: {
                newRow: DiskType
                params: DiskResponseType
            },
            rootState
        ) {
            const { newRow, params } = payload

            try {
                await request({
                    url: '/disk_management/upsert_disk_info',
                    payload: {
                        method: 'POST',
                        body: JSON.stringify(params),
                    },
                    rootState,
                    dispatch,
                })

                const idx = findIndex(
                    propEq('diskId', newRow.diskId),
                    rootState.disk.data
                )

                const fixData = update(idx, newRow, rootState.disk.data)

                dispatch.disk.setData(fixData)
            } catch (error) {
                console.error(error)
            }
        },
    }),
})
