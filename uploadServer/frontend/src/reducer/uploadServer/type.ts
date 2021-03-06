export enum uploadStatusEnum {
    INVALID = 'INVALID',
    WAITING_TO_UPLOAD = 'WAITING_TO_UPLOAD',
    DATA_UPLOADING = 'DATA_UPLOADING',
    DATA_UPLOAD_FAILED = 'DATA_UPLOAD_FAILED',
    DATA_UPLOADED = 'DATA_UPLOADED',
    FORMATTED = 'FORMATTED',
    FINISHED_MANUALLY = 'FINISHED_MANUALLY',
    NULL = 'NULL',
    WRONGSERVER = 'WRONGSERVER',
}

export const UploadStatusConfig: Record<
    uploadStatusEnum,
    { name: string; color: string[]; icon: string }
> = {
    INVALID: {
        name: 'invalid',
        color: ['palette', 'error', 'dark'],
        icon: 'UploadOutlinedIcon',
    },
    WAITING_TO_UPLOAD: {
        name: 'waitingToUpload',
        color: ['palette', 'secondary', 'dark'],
        icon: 'UploadOutlinedIcon',
    },
    DATA_UPLOADING: {
        name: 'uploading',
        color: ['palette', 'primary', 'dark'],
        icon: 'UploadOutlinedIcon',
    },
    DATA_UPLOAD_FAILED: {
        name: 'uploadFailed',
        color: ['palette', 'error', 'dark'],
        icon: 'ReportGmailerrorredOutlinedIcon',
    },
    DATA_UPLOADED: {
        name: 'uploaded',
        color: ['palette', 'success', 'dark'],
        icon: 'CloudDoneOutlinedIcon',
    },
    FORMATTED: {
        name: 'finish',
        color: ['palette', 'success', 'main'],
        icon: 'CheckCircleOutlineIcon',
    },
    FINISHED_MANUALLY: {
        name: 'finish_manually',
        color: ['palette', 'success', 'main'],
        icon: 'CheckCircleOutlineIcon',
    },

    NULL: {
        name: '-',
        color: ['palette', 'grey', 'dark'],
        icon: 'null',
    },
    WRONGSERVER: {
        name: 'abnormalPairing',
        color: ['palette', 'error', 'main'],
        icon: 'ErrorOutlineOutlinedIcon',
    },
}

export interface diskInfoType {
    diskId: string
    diskName: string
    uploadStatus: uploadStatusEnum
    uploadStatusStr: string
    mountPoint: string
    invalidMsg: string
    recommendedServerId: string
    slotId: string
    updateTime: number
    updateTimeStr: string
    updateTimeShortStr: string
    tips: string
    vehicleIds: string[]
    wrongServer: boolean

    allRecords?: string[]
    waitingRecords?: string[]
    uploadingRecords?: string[]
    failedRecords?: string[]
    finishedRecords?: string[]

    diskPlugTime?: string
    startUploadTime?: string
    endUploadTime?: string

    timeConsuming?: string

    uploadFinishedRate?: number

    isMounted?: boolean
    inventoryStatus?: 'normal' | 'lost' | 'damaged'

    identified: boolean
}
export interface slotInfoType {
    diskInfo?: diskInfoType
    isEmpty: boolean
    slotBusId: string
    slotId: string
    seq: number
}

export interface uploadServerType {
    seq: number
    emptySlotsNum: number
    formattedDisksNum: number
    isRunning: boolean
    isRunningStr: string
    operationTips: string
    totalSlotsNum: number
    uploadServerId: string
    uploadServerLocation: string
    slotInfos: slotInfoType[]
    removableSlotsSequenceNums: number[]
}

export type UploadServerState = {
    data: uploadServerType[]
}
