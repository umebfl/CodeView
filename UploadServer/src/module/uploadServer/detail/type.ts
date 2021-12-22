import { slotInfoType } from 'src/reducer/uploadServer/type'

export interface ViewPayloadType {
    data: slotInfoType[]
}

export enum ViewType {
    list,
    grid,
}
