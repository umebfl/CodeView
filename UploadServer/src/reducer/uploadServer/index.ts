import { createModel } from '@rematch/core'

import request from 'src/util/request'

import { RootModel } from '..'
import {
    UploadServerState,
    uploadServerType,
    slotInfoType,
    DiskStatusConfig,
} from 'src/reducer/uploadServer/type'
import { map } from 'ramda'

const initState: UploadServerState = {
    data: [],
}

export const uploadServer = createModel<RootModel>()({
    state: initState,
    reducers: {
        setData: (state, payload: uploadServerType[]) => {
            const fixData = map((item: uploadServerType) => ({
                ...item,

                isRunningStr: item.isRunning ? '运行中' : '关闭',
                operationTips: '-',

                slotInfos: map((slot: slotInfoType) => ({
                    ...slot,
                    ...(slot.diskInfo
                        ? {
                              diskInfo: {
                                  ...slot.diskInfo,
                                  updateTimeStr:
                                      slot.diskInfo &&
                                      new Date(
                                          slot.diskInfo.updateTime * 1000
                                      ).toLocaleString(),
                                  diskStatusStr:
                                      slot.diskInfo &&
                                      DiskStatusConfig[slot.diskInfo.diskStatus]
                                          .name,
                              },
                          }
                        : {}),
                }))(item.slotInfos),
            }))(payload)

            return {
                ...state,
                data: fixData,
            }
        },
    },
    effects: dispatch => ({
        async initData() {
            const data = await request({
                url: '/data_center/get_upload_server_list',
                dispatch,
            })

            if (data?.uploadServerInfos) {
                dispatch.uploadServer.setData(data.uploadServerInfos)
            }
        },
    }),
})
