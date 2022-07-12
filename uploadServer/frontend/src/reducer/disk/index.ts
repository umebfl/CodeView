import {
    addIndex,
    find,
    findIndex,
    keys,
    map,
    propEq,
    reduce,
    take,
    update,
} from 'ramda'
import { createModel } from '@rematch/core'

import request from 'src/util/request'

import { RootModel } from '..'
import { DiskType, diskState, DiskResponseType } from 'src/reducer/disk/type'
import { DEFAULT_DATA_SOURCE } from 'src/reducer/userConfig'

const MAX_COMMENT_LEN = 120

const initState: diskState = {
    data: [],
    uploadRecords: {},
}

export const disk = createModel<RootModel>()({
    state: initState,
    reducers: {
        setData: (state, payload: Partial<diskState>) => {
            return {
                ...state,
                ...payload,
            }
        },
    },
    effects: dispatch => ({
        async initData(_, rootState) {
            const { dataSource } = rootState.userConfig

            const ds = dataSource || DEFAULT_DATA_SOURCE

            const data: {
                disks_info: DiskResponseType[]
            } = await request({
                url: `/disk_management/get_disks_info?region=${ds}`,
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

                dispatch.disk.setData({
                    data: transData,
                })
            }
        },

        async getUploadRecords(payload: string, rootState) {
            try {
                const data = await request({
                    url: `/disk_management/get_upload_records?disk_sn=${payload}`,
                    rootState,
                    dispatch,
                })
                const { disk } = rootState

                if (data.upload_records) {
                    dispatch.disk.setData({
                        uploadRecords: {
                            ...disk.uploadRecords,
                            [payload]: addIndex(map)(
                                (record: any, idx: number) => ({
                                    id: idx,
                                    seq: idx,
                                    uploadServerId: record.upload_server_id,
                                    uploadStartTime: record.upload_start_time,
                                    uploadEndTime: record.upload_end_time,
                                    diskPlugTime: record.disk_plug_time,
                                    vehicleId: record.vehicle_id,
                                    xrayUris: record.xray_uris,
                                    uploadStatus: record.upload_status,
                                })
                            )(data.upload_records),
                        },
                    })
                }
            } catch (error) {
                console.error(error)
            }
        },

        async stopUpload(
            payload: {
                serverId: string
                diskId: string
            },
            rootState
        ) {
            try {
                const rv = await request({
                    url: `/data_center/set_disk_finished_manually?upload_server_id=${payload.serverId}&disk_sn=${payload.diskId}`,
                    rootState,
                    dispatch,
                })

                return rv
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

            const fixParams = {
                ...params,
                comment: take(MAX_COMMENT_LEN, params.comment || ''),
            }

            const paramsKeys = keys(fixParams)
            const paramStr = reduce(
                (val: string, key: keyof DiskResponseType) => {
                    return `${val}${key}=${fixParams[key]}&`
                },
                ''
            )(paramsKeys)

            try {
                const rv = await request({
                    url: `/disk_management/upsert_disk_info?${paramStr}`,
                    rootState,
                    dispatch,
                })

                if (rv?.code === 0) {
                    const idx = findIndex(
                        propEq('diskId', newRow.diskId),
                        rootState.disk.data
                    )

                    const fixData = update(idx, newRow, rootState.disk.data)

                    dispatch.disk.setData({
                        data: fixData,
                    })

                    return true
                }

                return false
            } catch (error) {
                console.error(error)
            }
        },
    }),
})
