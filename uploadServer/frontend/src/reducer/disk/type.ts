export interface DiskType {
    id: number
    diskId: string
    owner: DiskOwnerType
    inventoryStatus: DiskInventoryStatusType
    onServer: boolean
    comment: string
    unregistered?: boolean
}

export interface DiskUploadRecordType {
    uploadStartTime: string
    uploadEndTime: string
    vehicleId: string
    xrayUris: string[]
    uploadStatus: DiskUploadStatus
}

export enum DiskUploadStatus {
    NOT_UPLOAD = 0,
    UPLOADING = 1,
    SUCCEED = 2,
    FAILED = 3,
}

export interface DiskResponseType {
    disk_sn: string
    owner: DiskOwnerType
    status: DiskInventoryStatusType
    on_server: boolean
    comment: string
}

export enum DiskOwnerType {
    UNKNOWN = 0,
    PINGSHAN = 1,
    NANSHAN = 2,
}

export enum DiskInventoryStatusType {
    NORMAL = 0,
    LOST = 1,
    DAMAGED = 2,
}

export interface diskState {
    data: DiskType[]
    uploadRecords: Record<string, DiskUploadRecordType[]>
}
