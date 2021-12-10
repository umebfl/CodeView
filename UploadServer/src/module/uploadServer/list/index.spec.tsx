import * as React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import { rest } from 'msw'
import { setupServer } from 'msw/node'

import List from 'src/module/uploadServer/list'
import data from 'src/../data/json/uploadServer.json'
import { Context } from 'src/app'

jest.mock('react-router-dom', () => ({
    Link: () => <div></div>,
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
        console.log(data)

        return res(ctx.json(data))
    })
)

beforeAll(() => server.listen())
beforeEach(() => {})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Upload Server', () => {
    it('默认进入uploadServe列表页', async () => {
        apiUploadServerType = 'primary'

        render(
            <Context>
                <List />
            </Context>
        )

        screen.logTestingPlaygroundURL
        await waitFor(() => screen.getAllByText(/superxray-sz-06/g))

        expect(screen.getAllByText(/superxray-sz-0/g).length).toBe(
            data.data.uploadServerInfos.length
        )
    })

    // it('点击刷新按钮，可以刷新列表', async () => {
    //     apiUploadServerType = 'primary'

    //     render(<App />)
    //     await waitFor(() => screen.getAllByText(/superxray-sz-0/g))

    //     apiUploadServerType = 'empty'

    //     fireEvent.click(screen.getByTestId('RefreshOutlinedIcon'))

    //     await waitFor(() => screen.getAllByText(/superxray-sz-0/g))
    //     // screen.logTestingPlaygroundURL()

    //     expect(screen.getAllByText(/superxray-sz-0/g).length).toBe(0)
    // })

    // it('可以切换到Disk模块', async () => {
    //     render(<App />)
    //     fireEvent.click(screen.getByTestId('AlbumOutlinedIcon'))
    //     screen.logTestingPlaygroundURL()
    // })
})
