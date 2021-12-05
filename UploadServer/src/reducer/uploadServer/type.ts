export enum diskStatusType {
    UNMOUNT = 0,
    INVALID = 1,
    WAITING_TO_UPLOAD = 2,
    DATA_UPLOADING = 3,
    DATA_UPLOAD_FAILED = 4,
    DATA_UPLOADED = 5,
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
export interface uploadServerType {
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
        data: Array<uploadServerType>
    }
}

export type UploadServerState = {
    data: uploadServerType[]
}
