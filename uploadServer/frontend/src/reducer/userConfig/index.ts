import { createModel } from '@rematch/core'

import { RootModel } from '..'
import { userConfigType } from 'src/reducer/userConfig/type'

const initState: userConfigType = {
    uploadServer_listConfig: {
        // filter: {
        //     filterModel: {
        //         items: [
        //             {
        //                 columnField: 'isRunningStr',
        //                 operatorValue: 'is',
        //                 value: '运行中',
        //             },
        //         ],
        //     },
        // },
    },
    uploadServer_detailListConfig: {},
    disk_listConfig: {},
}

export const userConfig = createModel<RootModel>()({
    state: initState,
    reducers: {
        set: (state, payload: Partial<userConfigType>) => {
            return {
                ...state,
                ...payload,
            }
        },
    },
})
