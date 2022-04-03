/** No need unit test */
import React from 'react'

import { Outlet } from 'react-router-dom'

import List from 'src/module/disk/list'
import { Box } from '@mui/system'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, Dispatch } from 'src/reducer/type'

export const DiskList = List

const Disk = () => {
    const dispatch = useDispatch<Dispatch>()
    const { lang } = useSelector((state: RootState) => state.language)

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
