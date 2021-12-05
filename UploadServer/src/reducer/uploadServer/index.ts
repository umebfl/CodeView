// TODO i
export enum diskStatusType {
    UNMOUNT = 0,
    INVALID = 1,
    WAITING_TO_UPLOAD = 2,
    DATA_UPLOADING = 3,
    DATA_UPLOAD_FAILED = 4,
    DATA_UPLOADED = 5, //# TODO(YiFan): how to set this status?
    FORMATTED = 6,
}

export interface diskInfoType {
    diskId: string
    diskName: string
    diskStatus: diskStatusType
    invalidMsg: string
    recommendedServerId: string
    slotId: number
    updateTime: number
    vehicleIds: string[]
    wrongServer: boolean
}
export interface slotInfoType {
    diskInfo: diskInfoType
    isEmpty: boolean
    slotBusId: string
    slotId: number
}
export interface serverType {
    emptySlotsNum: number
    formattedDisksNum: number
    isRunning: boolean
    totalSlotsNum: number
    uploadServerId: string
    uploadServerLocation: string
    slotInfos: slotInfoType[]
}

export interface stateType {
    uploadServer: {
        data: Array<serverType>
    }
}

export const initState: stateType = {
    uploadServer: {
        data: [],
    },
}

const reducer = {
    'uploadServer/setData': (
        state: { uploadServer: stateType },
        payload: typeof initState.uploadServer.data
    ) => {
        return {
            ...state,
            uploadServer: {
                ...state.uploadServer,
                data: payload,
            },
        }
    },
}

const asyncReducer = {
    test: (state: any, payload: any, dispatch: any) => {
        dispatch({
            type: 'uploadServer/setData',
            payload: [{}],
        })
    },
}

const UploadServer = {
    initState,
    reducer,
    asyncReducer,
}

export default UploadServer
