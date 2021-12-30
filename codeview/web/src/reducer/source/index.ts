import { createModel } from '@rematch/core'
import {
    map,
    endsWith,
    filter,
    split,
    test,
    anyPass,
    forEach,
    includes,
    reduce,
    startsWith,
    flatten,
    compose,
} from 'ramda'
import * as babylon from '@babel/parser'

import { RootModel } from '..'
import {
    SourceFileType,
    sourceDataType,
    SourceDirType,
    sourceType,
    SourceDFType,
    statisticsType,
    fileType,
} from 'src/reducer/source/type'
import request from 'src/util/request'
import { optionSubNodeType, optionType } from 'src/reducer/userConfig/type'

const initState: sourceType = {
    data: {
        path: '/',
        name: 'root',
        type: 'dir',
        list: [],
    },

    disposeData: {
        path: '/',
        name: 'root',
        type: 'dir',
        list: [],
    },

    disposeFileList: [],

    statistics: {
        totalFile: 0,
        totalLine: 0,
    },

    focusSource: {
        data: null,
    },
}

const getFileType = (data: SourceFileType): fileType => {
    if (data.name === 'type.ts') {
        return fileType.type
    }

    if (
        startsWith('src/component')(data.path) ||
        test(/src\/.+\/component\//)(data.path)
    ) {
        return fileType.component
    }

    if (startsWith('src/util')(data.path)) {
        return fileType.util
    }

    if (startsWith('src/hook')(data.path)) {
        return fileType.hook
    }

    return fileType.module
}

const defaultOptions: any = {
    sourceType: 'module',
    allowImportExportEverywhere: true,
    allowReturnOutsideFunction: true,
    startLine: 1,
    tokens: true,
    plugins: [
        'estree',
        ['decorators', { decoratorsBeforeExport: true }],
        'asyncGenerators',
        'bigInt',
        'classProperties',
        'classPrivateProperties',
        'classPrivateMethods',
        'legacy-decorators',
        'doExpressions',
        'dynamicImport',
        'exportDefaultFrom',
        'exportNamespaceFrom',
        'functionBind',
        'functionSent',
        'importMeta',
        'logicalAssignment',
        'nullishCoalescingOperator',
        'numericSeparator',
        'objectRestSpread',
        'optionalCatchBinding',
        'optionalChaining',
        ['pipelineOperator', { proposal: 'minimal' }],
        'throwExpressions',
        'typescript',
        'jsx',
    ],
}

const dispose = (payload: SourceDFType, option: optionType): SourceDFType => {
    if (payload.type === 'dir') {
        // 文件夹处理
        const { list } = payload as SourceDirType
        // 递归处理
        const rv = map((item: SourceDFType) => dispose(item, option))(list)
        // 过滤无法解析的文件
        const filterList = filter((item: SourceDFType) => {
            return (
                item.type === 'dir' || (item as SourceFileType).parse !== null
            )
        })(rv)

        return {
            ...payload,
            list: filterList,
        }
    }

    // file
    const file = payload as SourceFileType
    const suffix = split('.', file.name)[1]
    const matchSuffix = split(
        ',',
        option['root/code/matchSuffix'].value as string
    )

    // 解析源代码
    let parse = null
    if (includes(suffix, matchSuffix)) {
        // 只有匹配后端的文件才解析
        parse = babylon.parse(file.source, defaultOptions)
    }

    const fileType = getFileType(file)

    return {
        ...file,
        parse,
        suffix,
        fileType,
    }
}

const getDisposeFileList = (data: SourceDFType): SourceFileType[] => {
    if (data.type === 'dir') {
        return compose(
            (item: SourceFileType[][]) => flatten(item),
            map(getDisposeFileList)
        )((data as SourceDirType).list)
    }

    return [data as SourceFileType]
}

const getStatistics = (
    payload: SourceDFType,
    statistics: statisticsType
): statisticsType => {
    if (payload.type === 'dir') {
        const news = reduce((stc, item: SourceDFType) => {
            const rv = getStatistics(item, statistics)
            return {
                totalFile: rv.totalFile + stc.totalFile,
                totalLine: rv.totalLine + stc.totalLine,
            }
        }, statistics)((payload as SourceDirType).list)

        return news
    }

    return {
        totalFile: statistics.totalFile + 1,
        totalLine:
            statistics.totalLine +
            (payload as SourceFileType).parse.loc.end.line,
    }
}

export const source = createModel<RootModel>()({
    state: initState,
    reducers: {
        setData: (state, payload: sourceType) => {
            return {
                ...state,
                ...payload,
            }
        },

        setFocusSourceData: (state, payload: SourceFileType) => {
            return {
                ...state,
                focusSource: {
                    ...state.focusSource,
                    data: payload,
                },
            }
        },
    },

    effects: dispatch => ({
        async initData(sourcePath: string | null, rootState) {
            const {
                userConfig: { option },
            } = rootState

            const path =
                sourcePath ||
                ((option['root/code/path'] as optionSubNodeType)
                    .value as string)

            if (path) {
                const data = await request({
                    url: '/source',
                    dispatch,
                    payload: {
                        method: 'POST',
                        body: JSON.stringify({ path }),
                    },
                })

                const disposeData = dispose(data, option)
                const disposeFileList = getDisposeFileList(disposeData)
                const statistics = getStatistics(disposeData, {
                    totalFile: 0,
                    totalLine: 0,
                })

                // console.log(disposeFileList)

                if (data) {
                    dispatch.source.setData({
                        ...rootState.source,
                        data,
                        disposeData,
                        disposeFileList,
                        statistics,
                    })
                }
            }
        },
    }),
})
