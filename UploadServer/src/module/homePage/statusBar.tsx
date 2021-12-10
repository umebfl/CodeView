import React from 'react'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

import { info } from 'src/util/loger'

import { version } from '../../../package.json'

const StatusBar = () => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                background: theme.color.grey2,
                height: 22,
                color: theme.color.grey15,
                fontSize: 14,
                borderTop: theme.borderLine.lightSolid,
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingRight: 1,
                paddingLeft: 1,
            }}
        >
            <Box
                sx={{
                    paddingRight: 1,
                    paddingLeft: 1,
                    ': hover': {
                        background: theme.color.grey5,
                    },
                }}
            >
                Version: {version}
            </Box>
        </Box>
    )
}

export default StatusBar
