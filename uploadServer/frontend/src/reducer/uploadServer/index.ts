import { createModel } from '@rematch/core'
import moment from 'moment'

import request from 'src/util/request'

import { RootModel } from '..'
import {
    UploadServerState,
    uploadServerType,
    slotInfoType,
    DiskStatusConfig,
    diskStatusEnum,
} from 'src/reducer/uploadServer/type'
import { map } from 'ramda'
import { tranText } from 'src/hooks/language'
import { langSet } from 'src/reducer/language/type'

const initState: UploadServerState = {
    data: [],
}

export const uploadServer = createModel<RootModel>()({
    state: initState,
    reducers: {
        setData: (
            state,
            {
                lang,
                payload,
            }: {
                lang: langSet
                payload: uploadServerType[]
            }
        ) => {
            const t = tranText(lang)

            const fixData = map((item: uploadServerType) => ({
                ...item,

                isRunningStr: item.isRunning ? 'running' : 'close',

                operationTips: '-',

                slotInfos: map((slot: slotInfoType) => ({
                    ...slot,
                    ...(slot.diskInfo
                        ? {
                              diskInfo: {
                                  ...slot.diskInfo,

                                  mountPoint: slot.diskInfo.mountPoint || '',

                                  updateTimeStr: new Date(
                                      slot.diskInfo.updateTime * 1000
                                  ).toLocaleString(),

                                  updateTimeShortStr: moment(
                                      slot.diskInfo.updateTime * 1000
                                  ).format('MM-DD HH:MM:ss'),

                                  diskStatus: slot.diskInfo.wrongServer
                                      ? diskStatusEnum.WRONGSERVER
                                      : slot.diskInfo?.diskStatus,

                                  diskStatusStr: slot.diskInfo.wrongServer
                                      ? DiskStatusConfig[
                                            diskStatusEnum.WRONGSERVER
                                        ].name
                                      : DiskStatusConfig[
                                            slot.diskInfo.diskStatus
                                        ].name,

                                  uploadFinishedRate:
                                      slot.diskInfo.finishedRecords &&
                                      slot.diskInfo.allRecords
                                          ? (slot.diskInfo.finishedRecords
                                                ?.length /
                                                slot.diskInfo.allRecords
                                                    ?.length) *
                                            100
                                          : 0,

                                  timeConsuming:
                                      slot.diskInfo.startUploadTime?.length &&
                                      slot.diskInfo.endUploadTime?.length
                                          ? moment(slot.diskInfo.endUploadTime)
                                                .diff(
                                                    moment(
                                                        slot.diskInfo
                                                            .startUploadTime
                                                    ),
                                                    'h',
                                                    true
                                                )
                                                .toFixed(2)
                                          : '',

                                  tips: slot.diskInfo.wrongServer
                                      ? `${t('pleasePlugThisHardDiskInto')}: ${
                                            slot.diskInfo.recommendedServerId
                                        }`
                                      : slot.diskInfo.diskStatus ===
                                        diskStatusEnum.FORMATTED
                                      ? t('pleaseUnplugTheHardDisk')
                                      : slot.diskInfo?.invalidMsg,
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
        async initData(_, rootState) {
            console.log(rootState)

            const data = await request({
                url: '/data_center/get_upload_server_list',
                rootState,
                dispatch,
            })

            if (data?.uploadServerInfos) {
                dispatch.uploadServer.setData({
                    lang: rootState.language.lang,
                    payload: data.uploadServerInfos,
                })
            }
        },
    }),
})
