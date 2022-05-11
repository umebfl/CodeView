import { useEffect } from 'react'
import Box from '@mui/system/Box'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

import 顶部 from 'src/视图/顶部'
import 底部 from 'src/视图/底部'
import 一级导航 from 'src/视图/一级导航'

const 视图 = () => {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/liu_cheng')
        }
    }, [])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                background: 'rgb(21, 21, 21)',
                height: '100%',
                fontSize: 12,
            }}
        >
            <顶部 />
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'row',
                }}
            >
                <一级导航 />
                <Outlet></Outlet>
            </Box>
            <底部 />
        </Box>
    )
}

export default 视图
