import { init, createModel, Models } from '@rematch/core'
import { dissoc } from 'ramda'

import { globalLoading } from 'src/reducer/globalLoading'

describe('Reducer - globalLoading', () => {
    it('可以push数据', () => {
        const store = init({
            models: { globalLoading } as any,
        })

        const { dispatch } = store

        dispatch.globalLoading.push(0)

        const data = store.getState().globalLoading
        expect(data).toEqual({ loadingMap: { '0': true } })
    })

    it('可以pop数据', () => {
        const store = init({
            models: { globalLoading } as any,
        })
        const { dispatch } = store

        dispatch.globalLoading.push(0)
        const data = store.getState().globalLoading
        expect(data).toEqual({ loadingMap: { '0': true } })

        dispatch.globalLoading.pop(0)
        const popData = store.getState().globalLoading
        expect(popData).toEqual({ loadingMap: {} })
    })

    it('可以remove数据', async () => {
        const store = init({
            models: { globalLoading } as any,
        })
        const { dispatch } = store

        dispatch.globalLoading.push(0)
        const data = store.getState().globalLoading
        expect(data).toEqual({ loadingMap: { '0': true } })

        await dispatch.globalLoading.remove(0)
        const removeData = store.getState().globalLoading
        expect(removeData).toEqual({ loadingMap: {} })
    })
})
