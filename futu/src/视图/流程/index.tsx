import Box from '@mui/system/Box'

import 品种筛选 from 'src/视图/流程/1品种筛选'

const 流程 = () => {
    return (
        <Box>
            <Box
                sx={{
                    width: 300,
                    height: '100%',
                    borderRight: '1px solid rgb(52, 52, 52)',
                }}
            >
                <品种筛选></品种筛选>
            </Box>
        </Box>
    )
}

export default 流程
