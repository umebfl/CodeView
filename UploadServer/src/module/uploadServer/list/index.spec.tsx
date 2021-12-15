import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import { rest } from 'msw'
import { setupServer } from 'msw/node'

import List from 'src/module/uploadServer/list'
import data from 'src/../data/json/uploadServer.json'
import { Context } from 'src/app'
import { getInitStore } from 'src/reducer/store'

import { Dispatch } from 'src/reducer/type'

jest.mock('react-router-dom', () => ({
    Link: ({ children }: any) => <div>{children}</div>,
    useNavigate: () => {},
}))

// error Primary one empty
let apiUploadServerType = 'primary'

const server = setupServer(
    rest.get('/data_center/get_upload_server_list', (req, res, ctx) => {
        if (apiUploadServerType === 'primary') {
            return res(ctx.json(data))
        }

        if (apiUploadServerType === 'empty') {
            return res(
                ctx.json({
                    ...data,
                    data: {
                        ...data.data,
                        uploadServerInfos: [],
                    },
                })
            )
        }

        return res(ctx.json(data))
    })
)

beforeAll(() => server.listen())
beforeEach(() => {})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Upload Server', () => {
    it('should render list', async () => {
        apiUploadServerType = 'primary'
        const store = getInitStore()
        const dispatch = store.dispatch as Dispatch

        render(
            <Context initStore={store}>
                <List />
            </Context>
        )

        dispatch.uploadServer.initData()
        await waitFor(() => screen.getAllByText(/superxray\-sz\-0/i))

        expect(screen.getAllByText(/superxray\-sz\-0/i).length).toBe(
            data.data.uploadServerInfos.length
        )
    })

    it('should render an empty list prompt when the data is empty', async () => {
        apiUploadServerType = 'empty'
        const store = getInitStore()
        const dispatch = store.dispatch as Dispatch

        render(
            <Context initStore={store}>
                <List />
            </Context>
        )

        dispatch.uploadServer.initData()
        await waitFor(() => screen.getAllByText(/列表数据为空。/i))

        expect(screen.getAllByText(/列表数据为空。/i).length).toBeDefined()
    })
})
