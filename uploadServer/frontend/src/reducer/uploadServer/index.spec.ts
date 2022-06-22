import { init, createModel, Models } from '@rematch/core'
import { dissoc } from 'ramda'

import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { uploadServer } from 'src/reducer/uploadServer'
import { language } from 'src/reducer/language'
import { userConfig } from 'src/reducer/userConfig'

import MockData from '../../../data/json/uploadServer.json'
import {
    UploadServerState,
    uploadServerType,
} from 'src/reducer/uploadServer/type'
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
                    uploadServerInfos: [],
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

const mockData = MockData as unknown as {
    uploadServerInfos: uploadServerType[]
}

describe('Reducer - uploadServer', () => {
    it('should set data', () => {
        const store = init({
            models: { uploadServer, language, userConfig } as any,
        })

        const { dispatch } = store

        dispatch.uploadServer.setData({
            lang: langSet.zh,
            payload: mockData.uploadServerInfos,
        })

        const data: UploadServerState = store.getState().uploadServer

        expect(data.data.length).toBe(mockData.uploadServerInfos.length)

        const item = data.data[0]
        expect(item.isRunningStr).toBe('running')
    })

    it('should init data', async () => {
        const store = init({
            models: { uploadServer, language, userConfig } as any,
        })
        const { dispatch } = store

        await dispatch.uploadServer.initData()

        const data: UploadServerState = store.getState().uploadServer

        expect(data.data.length).toBe(mockData.uploadServerInfos.length)

        const item = data.data[0]
        expect(item.isRunningStr).toBe('running')
    })
})
