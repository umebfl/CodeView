import { FC } from 'react'
import Box from '@mui/system/Box'
import { SxProps, useTheme } from '@mui/material/styles'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { BoxTypeMap } from '@mui/material/Box'
import { Theme } from '@mui/system'

interface GridPaperType {
    children?: any
    sx?: SxProps<Theme>
}

const GridPaper = ({ children, sx }: GridPaperType) => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                background: theme.palette.grey[900],
                color: theme.palette.text.primary,
                ...sx,
            }}
        >
            {children}
        </Box>
    )
}

export default GridPaper
