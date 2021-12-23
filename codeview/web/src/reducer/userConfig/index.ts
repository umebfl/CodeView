import { map } from 'ramda'
import { createModel } from '@rematch/core'

import { RootModel } from '..'
import { optionDataType, userConfigType } from 'src/reducer/userConfig/type'

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
                static: true,
            },
            {
                w: 24,
                h: 1,
                x: 0,
                y: 1,
                i: 'config',
                minW: 1,
                maxW: 100,
                static: true,
            },
        ],
        lock: true,
    },
    option: {
        grid: {
            name: '布局',
            defalut: false,
            currentValue: false,
            // children: {
            //     lock: {
            //         name: '锁定布局',
            //         type: optionDataType.switch,
            //         defalut: false,
            //         currentValue: false,
            //     },
            // },
        },
        code: {
            name: '代码',
            defalut: false,
            currentValue: false,
            // children: {
            //     unitTest: {
            //         name: '单元测试',
            //         defalut: false,
            //         currentValue: false,
            //         children: {
            //             show: {
            //                 name: '显示',
            //                 type: optionDataType.switch,
            //                 defalut: false,
            //                 currentValue: false,
            //             },
            //             mapping: {
            //                 name: '关系',
            //                 type: optionDataType.switch,
            //                 defalut: false,
            //                 currentValue: false,
            //             },
            //         },
            //     },
            // },
        },
    },
}

export const userConfig = createModel<RootModel>()({
    state: initState,
    reducers: {
        set: (state, payload: userConfigType) => {
            return payload
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
