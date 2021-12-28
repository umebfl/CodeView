export interface sourceDataType {
    path: string
    name: string
    type: 'file' | 'dir'
}

export enum fileType {
    component = 'component',
    module = 'module',
    type = 'type',
    util = 'util',
    hook = 'hook',
    unknown = 'unknown',
}

export interface SourceFileType extends sourceDataType {
    path: string
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

    // disposeData 文件类型的列表
    disposeFileList: SourceFileType[]

    statistics: statisticsType

    // 当前聚焦的代码
    focusSource: {
        data: SourceFileType | null
    }
}
