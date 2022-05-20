import { init, createModel, Models } from '@rematch/core'
import { dissoc } from 'ramda'

import { userConfig } from 'src/reducer/userConfig'

describe('Reducer - userConfig', () => {
    it('should set data', () => {
        const store = init({
            models: { userConfig } as any,
        })

        const { dispatch } = store

        dispatch.userConfig.set({
            uploadServer_listConfig: {
                filter: {
                    filterModel: {
                        items: [
                            {
                                columnField: 'isRunningStr',
                                operatorValue: 'is',
                                value: '运行中',
                            },
                        ],
                    },
                },
            },
            uploadServer_detailListConfig: {},
            disk_listConfig: {},
        })

        const data = store.getState().userConfig
        expect(data).toEqual({
            uploadServer_listConfig: {
                filter: {
                    filterModel: {
                        items: [
                            {
                                columnField: 'isRunningStr',
                                operatorValue: 'is',
                                value: '运行中',
                            },
                        ],
                    },
                },
            },
            uploadServer_detailListConfig: {},
            disk_listConfig: {},
        })
    })
})
