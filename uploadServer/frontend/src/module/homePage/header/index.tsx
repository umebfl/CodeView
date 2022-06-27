import React from 'react'
import { useSelector } from 'react-redux'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { useTheme } from '@mui/material/styles'

import { RootState } from 'src/reducer/type'
import DataSourceSelecter from 'src/module/homePage/header/dataSourceSelecter'

const Header = () => {
    const theme = useTheme()
    const { loadingMap } = useSelector(
        (state: RootState) => state.globalLoading
    )

    return (
        <AppBar
            position="static"
            sx={{
                borderBottom: theme.borderLine.lightSolid,
                background: theme.color.grey2,
                height: 48,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 0,
                position: 'relative',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: 0,
                    paddingLeft: 1,
                    paddingRight: 1,
                }}
            >
                <Box
                    sx={{
                        width: 100,
                        height: 'auto',
                        userSelect: 'none',
                    }}
                    component="img"
                    src="/asset/logo.png"
                ></Box>

                <DataSourceSelecter />
            </Box>

            {Reflect.ownKeys(loadingMap).length > 0 && (
                <LinearProgress
                    sx={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        height: 1.01,
                    }}
                />
            )}
        </AppBar>
    )
}

export default Header
