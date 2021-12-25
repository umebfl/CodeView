export interface sourceDataType {
    path: string
    name: string
    type: 'file' | 'dir'
}

export interface SourceFileType extends sourceDataType {
    parse: any
    source: string
    suffix: string
}
export interface SourceDirType extends sourceDataType {
    list: SourceDFType[]
}

export type SourceDFType = SourceFileType | SourceDirType

export interface sourceType {
    data: SourceDFType
    disposeData: SourceDFType
}
