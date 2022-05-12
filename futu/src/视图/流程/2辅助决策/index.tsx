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

const 转换为万元单位 = (num: number) => (num / 10000).toFixed(1)

const 辅助决策: FC<{
    总投资金: number
    可持仓资金: number
    交易行业总数: number
    交易品种: type_品种[]
    初始可持仓额度: number
    一次补仓额度: number
    第一补仓后额度: number
    第二次补仓后额度: number
    最大可持仓额度: number
    第一次补仓亏损临界额度: number
    第二次补仓亏损临界额度: number
}> = ({
    总投资金,
    可持仓资金,
    交易行业总数,
    交易品种,
    初始可持仓额度,
    一次补仓额度,
    第一补仓后额度,
    第二次补仓后额度,
    最大可持仓额度,
    第一次补仓亏损临界额度,
    第二次补仓亏损临界额度,
}) => {
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
            <信息块
                标题={'Total investment'}
                值={`${转换为万元单位(总投资金)}`}
            />
            <信息块
                标题={'Available funds'}
                值={`${转换为万元单位(可持仓资金)}`}
            />
            <信息块 标题={'交易品种数量'} 值={`${交易品种.length}`} />
            <信息块 标题={'交易行业总数'} 值={交易行业总数} />
            <信息块
                标题={'初始可持仓额度'}
                值={转换为万元单位(初始可持仓额度)}
            />
            <信息块 标题={'一次补仓额度'} 值={转换为万元单位(一次补仓额度)} />
            <信息块
                标题={'第一补仓后额度'}
                值={转换为万元单位(第一补仓后额度)}
            />
            <信息块
                标题={'第二次补仓后额度'}
                值={转换为万元单位(第二次补仓后额度)}
            />
            <信息块
                标题={'最大可持仓额度'}
                值={转换为万元单位(最大可持仓额度)}
            />
            <信息块
                标题={'第一次补仓亏损临界额度'}
                值={转换为万元单位(第一次补仓亏损临界额度)}
            />
            <信息块
                标题={'第二次补仓亏损临界额度'}
                值={转换为万元单位(第二次补仓亏损临界额度)}
            />
            <信息块 标题={'主体方向'} 值={''} />
            <信息块 标题={'5年方向'} 值={''} />
            <信息块 标题={'3年方向'} 值={''} />
            <信息块 标题={'1年方向'} 值={''} />
            <信息块 标题={'5月方向'} 值={''} />
            <信息块 标题={'3月方向'} 值={''} />
            <信息块 标题={'1月方向'} 值={''} />
        </Box>
    )
}

export default 辅助决策
