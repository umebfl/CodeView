import React from 'react'
import { Tooltip, TooltipProps } from '@mui/material'

const TOOLTIP_ENTER_DELAY = 500

interface propsType extends TooltipProps {
    // display tooltip when the length of text is greater than showlen
    showlen?: number
}

const TooltipText = ({ children, ...props }: propsType) => {
    return props.title.toString().length > (props.showlen || 0) ? (
        <Tooltip arrow enterDelay={TOOLTIP_ENTER_DELAY} {...props}>
            {children}
        </Tooltip>
    ) : (
        children
    )
}

export default TooltipText
