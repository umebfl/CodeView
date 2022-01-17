/** No need unit test */
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/system/Box'
import { useTheme } from '@mui/material/styles'

import HomePage from 'src/module/homePage'
import UploadServer, {
    UploadServerList,
    UploadServerDetail,
} from 'src/module/uploadServer'
import NoFound from 'src/module/noFound'
import { RootState, Dispatch } from 'src/reducer/type'

function Router() {
    const theme = useTheme()
    const { rehydrated } = useSelector((state: RootState) => state._persist)

    return (
        <Box
            sx={{
                display: 'flex',
                flex: 1,
                background: theme.color.grey2,
            }}
        >
            {rehydrated && (
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage></HomePage>}>
                            <Route
                                path="up"
                                element={<UploadServer></UploadServer>}
                            >
                                <Route index element={<UploadServerList />} />
                                <Route
                                    path="detail/:id"
                                    element={<UploadServerDetail />}
                                />
                            </Route>
                            <Route path="*" element={<NoFound />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            )}
        </Box>
    )
}

export default Router
