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
                h: 19,
                x: 18,
                y: 0,
                i: 'menuBar',
                moved: false,
                static: false,
            },
            {
                w: 6,
                h: 2,
                x: 18,
                y: 19,
                i: 'config',
                moved: false,
                static: false,
            },
            {
                w: 18,
                h: 21,
                x: 0,
                y: 0,
                i: 'source',
                moved: false,
                static: false,
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
            defaultValue: `D:/workspace/CodeView/codeview/web/src`,
            value: `D:/workspace/CodeView/codeview/web/src`,
            dataType: optionDataType.input,
        },
        'root/code/matchSuffix': {
            label: '代码匹配后缀',
            type: 'children',
            defaultValue: 'ts,tsx,js,jsx',
            value: 'ts,tsx,js,jsx',
            dataType: optionDataType.input,
        },
        'root/code/unitTest': {
            label: '单元测试',
            type: 'parent',
        },
        'root/code/unitTest/show': {
            label: '显示',
            type: 'children',
            defaultValue: false,
            value: false,
            dataType: optionDataType.switch,
        },
        'root/code/unitTest/mapping': {
            label: '关系',
            type: 'children',
            defaultValue: false,
            value: false,
            dataType: optionDataType.switch,
        },
    },
}

export const userConfig = createModel<RootModel>()({
    state: initState,
    reducers: {
        set: (state, payload: userConfigType) => {
            return payload
        },

        _setOption: (state, payload: optionType) => {
            return {
                ...state,
                option: payload,
            }
        },

        // gridsingleCheckboxLock: state => {
        //     const lock = !state.grid.lock

        //     return {
        //         ...state,
        //         grid: {
        //             ...state.grid,
        //             layout: map((item: ReactGridLayout.Layout) => ({
        //                 ...item,
        //                 static: lock,
        //             }))(state.grid.layout),
        //             lock,
        //         },
        //     }
        // },
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

            dispatch.userConfig._setOption(newOption)
        },
    }),
})
