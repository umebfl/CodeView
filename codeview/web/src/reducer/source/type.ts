export interface sourceDataType {
    path: string
    name: string
    type: 'file' | 'dir'
}

export enum fileType {
    component = 'component',
    module = 'module',
    moduleComponent = 'moduleComponent',
    type = 'type',
    unknown = 'unknown',
}

export interface SourceFileType extends sourceDataType {
    parse: any
    source: string
    shortName: string
    suffix: string
    pathNoSuffix: string
    fileType: fileType
}
export interface SourceDirType extends sourceDataType {
    list: SourceDFType[]
}

export type SourceDFType = SourceFileType | SourceDirType

export type statisticsType = {
    // 总文件数
    totalFile: number
    // 总代码行数
    totalLine: number
}

export interface sourceType {
    data: SourceDFType
    disposeData: SourceDFType
    statistics: statisticsType
}
