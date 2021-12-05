import React from 'react'

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

import HomePage from 'src/module/homePage'
import UploadServerList from 'src/module/uploadServer/list'
import UploadServerDetail from 'src/module/uploadServer/detail'
import Test from 'src/module/test'
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
                    <Route path="disk" element={<Test />} />
                    <Route path="*" element={<NoFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
