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
                minW: 1,
                maxW: 100,
                static: false,
            },
            {
                w: 24,
                h: 1,
                x: 0,
                y: 1,
                i: 'config',
                minW: 1,
                maxW: 100,
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
            defaultValue: false,
            value: false,
        },
        'root/code': {
            label: '代码',
            type: 'parent',
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
