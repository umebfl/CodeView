import { init, createModel, Models } from '@rematch/core'
import { dissoc } from 'ramda'

import { snackbar } from 'src/reducer/snackbar'

describe('Reducer - snackbar', () => {
    it('should push data', () => {
        const store = init({
            models: { snackbar } as any,
        })

        const { dispatch } = store

        dispatch.snackbar.push({ timeStamp: 0, severity: 'error', msg: 'test' })

        const data = store.getState().snackbar
        expect(data).toEqual({
            data: {
                '0': { timeStamp: 0, severity: 'error', msg: 'test' },
            },
        })
    })

    it('should pop data', () => {
        const store = init({
            models: { snackbar } as any,
        })
        const { dispatch } = store

        dispatch.snackbar.push({ timeStamp: 0, severity: 'error', msg: 'test' })
        const data = store.getState().snackbar
        expect(data).toEqual({
            data: {
                '0': { timeStamp: 0, severity: 'error', msg: 'test' },
            },
        })

        dispatch.snackbar.pop('0')
        const popData = store.getState().snackbar
        expect(popData).toEqual({ data: {} })
    })
})
