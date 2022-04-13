import { init, createModel, Models } from '@rematch/core'
import { dissoc } from 'ramda'

import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { uploadServer } from 'src/reducer/uploadServer'
import { language } from 'src/reducer/language'

import MockData from '../../../data/json/uploadServer.json'
import { UploadServerState } from 'src/reducer/uploadServer/type'
import { langSet } from '../language/type'

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
    it('should set data', () => {
        const store = init({
            models: { uploadServer, language } as any,
        })

        const { dispatch } = store

        dispatch.uploadServer.setData({
            lang: langSet.zh,
            payload: MockData.data.uploadServerInfos,
        })

        const data: UploadServerState = store.getState().uploadServer

        expect(data.data.length).toBe(MockData.data.uploadServerInfos.length)

        const item = data.data[0]
        expect(item.isRunningStr).toBe('running')
    })

    it('should init data', async () => {
        const store = init({
            models: { uploadServer, language } as any,
        })
        const { dispatch } = store

        await dispatch.uploadServer.initData()

        const data: UploadServerState = store.getState().uploadServer

        expect(data.data.length).toBe(MockData.data.uploadServerInfos.length)

        const item = data.data[0]
        expect(item.isRunningStr).toBe('running')
    })
})
