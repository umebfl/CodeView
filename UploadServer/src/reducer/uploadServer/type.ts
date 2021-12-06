export enum diskStatusEnum {
    UNMOUNT = 'UNMOUNT',
    INVALID = 'INVALID',
    WAITING_TO_UPLOAD = 'WAITING_TO_UPLOAD',
    DATA_UPLOADING = 'DATA_UPLOADING',
    DATA_UPLOAD_FAILED = 'DATA_UPLOAD_FAILED',
    DATA_UPLOADED = 'DATA_UPLOADED',
    FORMATTED = 'FORMATTED',
}

export const DiskStatusConfig: Record<
    diskStatusEnum,
    { name: string; color: string[] }
> = {
    UNMOUNT: {
        name: '未挂载',
        color: ['palette', 'warning', 'dark'],
    },
    INVALID: {
        name: '异常',
        color: ['palette', 'error', 'dark'],
    },
    WAITING_TO_UPLOAD: {
        name: '等待上传',
        color: ['palette', 'secondary', 'dark'],
    },
    DATA_UPLOADING: {
        name: '上传中',
        color: ['palette', 'primary', 'dark'],
    },
    DATA_UPLOAD_FAILED: {
        name: '上传失败',
        color: ['palette', 'error', 'dark'],
    },
    DATA_UPLOADED: {
        name: '上传完成',
        color: ['palette', 'success', 'dark'],
    },
    FORMATTED: {
        name: '结束',
        color: ['palette', 'success', 'dark'],
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
