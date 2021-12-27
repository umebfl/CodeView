import { assoc, map } from 'ramda'
import { createModel } from '@rematch/core'

import { RootModel } from '..'
import {
    optionDataType,
    optionKeyType,
    optionSubNodeType,
    optionType,
    optionValType,
    userConfigType,
} from 'src/reducer/userConfig/type'

const initState: userConfigType = {
    grid: {
        layout: [
            {
                w: 6,
                h: 2,
                x: 18,
                y: 15,
                i: 'menuBar',
                moved: false,
                static: true,
            },
            {
                w: 8,
                h: 2,
                x: 0,
                y: 15,
                i: 'source',
                moved: false,
                static: true,
            },
            {
                w: 24,
                h: 15,
                x: 0,
                y: 0,
                i: 'graphin',
                moved: false,
                static: true,
            },
            {
                w: 10,
                h: 2,
                x: 8,
                y: 15,
                i: 'statistics',
                moved: false,
                static: true,
            },
        ],
        lock: false,
    },
    option: {
        root: {
            label: 'root',
            type: 'parent',
        },
        'root/gird': {
            label: '布局',
            type: 'parent',
        },
        'root/gird/lock': {
            label: '锁定布局',
            type: 'children',
            dataType: optionDataType.switch,
            defaultValue: true,
            value: true,
        },
        'root/code': {
            label: '代码',
            type: 'parent',
        },
        'root/code/path': {
            label: '代码目录',
            type: 'children',
            // defaultValue: `D:/workspace/CodeView/codeview/web/src`,
            // value: `D:/workspace/CodeView/codeview/web/src`,
            defaultValue:
                '/home/anqihuang/workspace2/CodeView/codeview/web/src',
            value: '/home/anqihuang/workspace2/CodeView/codeview/web/src',
            dataType: optionDataType.input,
        },
        'root/code/matchSuffix': {
            label: '匹配后缀',
            type: 'children',
            defaultValue: 'ts,tsx,js,jsx',
            value: 'ts,tsx,js,jsx',
            dataType: optionDataType.input,
        },
        'root/code/type': {
            label: '类型',
            type: 'parent',
        },
        'root/code/type/show': {
            label: '展示类型',
            type: 'children',
            defaultValue: false,
            value: false,
            dataType: optionDataType.switch,
        },
        'root/code/component': {
            label: '组件',
            type: 'parent',
        },
        'root/code/component/show': {
            label: '展示组件',
            type: 'children',
            defaultValue: false,
            value: false,
            dataType: optionDataType.switch,
        },
        'root/code/util': {
            label: 'Util',
            type: 'parent',
        },
        'root/code/util/show': {
            label: '展示Util',
            type: 'children',
            defaultValue: false,
            value: false,
            dataType: optionDataType.switch,
        },
        // 'root/code/unitTest': {
        //     label: '单元测试',
        //     type: 'parent',
        // },
        // 'root/code/unitTest/show': {
        //     label: '显示',
        //     type: 'children',
        //     defaultValue: false,
        //     value: false,
        //     dataType: optionDataType.switch,
        // },
        // 'root/code/unitTest/mapping': {
        //     label: '关系',
        //     type: 'children',
        //     defaultValue: false,
        //     value: false,
        //     dataType: optionDataType.switch,
        // },
    },
}

export const userConfig = createModel<RootModel>()({
    state: initState,
    reducers: {
        set: (state, payload: userConfigType) => {
            return payload
        },
    },

    effects: dispatch => ({
        async setOption(
            payload: { key: optionKeyType; val: optionValType },
            rootState
        ) {
            const option = rootState.userConfig.option

            const newOption = assoc(
                payload.key as unknown as string,
                payload.val,
                option
            ) as optionType

            dispatch.userConfig.set({
                ...rootState.userConfig,
                option: newOption,
            })
        },
    }),
})
