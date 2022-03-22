/** No need unit test */
import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

import Header from 'src/module/homePage/header'
import Menu from 'src/module/homePage/menu'
import StatusBar from 'src/module/homePage/statusBar'

const HomePage = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/up')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                background: theme.color.grey2,
            }}
        >
            <Header></Header>
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'row',
                    overflow: 'hidden',
                }}
            >
                <Menu></Menu>

                <Box
                    sx={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'row',
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
            <StatusBar></StatusBar>
        </Box>
    )
}

export default HomePage
