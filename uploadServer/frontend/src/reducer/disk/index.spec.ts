import { init, createModel, Models } from '@rematch/core'
import { dissoc } from 'ramda'

import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { disk } from 'src/reducer/disk'
import { language } from 'src/reducer/language'

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

const server = setupServer(
    rest.get('/disk_management/get_disks_info', (req, res, ctx) => {
        return res(
            ctx.json({
                code: 0,
                msg: 'success',
                disks_info: [
                    {
                        disk_sn: 'UNKNOWN_DISK_ID_0000:60:00.0',
                        owner: 1,
                        status: 0,
                        on_server: true,
                        comment: 'test_disk_info',
                    },
                    {
                        disk_sn: 'A0765C71',
                        owner: 2,
                        status: 1,
                        on_server: true,
                        comment: 'test_disk_info',
                    },
                ],
            })
        )
    }),

    rest.get('/disk_management/get_upload_records', (req, res, ctx) => {
        return res(
            ctx.json({
                code: 0,
                msg: 'success',
                disk_sn: 'S6CKNE0R920379',
                upload_records: [
                    {
                        disk_sn: 'S6CKNE0R920379',
                        disk_plug_time: '2022-04-19 06:22:29',
                        upload_start_time: '1971-01-01 00:00:00',
                        upload_end_time: '1971-01-01 00:00:00',
                        vehicle_id: 'pacifica-cn-53',
                        xray_uris: [
                            'pacifica-cn-53/20220419/2022-04-19-11-31-19',
                            'pacifica-cn-53/20220419/2022-04-19-09-19-44',
                            'pacifica-cn-53/20220419/2022-04-19-09-51-39',
                        ],
                        upload_status: 0,
                    },
                ],
            })
        )
    })
)

beforeAll(() => server.listen())
beforeEach(() => {})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Reducer - disk', () => {
    it('should set data', async () => {
        const store = init({
            models: { disk } as any,
        })

        const { dispatch } = store

        await dispatch.disk.setData(mockData)

        const data = store.getState().disk
        expect(data).toMatchSnapshot()
    })

    it('should init data', async () => {
        const store = init({
            models: { disk, language } as any,
        })

        const { dispatch } = store

        await dispatch.disk.initData()

        const data = store.getState().disk
        expect(data).toMatchSnapshot()
    })

    it('should get Upload Records data', async () => {
        const store = init({
            models: { disk, language } as any,
        })

        const { dispatch } = store

        await dispatch.disk.setData({
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
            uploadRecords: {},
        })
        await dispatch.disk.getUploadRecords('S6CKNE0R920379')

        const data = store.getState().disk

        expect(data).toMatchSnapshot()
    })
})
