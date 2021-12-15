import React from 'react'

import { Box } from '@mui/system'

const NoFound = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                width: '100%',
                height: '60%',
                fontSize: 40,
                fontWeight: 'bold',
            }}
        >
            <Box>404 No Found!</Box>
        </Box>
    )
}

export default NoFound
