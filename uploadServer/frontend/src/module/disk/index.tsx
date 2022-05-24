/** No need unit test */
import React from 'react'

import { Outlet } from 'react-router-dom'

import List from 'src/module/disk/list'
import PlugRecords from 'src/module/disk/plugRecords'
import UploadLog from 'src/module/disk/uploadLog'

import { Box } from '@mui/system'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState, Dispatch } from 'src/reducer/type'
import { INTERVAL_TIMEOUT } from 'src/module/uploadServer'

export const DiskList = List
export const DiskPlugRecords = PlugRecords
export const DiskUploadLog = UploadLog

const Disk = () => {
    const dispatch = useDispatch<Dispatch>()
    const { lang } = useSelector((state: RootState) => state.language)

    useEffect(() => {
        dispatch.disk.initData({})

        const timer = setInterval(() => {
            dispatch.disk.initData({})
        }, INTERVAL_TIMEOUT)

        return () => {
            clearInterval(timer)
        }
    }, [lang, dispatch])

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

export default Disk
