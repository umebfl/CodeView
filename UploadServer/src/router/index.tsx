import React, { useReducer } from 'react'

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

import HomePage from 'src/module/homePage'
import UploadServerList from 'src/module/uploadServerList'
import UploadServerDetail from 'src/module/uploadServerDetail'
import Test from 'src/module/test'
import NoFound from 'src/module/noFound'

import reducer, { initState, useTest } from 'src/reducer'
// https://blog.csdn.net/weixin_42461410/article/details/88650304
function Router() {
    // const [state, dispatch] = useReducer(reducer, initState)
    const [state, dispatch] = useTest()

    console.log('uploadServer', state.uploadServer)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage></HomePage>}>
                    <Route path="up" element={<Outlet></Outlet>}>
                        <Route
                            index
                            element={
                                <UploadServerList
                                    data={state.uploadServer.data}
                                    dispatch={dispatch}
                                />
                            }
                        />
                        <Route
                            path="detail/:id"
                            element={
                                <UploadServerDetail
                                    data={state.uploadServer.data}
                                    dispatch={dispatch}
                                />
                            }
                        />
                    </Route>
                    <Route path="disk" element={<Test />} />
                    <Route path="*" element={<NoFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
