import Box from '@mui/material/Box'
import { SxProps, Theme } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import { FC } from 'react'

export interface TooltipFieldProps {
    title: string
    sx?: SxProps<Theme> | undefined
}

const TooltipField: FC<TooltipFieldProps> = props => {
    return (
        <Box
            sx={{
                width: '100%',
                overflow: 'hidden',
                ...props.sx,
            }}
        >
            <Tooltip placement="bottom" title={props.title} arrow>
                <Box
                    sx={{
                        width: '100%',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {props.children && props.children}
                </Box>
            </Tooltip>
        </Box>
    )
}

export default TooltipField
