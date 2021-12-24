import { map } from 'ramda'
import { createModel } from '@rematch/core'

import { RootModel } from '..'
import {
    optionDataType,
    optionType,
    userConfigType,
} from 'src/reducer/userConfig/type'

const initState: userConfigType = {
    sourcePath: [],
    grid: {
        layout: [
            {
                i: 'menuBar',
                x: 0,
                y: 0,
                w: 24,
                h: 1,
            },
            {
                i: 'config',
                w: 24,
                h: 1,
                x: 0,
                y: 1,
            },
            {
                i: 'graphin',
                w: 24,
                h: 1,
                x: 0,
                y: 2,
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
            defaultValue: '',
            value: '',
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

        setOption: (state, payload: Record<string, optionType>) => {
            return {
                ...state,
                option: payload,
            }
        },

        gridsingleCheckboxLock: state => {
            const lock = !state.grid.lock

            return {
                ...state,
                grid: {
                    ...state.grid,
                    layout: map((item: ReactGridLayout.Layout) => ({
                        ...item,
                        static: lock,
                    }))(state.grid.layout),
                    lock,
                },
            }
        },
    },
})
