export interface DiskType {
    id: number
    diskId: string
    owner: DiskOwnerType
    inventoryStatus: DiskInventoryStatusType
    onServer: boolean
    comment: string
    diskName: string
}

export interface DiskResponseType {
    disk_sn: string
    owner: DiskOwnerType
    status: DiskInventoryStatusType
    on_server: boolean
    comment: string

    diskName: string
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
}
