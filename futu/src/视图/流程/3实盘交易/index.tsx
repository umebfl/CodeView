import { FC } from 'react'
import Box from '@mui/system/Box'

import { type_品种 } from 'src/视图/流程'
import { map } from 'ramda'
import { 转换为万元单位 } from 'src/视图/流程/2辅助决策'

const 实盘交易: FC<{ 交易品种: type_品种[]; 全品种初始持仓总额度: number }> = ({
    交易品种,
    全品种初始持仓总额度,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 800,
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
                {/* 实盘交易 */}
                Firm offer
            </Box>

            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        borderBottom: '1px solid rgb(52, 52, 52)',
                        padding: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{ width: 50 }}>Code</Box>
                    <Box sx={{ width: 70 }}>行业</Box>
                    <Box sx={{ width: 50 }}>杠杆</Box>
                    <Box sx={{ width: 70 }}>当前价</Box>
                    <Box sx={{ width: 70 }}>保证金</Box>
                    <Box sx={{ width: 120 }}>
                        初始可持仓手数({转换为万元单位(全品种初始持仓总额度)})
                    </Box>
                    <Box sx={{ width: 70 }}>第一次补仓亏损额度/价格</Box>
                    <Box sx={{ width: 70 }}>第二次补仓亏损额度/价格</Box>
                    <Box sx={{ width: 70 }}>持仓合约</Box>
                    <Box sx={{ width: 70 }}>方向</Box>
                    <Box sx={{ width: 70 }}>持仓手数</Box>
                    <Box sx={{ width: 70 }}>持仓价格</Box>
                    <Box sx={{ width: 70 }}>盈亏</Box>
                </Box>
                {map((品种: type_品种) => {
                    return (
                        <Box
                            key={品种.代码}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                borderBottom: '1px solid rgb(52, 52, 52)',
                                padding: 1,
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                cursor: 'pointer',
                                '&:hover': {
                                    background: 'rgb(52, 52, 52)',
                                },
                            }}
                        >
                            <Box sx={{ width: 50 }}>{品种.代码}</Box>
                            <Box sx={{ width: 70 }}>{品种.行业}</Box>
                            <Box sx={{ width: 50 }}>{品种.杠杆}</Box>
                            <Box sx={{ width: 70 }}>
                                {parseInt(品种.一日数据.c as unknown as string)}
                            </Box>
                            <Box sx={{ width: 70 }}>
                                {品种.一手保证金.toFixed(0)}
                            </Box>
                            <Box sx={{ width: 70 }}>
                                {`${品种.初始持仓手数} / ${转换为万元单位(
                                    品种.初始可持仓额度
                                )}w`}
                                ({转换为万元单位(品种.初始持仓真实额度)})
                            </Box>
                        </Box>
                    )
                })(交易品种)}
            </Box>
        </Box>
    )
}

export default 实盘交易
