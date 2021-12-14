/** No need unit test */
import { Outlet } from 'react-router-dom'

import List from 'src/module/uploadServer/list'
import Detail from 'src/module/uploadServer/detail'
import { Box } from '@mui/system'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'src/reducer/type'

export const UploadServerList = List
export const UploadServerDetail = Detail

const UploadServer = () => {
    const dispatch = useDispatch<Dispatch>()

    useEffect(() => {
        dispatch.uploadServer.initData()
    }, [])

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
