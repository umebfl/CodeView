import { createModel } from '@rematch/core'
import { map, endsWith, filter, split, anyPass, forEach, includes } from 'ramda'
import * as babylon from '@babel/parser'

import { RootModel } from '..'
import {
    SourceFileType,
    sourceDataType,
    SourceDirType,
    sourceType,
    SourceDFType,
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

    return {
        ...file,
        parse,
        suffix,
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
                console.log(disposeData)

                if (data) {
                    dispatch.source.setData({
                        data,
                        disposeData,
                    })
                }
            }
        },
    }),
})
