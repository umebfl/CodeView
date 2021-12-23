import { FC } from 'react'
import Box from '@mui/system/Box'
import { useTheme } from '@mui/material/styles'

const GridPaper: FC = ({ children, ...props }) => {
    const theme = useTheme()

    return (
        <Box
            {...props}
            sx={{
                width: '100%',
                height: '100%',
                background: theme.palette.grey[900],
                color: theme.palette.text.primary,
            }}
        >
            {children}
        </Box>
    )
}

export default GridPaper
