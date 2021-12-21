import React, { FC } from 'react'
import { Typography, useTheme } from '@mui/material'

const NoMoreData: FC = () => {
    const theme = useTheme()
    return (
        <Typography
            variant="caption"
            display="inline-block"
            sx={{
                display: 'flex',
                width: '100%',
                marginTop: 1.5,
                marginBottom: 1.5,
                justifyContent: 'center',
                color: theme.color.grey8,
            }}
        >
            没有更多了。
        </Typography>
    )
}

export default NoMoreData
