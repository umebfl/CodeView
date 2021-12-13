/** No need unit test */
import React from 'react'

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

import HomePage from 'src/module/homePage'
import { UploadServerList, UploadServerDetail } from 'src/module/uploadServer'
import NoFound from 'src/module/noFound'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage></HomePage>}>
                    <Route path="up" element={<Outlet></Outlet>}>
                        <Route index element={<UploadServerList />} />
                        <Route
                            path="detail/:id"
                            element={<UploadServerDetail />}
                        />
                    </Route>
                    <Route path="disk" element={<div />} />
                    <Route path="*" element={<NoFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
