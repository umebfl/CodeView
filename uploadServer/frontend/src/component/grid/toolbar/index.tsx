import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

import FilterBar from 'src/component/grid/toolbar/filterBar'
import { useT } from 'src/hooks/language'

export interface ToolbarProps {
    quickFilterProps?: {
        open: boolean | undefined
        value: string
        handleChange: (val: string) => void
    }
    ToolbarRight?: React.FC
}

const Toolbar = ({ quickFilterProps, ToolbarRight }: ToolbarProps) => {
    // const t = useT()
    const theme = useTheme()

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                height: 60,
                borderBottom: theme.borderLine.lightSolid,
            }}
        >
            {quickFilterProps?.open && (
                <FilterBar
                    value={quickFilterProps.value}
                    handleChange={quickFilterProps.handleChange}
                />
            )}
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    color: 'white',
                    paddingRight: 2,
                }}
            >
                {ToolbarRight && <ToolbarRight />}
            </Box>
        </Box>
    )
}

export default Toolbar
