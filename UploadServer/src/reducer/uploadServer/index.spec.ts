import { init, createModel, Models } from '@rematch/core'
import { dissoc } from 'ramda'

import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { uploadServer } from 'src/reducer/uploadServer'

import MockData from '../../../data/json/uploadServer.json'
import { UploadServerState } from 'src/reducer/uploadServer/type'

// error Primary one empty
let apiUploadServerType = 'primary'

const server = setupServer(
    rest.get('/data_center/get_upload_server_list', (req, res, ctx) => {
        if (apiUploadServerType === 'primary') {
            return res(ctx.json(MockData))
        }

        if (apiUploadServerType === 'empty') {
            return res(
                ctx.json({
                    ...MockData,
                    data: {
                        ...MockData.data,
                        uploadServerInfos: [],
                    },
                })
            )
        }

        return res(ctx.json(MockData))
    })
)

beforeAll(() => server.listen())
beforeEach(() => {})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Reducer - uploadServer', () => {
    it('可以set数据', () => {
        const store = init({
            models: { uploadServer } as any,
        })

        const { dispatch } = store

        dispatch.uploadServer.setData(MockData.data.uploadServerInfos)

        const data: UploadServerState = store.getState().uploadServer

        expect(data.data.length).toBe(MockData.data.uploadServerInfos.length)

        const item = data.data[0]
        expect(item.isRunningStr).toBe('运行中')
    })

    it('可以init数据', async () => {
        const store = init({
            models: { uploadServer } as any,
        })
        const { dispatch } = store

        await dispatch.uploadServer.initData()

        const data: UploadServerState = store.getState().uploadServer

        expect(data.data.length).toBe(MockData.data.uploadServerInfos.length)

        const item = data.data[0]
        expect(item.isRunningStr).toBe('运行中')
    })
})
