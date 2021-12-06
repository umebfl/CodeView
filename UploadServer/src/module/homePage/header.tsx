import React from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import { RootState } from 'src/reducer/type'
import { isEmpty } from 'ramda'

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
                justifyContent: 'space-between',
                padding: 0,
            }}
        >
            <Box
                sx={{
                    width: 100,
                    marginTop: 1,
                    marginLeft: 2,
                    height: 'auto',
                    userSelect: 'none',
                }}
                component="img"
                src="/asset/logo.png"
            ></Box>

            {!isEmpty(loadingMap) && (
                <LinearProgress
                    sx={{
                        height: 1.01,
                    }}
                />
            )}
        </AppBar>
    )
}

export default Header
