import Box from '@mui/material/Box'

import FilterBar from 'src/component/filterBar'
import { useT } from 'src/hooks/language'

export interface QuickFilterProps {
    value: string
    handleChange: (val: string) => void
}

const QuickFilter = ({ value, handleChange }: QuickFilterProps) => {
    const t = useT()

    return (
        <Box
            sx={{
                height: 60,
            }}
        >
            <FilterBar
                inputProps={{
                    placeholder: t('filterAnyColumn'),
                }}
                handleChange={handleChange}
            />
        </Box>
    )
}

export default QuickFilter
