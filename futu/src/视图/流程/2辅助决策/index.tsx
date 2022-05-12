import { FC } from 'react'
import Box from '@mui/system/Box'

import { type_品种 } from 'src/视图/流程'
import { values } from 'ramda'

const 信息块: FC<{
    标题: string
    值: string | number
}> = ({ 标题, 值 }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: 1,
                borderBottom: '1px solid rgb(52, 52, 52)',
                padding: 1,
            }}
        >
            <Box
                sx={{
                    marginRight: 1,
                }}
            >
                {标题}:
            </Box>
            <Box>{值}</Box>
        </Box>
    )
}

const 辅助决策: FC<{
    总投资金: number
    可持仓资金: number
    交易行业总数: number
    交易品种: type_品种[]
    初始可持仓额度: number
}> = ({ 总投资金, 可持仓资金, 交易行业总数, 交易品种, 初始可持仓额度 }) => {
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
                {/* 辅助决策 */}
                Auxiliary decision
            </Box>

            {/* 总投资金: */}
            <信息块 标题={'Total investment'} 值={`${总投资金 / 10000}`} />

            {/* 可持仓资金: */}
            <信息块 标题={'Available funds'} 值={`${可持仓资金 / 10000}`} />

            {/* 交易品种数量: */}
            <信息块
                标题={'Total of transaction varieties'}
                值={`${交易品种.length}`}
            />

            {/* 交易行业总数: */}
            <信息块 标题={'Total of trading industries'} 值={交易行业总数} />

            {/* 初始可持仓额度: */}
            <信息块 标题={'Initial quota'} 值={初始可持仓额度} />
        </Box>
    )
}

export default 辅助决策
