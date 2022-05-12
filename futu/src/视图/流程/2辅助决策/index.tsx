import { FC } from 'react'
import Box from '@mui/system/Box'

const 辅助决策: FC<{
    总投资金: number
    可持仓资金: number
}> = () => {
    return (
        <Box
            sx={{
                width: 300,
                height: '100%',
                borderRight: '1px solid rgb(52, 52, 52)',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    height: 35,
                    paddingLeft: 1,
                    paddingRight: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgb(52, 52, 52)',
                }}
            >
                辅助决策
            </Box>
        </Box>
    )
}

export default 辅助决策
