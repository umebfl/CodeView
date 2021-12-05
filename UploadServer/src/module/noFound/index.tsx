import { Box } from '@mui/system'
import { info } from 'src/util/loger'

const NoFound = () => {
    info('NoFound render')
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
