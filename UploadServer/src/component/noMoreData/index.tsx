import React, { FC } from 'react'
import { Typography, useTheme } from '@mui/material'
import { useT } from 'src/hooks/language'

const NoMoreData: FC = () => {
    const theme = useTheme()
    const t = useT()

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
            {t('noMoreData')}
        </Typography>
    )
}

export default NoMoreData
