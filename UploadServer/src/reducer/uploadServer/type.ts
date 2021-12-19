export enum diskStatusEnum {
    UNMOUNT = 'UNMOUNT',
    INVALID = 'INVALID',
    WAITING_TO_UPLOAD = 'WAITING_TO_UPLOAD',
    DATA_UPLOADING = 'DATA_UPLOADING',
    DATA_UPLOAD_FAILED = 'DATA_UPLOAD_FAILED',
    DATA_UPLOADED = 'DATA_UPLOADED',
    FORMATTED = 'FORMATTED',
    NULL = 'NULL',
    WRONGSERVER = 'WRONGSERVER',
}

export const DiskStatusConfig: Record<
    diskStatusEnum,
    { name: string; color: string[]; icon: string }
> = {
    UNMOUNT: {
        name: '未挂载',
        color: ['palette', 'warning', 'dark'],
        icon: 'DiscFullOutlinedIcon',
    },
    INVALID: {
        name: '异常',
        color: ['palette', 'error', 'dark'],
        icon: 'UploadOutlinedIcon',
    },
    WAITING_TO_UPLOAD: {
        name: '等待上传',
        color: ['palette', 'secondary', 'dark'],
        icon: 'UploadOutlinedIcon',
    },
    DATA_UPLOADING: {
        name: '上传中',
        color: ['palette', 'primary', 'dark'],
        icon: 'UploadOutlinedIcon',
    },
    DATA_UPLOAD_FAILED: {
        name: '上传失败',
        color: ['palette', 'error', 'dark'],
        icon: 'ReportGmailerrorredOutlinedIcon',
    },
    DATA_UPLOADED: {
        name: '上传完成',
        color: ['palette', 'success', 'dark'],
        icon: 'CloudDoneOutlinedIcon',
    },
    FORMATTED: {
        name: '结束',
        color: ['palette', 'success', 'main'],
        icon: 'CheckCircleOutlineIcon',
    },

    NULL: {
        name: '-',
        color: ['palette', 'grey', 'dark'],
        icon: 'null',
    },
    WRONGSERVER: {
        name: '配对异常',
        color: ['palette', 'error', 'main'],
        icon: 'ErrorOutlineOutlinedIcon',
    },
}

export interface diskInfoType {
    diskId: string
    diskName: string
    diskStatus: diskStatusEnum
    diskStatusStr: string
    invalidMsg: string
    recommendedServerId: string
    slotId: number
    updateTime: number
    updateTimeStr: string
    updateTimeShortStr: string
    tips: string
    vehicleIds: string[]
    wrongServer: boolean
}
export interface slotInfoType {
    diskInfo?: diskInfoType
    isEmpty: boolean
    slotBusId: string
    slotId: number
}

export interface uploadServerType {
    emptySlotsNum: number
    formattedDisksNum: number
    isRunning: boolean
    isRunningStr: string
    operationTips: string
    totalSlotsNum: number
    uploadServerId: string
    uploadServerLocation: string
    slotInfos: slotInfoType[]
}

export type UploadServerState = {
    data: uploadServerType[]
}
