/** No need unit test */
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

import HomePage from 'src/module/homePage'
import UploadServer, {
    UploadServerList,
    UploadServerDetail,
} from 'src/module/uploadServer'
import Disk, { DiskList, DiskPlugRecords, DiskUploadLog } from 'src/module/disk'

import NoFound from 'src/module/noFound'
import { RootState } from 'src/reducer/type'

// TODO: google analysis
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
                        <Route path="/" element={<HomePage />}>
                            <Route path="up" element={<UploadServer />}>
                                <Route index element={<UploadServerList />} />
                                <Route
                                    path="detail/:id"
                                    element={<UploadServerDetail />}
                                />
                            </Route>
                            <Route path="disk" element={<Disk />}>
                                <Route index element={<DiskList />} />
                                <Route
                                    path="plugRecords"
                                    element={<DiskPlugRecords />}
                                />
                                <Route
                                    path="uploadLog"
                                    element={<DiskUploadLog />}
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
