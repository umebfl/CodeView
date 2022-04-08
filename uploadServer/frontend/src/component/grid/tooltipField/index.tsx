import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import { FC } from 'react'

export interface TooltipFieldProps {
    title: string
}

const TooltipField: FC<TooltipFieldProps> = props => {
    return (
        <Box
            sx={{
                overflow: 'hidden',
            }}
        >
            <Tooltip placement="bottom" title={props.title} arrow>
                <Box
                    sx={{
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
