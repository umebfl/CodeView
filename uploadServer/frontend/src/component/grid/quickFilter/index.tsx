import Box from '@mui/material/Box'

import FilterBar from 'src/component/filterBar'

export interface QuickFilterProps {
    value: string
    handleChange: (val: string) => void
}

const QuickFilter = ({ value, handleChange }: QuickFilterProps) => {
    return (
        <Box
            sx={{
                height: 60,
            }}
        >
            <FilterBar
                inputProps={{
                    placeholder: 'Filter any column...',
                }}
                handleChange={handleChange}
            />
        </Box>
    )
}

export default QuickFilter
