/** No need unit test */
import React from 'react'

import { Outlet } from 'react-router-dom'

import List from 'src/module/uploadServer/list'
import Detail from 'src/module/uploadServer/detail'
import { Box } from '@mui/system'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, Dispatch } from 'src/reducer/type'

export const UploadServerList = List
export const UploadServerDetail = Detail

const INTERVAL_TIMEOUT = 1000 * 60

const UploadServer = () => {
    const dispatch = useDispatch<Dispatch>()
    const { lang } = useSelector((state: RootState) => state.language)

    useEffect(() => {
        dispatch.uploadServer.initData({})

        const timer = setInterval(() => {
            dispatch.uploadServer.initData({})
        }, INTERVAL_TIMEOUT)

        return () => {
            clearInterval(timer)
        }
    }, [lang, dispatch])

    return (
        <Box
            sx={{
                display: 'flex',
                flex: 1,
            }}
        >
            <Outlet></Outlet>
        </Box>
    )
}

export default UploadServer
