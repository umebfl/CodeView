import { slotInfoType } from 'src/reducer/uploadServer/type'

export interface ViewPayloadType {
    data: slotInfoType[]
}

export interface detailType extends slotInfoType {
    date: string
    diskStatus: string
}

export enum ViewType {
    list,
    grid,
}
