import { init, createModel, Models } from '@rematch/core'
import { dissoc } from 'ramda'

import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { disk } from 'src/reducer/disk'

const mockData = {
    data: [
        {
            comment: 'TEST_DISK_SN',
            diskId: '',
            id: 1,
            inventoryStatus: 0,
            onServer: true,
            owner: 2,
        },
    ],
    uploadRecords: {
        TEST_DISK_SN: {
            id: '1',
            seq: 0,
            uploadStartTime: '2022-01-02 11:22:12',
            uploadEndTime: '2022-02-02 11:22:12',
            vehicleId: 'byd-02',
            xrayUris: ['byd-2-records'],
            uploadStatus: 0,
        },
    },
}

describe('Reducer - disk', () => {
    it('should set data', () => {
        const store = init({
            models: { disk } as any,
        })

        const { dispatch } = store

        dispatch.disk.setData(mockData)

        const data = store.getState().disk
        expect(data).toEqual(mockData)
    })
})
