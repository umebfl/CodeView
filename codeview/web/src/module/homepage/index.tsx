import Box from '@mui/system/Box'
import { Outlet } from 'react-router-dom'

const Homepage = ({}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
            }}
        >
            <Outlet />
        </Box>
    )
}

export default Homepage
